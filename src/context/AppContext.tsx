import { roleHome } from '../services/roleHome';
import { parsePath, pathFor, isPublicView, titleFor, descriptionFor } from '../services/routes';
import type { Route } from '../services/routes';
import { recoveryGatewayKey } from '../config/recoveryPublic';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { UserProfile, Course, Challenge, ChallengeSubmission, Project, Post, PostCategory, PromptItem, ResourceItem, Certificate, LiveSession, Opportunity, MembershipTier } from '../types';
import { supabase, backend, isBackendConfigured, errorMessage, safeUrl } from '../services/supabase';
import { emptyProfile, profileFields, loadProfile, catalog, records, insertRecord, isAdmin } from '../services/data';
import type { CatalogRow, CatalogKind, DataRecord } from '../services/data';

export type AppView =
  // Public pages
  | 'public_home'
  | 'public_about'
  | 'public_labs'
  | 'public_courses'
  | 'public_membership'
  | 'public_churches'
  | 'public_challenges'
  | 'public_community'
  | 'public_resources'
  | 'public_contact'
  | 'public_faq'
  | 'public_privacy'
  | 'public_terms'
  // Member pages
  | 'mentor'
  | 'dashboard'
  | 'learn'
  | 'labs'
  | 'course_detail'
  | 'course_player'
  | 'live'
  | 'challenges'
  | 'challenge_detail'
  | 'projects'
  | 'community'
  | 'resources'
  | 'prompts'
  | 'tools'
  | 'opportunities'
  | 'growth'
  | 'profile'
  | 'teams'
  | 'instructor'
  | 'admin'
  | 'verify_certificate';

export interface NotificationItem { id: string; title: string; message: string; time: string; read: boolean; type: string; targetView?: AppView }

type HistoryMode = 'push' | 'replace' | 'none';

/** Role rules for member screens; returns the screen to open, or null when access is denied. */
const resolveViewForRole = (view: AppView, role: UserProfile['role']): AppView | null => {
  if (view === 'dashboard') return roleHome(role);
  if (view === 'instructor' && role !== 'instructor' && !isAdmin(role)) return null;
  if (view === 'admin' && !isAdmin(role)) return null;
  if (view === 'mentor' && role !== 'mentor' && !isAdmin(role)) return null;
  return view;
};

function useAppState() {
  // The URL decides the first screen. Member screens wait until sign-in is confirmed.
  const initialRoute = useRef<Route>(parsePath(window.location.pathname));
  const pendingRoute = useRef<Route | null>(isPublicView(initialRoute.current.view) ? null : initialRoute.current);
  const historyMode = useRef<HistoryMode>(pendingRoute.current ? 'none' : 'replace');
  const firstAuthSync = useRef(true);
  const [currentView, setView] = useState<AppView>(pendingRoute.current ? 'public_home' : initialRoute.current.view);
  const viewRef = useRef(currentView);
  viewRef.current = currentView;
  const navigate = (view: AppView, mode: HistoryMode = 'push') => { historyMode.current = mode; setView(view); };
  const [currentUser, setCurrentUser] = useState<UserProfile>(emptyProfile);
  const [authLoading, setAuthLoading] = useState(isBackendConfigured);
  const [dataLoading, setDataLoading] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [dataError, setDataError] = useState('');
  const [catalogRows, setCatalog] = useState<CatalogRow[]>([]);
  const [dataRecords, setRecords] = useState<DataRecord[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [reactions, setReactions] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [selectedCertificateId, setSelectedCertificateId] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return localStorage.getItem('ccl_theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
  });
  const applyRouteId = ({ view, id }: Route) => {
    if (!id) return;
    if (view === 'course_detail' || view === 'course_player') setSelectedCourseId(id);
    if (view === 'challenge_detail') setSelectedChallengeId(id);
    if (view === 'verify_certificate') setSelectedCertificateId(id);
  };
  const authGeneration = useRef(0);
  const activeUser = useRef<string | null>(null);

  const fetchCatalog = async () => {
    const owner = activeUser.current;
    if (supabase) { const result = await catalog(); if (activeUser.current === owner) setCatalog(result); }
  };
  const fetchMemberData = async (userId: string) => {
    const results = await Promise.all([
      records(),
      backend().from('ccl_enrollments').select('*').eq('user_id', userId),
      backend().from('ccl_lesson_progress').select('*').eq('user_id', userId),
      backend().from('ccl_bookmarks').select('*').eq('user_id', userId),
      backend().from('ccl_reactions').select('*'),
      backend().from('ccl_certificates').select('payload').eq('user_id', userId),
    ]);
    if (activeUser.current !== userId) return;
    for (const result of results.slice(1)) if ((result as any).error) throw (result as any).error;
    setRecords(results[0] as DataRecord[]);
    setEnrollments((results[1] as any).data);
    setProgress((results[2] as any).data);
    setBookmarks(new Set((results[3] as any).data.map((b: any) => b.item_id)));
    setReactions((results[4] as any).data);
    setCertificates((results[5] as any).data.map((c: any) => c.payload));
  };
  const clearMemberData = () => {
    setCurrentUser(emptyProfile); setAuthenticated(false); setRecords([]); setEnrollments([]);
    setProgress([]); setBookmarks(new Set()); setReactions([]); setCertificates([]);
    setCatalog([]); setIsOnboardingOpen(false); setIsPasswordRecovery(false);
  };

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    const sync = async (session: Session | null, event: string) => {
      if (!mounted) return;
      const generation = ++authGeneration.current;
      const switched = activeUser.current !== (session?.user.id ?? null);
      activeUser.current = session?.user.id ?? null;
      if (switched) { clearMemberData(); setDataLoading(Boolean(session)); }
      try {
        if (session) {
          if (!session.user.email_confirmed_at) { await backend().auth.signOut(); throw new Error('Verify your email before entering your Creator Lab.'); }
          const result = await loadProfile(session.user);
          if (!mounted || generation !== authGeneration.current) return;
          setCurrentUser(result.user); setAuthenticated(true);
          if (event === 'PASSWORD_RECOVERY' || new URLSearchParams(window.location.search).get('recovery') === '1') { setIsPasswordRecovery(true); setIsAuthModalOpen(true); }
          else if (switched) {
            try { sessionStorage.removeItem('ccl-pending-verification'); } catch {}
            setIsAuthModalOpen(false);
            const pending = pendingRoute.current; pendingRoute.current = null;
            const allowed = pending && resolveViewForRole(pending.view, result.user.role);
            const mode: HistoryMode = firstAuthSync.current ? 'replace' : 'push';
            if (pending && allowed) { historyMode.current = mode; applyRouteId(pending); navigate(allowed, mode); }
            // A signed-in visitor who opened a shared public page (e.g. /churches) stays on it.
            else if (!(firstAuthSync.current && isPublicView(viewRef.current) && viewRef.current !== 'public_home')) navigate(roleHome(result.user.role), mode);
            setIsOnboardingOpen(!result.onboarded && result.user.role === 'student');
          }
          await Promise.all([fetchCatalog(), fetchMemberData(session.user.id)]);
        } else {
          clearMemberData();
          if (pendingRoute.current) { navigate('public_home', 'replace'); window.history.replaceState(null, '', '/'); setAuthModalMode('login'); setIsAuthModalOpen(true); }
          else if (!isPublicView(viewRef.current)) navigate('public_home', 'replace');
          await fetchCatalog();
        }
        if (mounted && generation === authGeneration.current) setDataError('');
      } catch (error) {
        if (mounted && generation === authGeneration.current) setDataError(errorMessage(error));
      } finally {
        if (mounted && generation === authGeneration.current) { setAuthLoading(false); setDataLoading(false); firstAuthSync.current = false; }
      }
    };
    // Do not call async Supabase methods within its auth callback (auth lock).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(() => { void sync(session, event); }, 0);
    });
    return () => { mounted = false; ++authGeneration.current; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('ccl_theme', theme); } catch { /* optional preference */ }
  }, [theme]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsSearchOpen(v => !v); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  // Refresh shared discussions so another user's submissions appear without re-login.
  useEffect(() => {
    if (!isAuthenticated || !currentUser.id) return;
    const refresh = () => { void fetchMemberData(currentUser.id).catch(error => setDataError(errorMessage(error))); };
    const timer = setInterval(refresh, 30000);
    window.addEventListener('focus', refresh);
    return () => { clearInterval(timer); window.removeEventListener('focus', refresh); };
  }, [isAuthenticated, currentUser.id]);

  const ACCESS_MESSAGES: Partial<Record<AppView, string>> = {
    instructor: 'Instructor access is required.', admin: 'Administrator access is required.', mentor: 'Mentor access is required.',
  };
  /** Opens a screen, applying sign-in and role rules. Returns false when the screen was not opened. */
  const openView = (view: AppView, mode: HistoryMode = 'push', id?: string) => {
    if (!isPublicView(view) && !isAuthenticated) {
      pendingRoute.current = { view, id };
      setAuthModalMode('login'); setIsAuthModalOpen(true); return false;
    }
    const allowed = isPublicView(view) ? view : resolveViewForRole(view, currentUser.role);
    if (!allowed) { setDataError(ACCESS_MESSAGES[view] || 'You do not have access to that page.'); return false; }
    historyMode.current = mode;
    applyRouteId({ view, id });
    navigate(allowed, mode);
    return true;
  };
  const setCurrentView = (view: AppView) => {
    if (openView(view)) window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navigateWithParam = (view: AppView, id?: string) => {
    if (openView(view, 'push', id)) window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  /** Back/forward buttons: show the screen in the URL without adding a new history entry. */
  const openFromHistory = useRef<(route: Route) => void>(() => {});
  openFromHistory.current = (route) => {
    if (!openView(route.view, 'none', route.id)) {
      // Signed out or not permitted: keep the address bar in step with what is on screen.
      window.history.replaceState(null, '', pathFor(viewRef.current, null));
    }
  };
  const requireUser = () => {
    if (!isAuthenticated || !currentUser.id) throw new Error('Please sign in first.');
    return currentUser.id;
  };
  const perform = async (operation: () => Promise<void>) => {
    setDataError('');
    try { await operation(); return true; }
    catch (error) { setDataError(errorMessage(error)); return false; }
  };
  const login = async (email: string, password: string) => {
    const { error } = await backend().auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
    setIsAuthModalOpen(false);
  };
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const { data, error } = await backend().auth.signUp({
      email: email.trim(), password,
      options: { emailRedirectTo: window.location.origin, data: { first_name: firstName.trim(), last_name: lastName.trim() } },
    });
    if (error) throw error;
    if (data.user?.identities?.length === 0) throw new Error('This email is already registered. Please sign in or reset your password.');
    if (data.session) { await backend().auth.signOut(); throw new Error('Email confirmation must be enabled before creating an account. Please contact CCL support.'); }
    return false;
  };
  const logout = () => perform(async () => {
    const { error } = await backend().auth.signOut(); if (error) throw error;
    activeUser.current = null; ++authGeneration.current; clearMemberData(); navigate('public_home'); await fetchCatalog();
  });
  const resetPassword = async (email: string) => {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ccl-password-recovery`, {
      method:'POST', headers:{'Content-Type':'application/json', apikey:import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization:`Bearer ${recoveryGatewayKey}`},
      body:JSON.stringify({email:email.trim().toLowerCase()}), signal:AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || !result.sent) throw new Error(result.error || 'The recovery email could not be sent. Please try again.');
  };
  const changePassword = async (password: string) => {
    const { error } = await backend().auth.updateUser({ password }); if (error) throw error;
    window.history.replaceState({}, '', window.location.pathname);
    setIsPasswordRecovery(false); setIsAuthModalOpen(false); navigate(roleHome(currentUser.role));
  };
  const updateCurrentUser = (updates: Partial<UserProfile>, onboarded?: boolean) => perform(async () => {
    const id = requireUser();
    const existing = Object.fromEntries(profileFields.filter(k => k in currentUser).map(k => [k, (currentUser as any)[k]]));
    const allowed = Object.fromEntries(profileFields.filter(k => k in updates).map(k => [k, (updates as any)[k]]));
    for (const key of ['avatar', 'portfolioWebsite', 'githubUrl', 'youtubeUrl', 'linkedinUrl']) {
      if (key in allowed && allowed[key] && !String(allowed[key]).startsWith('/')) allowed[key] = safeUrl(String(allowed[key]));
    }
    const { error } = await backend().from('ccl_profiles').update({ profile: { ...existing, ...allowed },
      ...(onboarded === undefined ? {} : { onboarding_completed: onboarded }), updated_at: new Date().toISOString() }).eq('user_id', id);
    if (error) throw error;
    if (activeUser.current === id) setCurrentUser(v => ({ ...v, ...allowed }));
  });
  const completeOnboarding = async (updates: Partial<UserProfile>) => {
    const ok = await updateCurrentUser(updates, true);
    if (ok) { setIsOnboardingOpen(false); navigate('dashboard'); }
    return ok;
  };
  const addRecord = async (kind: string, payload: any, target?: string, status?: string) => {
    const userId = requireUser();
    const row = await insertRecord(userId, kind, payload, target, status);
    if (activeUser.current !== userId) return row;
    setRecords(v => [row, ...v]); return row;
  };
  const upgradeMembership = (tier: MembershipTier) => perform(async () => {
    await addRecord('membership_request', { requestedTier: tier });
    setDataError('Your membership request was saved. Your plan changes after administrator approval.');
  });
  const enrollInCourse = (id: string) => perform(async () => {
    const userId = requireUser();
    if (enrollments.some(e => e.course_id === id)) return;
    const { data, error } = await backend().from('ccl_enrollments').insert({ user_id: userId, course_id: id }).select('*').single();
    if (error) throw error; if (activeUser.current === userId) setEnrollments(v => [...v, data]);
  });
  const toggleLessonComplete = (courseId: string, lessonId: string) => perform(async () => {
    const userId = requireUser();
    const completed = !progress.find(p => p.course_id === courseId && p.lesson_id === lessonId)?.completed;
    const { data, error } = await backend().from('ccl_lesson_progress').upsert({ user_id: userId, course_id: courseId, lesson_id: lessonId, completed },
      { onConflict: 'user_id,course_id,lesson_id' }).select('*').single();
    if (error) throw error; if (activeUser.current === userId) setProgress(v => [...v.filter(p => !(p.course_id === courseId && p.lesson_id === lessonId)), data]);
  });
  const createProject = (input: Omit<Project, 'id' | 'createdAt'>) => perform(async () => {
    const payload = { ...input, liveUrl: safeUrl(input.liveUrl), videoUrl: safeUrl(input.videoUrl) };
    await addRecord('project', payload, input.courseId || input.challengeId, input.status === 'draft' ? 'draft' : 'submitted');
  });
  const addChallengeSubmission = (input: Omit<ChallengeSubmission, 'id' | 'submittedAt' | 'reactions' | 'status'>) => perform(async () => {
    await addRecord('submission', { ...input, images: input.images.filter(Boolean).map(v => safeUrl(v)),
      liveUrl: safeUrl(input.liveUrl), videoUrl: safeUrl(input.videoUrl) }, input.challengeId);
  });
  const createPost = (spaceId: string, spaceName: string, category: PostCategory, title: string, content: string) => perform(async () => {
    if (!title.trim() || !content.trim()) throw new Error('Add a title and message.');
    await addRecord('post', { spaceId, spaceName, category, title: title.trim(), content: content.trim() });
  });
  const saveActivity = (kind: 'comment' | 'lesson_comment' | 'live_chat' | 'assignment' | 'team_request', payload: any, target?: string) => perform(async () => {
    if (kind === 'assignment') payload = { ...payload, url: safeUrl(payload.url) };
    await addRecord(kind, payload, target);
  });
  const updateProjectReview = (id: string, status: Project['status'], feedback?: string) => perform(async () => {
    if (!isAdmin(currentUser.role)) throw new Error('Administrator access is required.');
    const record = dataRecords.find(r => r.id === id); if (!record) throw new Error('Project not found.');
    const { data, error } = await backend().from('ccl_records').update({ status, payload: { ...record.payload, mentorFeedback: feedback } }).eq('id', id).select('*').single();
    if (error) throw error; setRecords(v => v.map(r => r.id === id ? data : r));
  });
  const toggleReaction = (postId: string, reaction: 'helpful' | 'pray' | 'inspired' | 'celebrate') => perform(async () => {
    const userId = requireUser();
    const own = reactions.some(r => r.user_id === userId && r.post_id === postId && r.reaction === reaction);
    const query = backend().from('ccl_reactions');
    const { error } = own ? await query.delete().eq('user_id', userId).eq('post_id', postId).eq('reaction', reaction)
      : await query.insert({ user_id: userId, post_id: postId, reaction });
    if (error) throw error;
    if (activeUser.current !== userId) return;
    setReactions(v => own ? v.filter(r => !(r.user_id === userId && r.post_id === postId && r.reaction === reaction))
      : [...v, { user_id: userId, post_id: postId, reaction }]);
  });
  const toggleBookmark = (itemId: string) => perform(async () => {
    const userId = requireUser(); const saved = bookmarks.has(itemId);
    const query = backend().from('ccl_bookmarks');
    const { error } = saved ? await query.delete().eq('user_id', userId).eq('item_id', itemId)
      : await query.insert({ user_id: userId, item_id: itemId });
    if (error) throw error;
    if (activeUser.current !== userId) return;
    setBookmarks(v => { const next = new Set(v); saved ? next.delete(itemId) : next.add(itemId); return next; });
  });
  const publishCatalog = (kind: CatalogKind, payload: any, published = false) => perform(async () => {
    const existing = catalogRows.find(r => r.kind === kind && r.id === payload.id);
    if (!isAdmin(currentUser.role) && !(currentUser.role === 'instructor' && kind === 'course' && (!existing || existing.owner_id === currentUser.id))) throw new Error('You can only manage your own courses.');
    const { ownerId, ...content } = payload;
    const row = { kind, id: content.id, payload: content, published };
    const query = backend().from('ccl_catalog');
    const result = existing
      ? await query.update(row).eq('kind', kind).eq('id', content.id).select('id').single()
      : await query.insert({ ...row, owner_id: currentUser.id }).select('id').single();
    const { error } = result;
    if (error) throw error; await fetchCatalog();
  });

  const payloads = <T,>(kind: CatalogKind) => catalogRows.filter(r => r.kind === kind).map(r => ({ ...r.payload, ownerId: r.owner_id, published: r.published }) as T);
  const courses = payloads<Course>('course').map(c => {
    const modules = c.modules.map(m => ({ ...m, lessons: m.lessons.map(l => ({ ...l,
      completed: Boolean(progress.find(p => p.course_id === c.id && p.lesson_id === l.id)?.completed) })) }));
    const lessons = modules.flatMap(m => m.lessons);
    return { ...c, modules, isEnrolled: enrollments.some(e => e.course_id === c.id),
      progressPercent: lessons.length ? Math.round(100 * lessons.filter(l => l.completed).length / lessons.length) : 0 };
  });
  const projects: Project[] = dataRecords.filter(r => (r.kind === 'project' || r.kind === 'submission') && (r.user_id === currentUser.id || isAdmin(currentUser.role))).map(r => ({
    ...r.payload, id: r.id, status: r.status, createdAt: new Date(r.created_at).toLocaleString(),
    ...(r.kind === 'submission' ? { type: 'challenge_submission', cover: r.payload.images?.[0] || '/avatar.svg',
      projectBrief: r.payload.description, isPublic: false } : {}),
  }));
  const submissions: ChallengeSubmission[] = dataRecords.filter(r => r.kind === 'submission').map(r => ({ ...r.payload,
    id: r.id, status: r.status, submittedAt: new Date(r.created_at).toLocaleString(), reactions: { cheer: 0, fire: 0, insightful: 0 } }));
  const posts: Post[] = dataRecords.filter(r => r.kind === 'post').map(r => ({ ...r.payload, id: r.id,
    author: r.payload.creator, createdAt: new Date(r.created_at).toLocaleString(),
    commentsCount: dataRecords.filter(c => c.kind === 'comment' && c.target_id === r.id).length,
    reactions: Object.fromEntries(['helpful','pray','inspired','celebrate'].map(k => [k, reactions.filter(x => x.post_id === r.id && x.reaction === k).length])),
  }));
  const commentsFor = (kind: string, target: string) => dataRecords.filter(r => r.kind === kind && r.target_id === target).map(r => ({
    id: r.id, user: r.payload.creator?.name || 'Creator', author: r.payload.creator?.name || 'Creator',
    text: r.payload.text, time: new Date(r.created_at).toLocaleString(),
  }));
  const prompts = payloads<PromptItem>('prompt').map(p => ({ ...p, saved: bookmarks.has(p.id) }));
  const resources = payloads<ResourceItem>('resource');
  const notifications: NotificationItem[] = [];
  const hoursLearned = Math.round(courses.flatMap(c => c.modules.flatMap(m => m.lessons)).filter(l => l.completed).reduce((n,l) => n+l.durationMinutes,0)/60*10)/10;

  // Keep the address bar, page title and description in step with the screen.
  const routeId = currentView === 'course_detail' || currentView === 'course_player' ? selectedCourseId
    : currentView === 'challenge_detail' ? selectedChallengeId
    : currentView === 'verify_certificate' ? selectedCertificateId || null : null;
  useEffect(() => {
    const mode = historyMode.current; historyMode.current = 'push';
    const path = pathFor(currentView, routeId);
    if (mode === 'none' || window.location.pathname === path) return;
    if (mode === 'replace') window.history.replaceState(null, '', path);
    else window.history.pushState(null, '', path);
  }, [currentView, routeId]);
  const challengeList = payloads<Challenge>('challenge');
  const detailTitle = currentView === 'course_detail' || currentView === 'course_player' ? courses.find(c => c.id === selectedCourseId)?.title
    : currentView === 'challenge_detail' ? challengeList.find(c => c.id === selectedChallengeId)?.title : undefined;
  useEffect(() => {
    document.title = titleFor(currentView, detailTitle);
    document.querySelector('meta[name="description"]')?.setAttribute('content', descriptionFor(currentView));
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.origin + pathFor(isPublicView(currentView) ? currentView : 'public_home');
  }, [currentView, detailTitle]);
  useEffect(() => {
    const onPop = () => openFromHistory.current(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return { currentView, setCurrentView, navigateWithParam, currentUser: { ...currentUser, hoursLearned },
    authLoading, dataLoading, isAuthenticated, dataError, setDataError, isBackendConfigured,
    login, register, logout, resetPassword, changePassword, isPasswordRecovery, updateCurrentUser, completeOnboarding,
    upgradeMembership, selectedCourseId, setSelectedCourseId, selectedLessonId, setSelectedLessonId,
    selectedChallengeId, setSelectedChallengeId, selectedCertificateId, setSelectedCertificateId,
    isOnboardingOpen, setIsOnboardingOpen, isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode,
    theme, toggleTheme: () => setTheme(v => v === 'dark' ? 'light' : 'dark'), isSearchOpen, setIsSearchOpen,
    isAssistantOpen, setIsAssistantOpen, courses, enrollInCourse, toggleLessonComplete,
    challenges: challengeList, submissions, addChallengeSubmission, projects, createProject,
    updateProjectReview, posts, createPost, toggleReaction, prompts, toggleSavePrompt: toggleBookmark,
    resources, bookmarks, toggleBookmark, notifications, markNotificationRead: (_id: string) => {}, clearNotifications: () => {},
    dataRecords, commentsFor, saveActivity, certificates, publishCatalog,
    liveSessions: payloads<LiveSession>('live'), opportunities: payloads<Opportunity>('opportunity'),
  };
}

const AppContext = createContext<ReturnType<typeof useAppState> | null>(null);
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useAppState();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be inside AppProvider');
  return context;
}

