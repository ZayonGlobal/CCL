import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  MembershipTier,
  Course,
  Challenge,
  ChallengeSubmission,
  Project,
  Post,
  PromptItem,
  ResourceItem,
  AITool,
  Opportunity,
  Certificate,
  PostCategory,
} from '../types';
import {
  CURRENT_USER,
  COURSES as INITIAL_COURSES,
  CHALLENGES as INITIAL_CHALLENGES,
  CHALLENGE_SUBMISSIONS as INITIAL_SUBMISSIONS,
  USER_PROJECTS as INITIAL_PROJECTS,
  POSTS as INITIAL_POSTS,
  PROMPT_LIBRARY as INITIAL_PROMPTS,
  RESOURCE_ITEMS as INITIAL_RESOURCES,
  AI_TOOLS,
  OPPORTUNITIES,
  CERTIFICATES,
} from '../data/seedData';

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
  | 'admin'
  | 'verify_certificate';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'live' | 'challenge' | 'feedback' | 'system' | 'community';
  targetView?: AppView;
}

interface AppContextType {
  // Navigation & views
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateWithParam: (view: AppView, paramId?: string) => void;

  // Selected item pointers
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string | null) => void;
  selectedCertificateId: string;
  setSelectedCertificateId: (id: string) => void;

  // User & Auth state
  currentUser: UserProfile;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  switchRole: (role: UserRole) => void;
  upgradeMembership: (tier: MembershipTier) => void;

  // Onboarding
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (val: boolean) => void;
  completeOnboarding: (prefs: Partial<UserProfile>) => void;

  // Theme & overlays
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (val: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (val: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;

  // Core collections & actions
  courses: Course[];
  enrollInCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;

  challenges: Challenge[];
  submissions: ChallengeSubmission[];
  addChallengeSubmission: (submission: Omit<ChallengeSubmission, 'id' | 'submittedAt' | 'reactions' | 'status'>) => void;

  projects: Project[];
  createProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProjectReview: (projectId: string, status: Project['status'], feedback?: string) => void;

  posts: Post[];
  createPost: (spaceId: string, spaceName: string, category: PostCategory, title: string, content: string) => void;
  toggleReaction: (postId: string, reaction: 'helpful' | 'pray' | 'inspired' | 'celebrate') => void;

  prompts: PromptItem[];
  toggleSavePrompt: (promptId: string) => void;

  resources: ResourceItem[];
  bookmarks: Set<string>;
  toggleBookmark: (id: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & mode - Default to the public website UI requested in screenshot
  const [currentView, setCurrentView] = useState<AppView>('public_home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('crs_ai_foundations');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('les_1_1');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>('ch_easter_campaign');
  const [selectedCertificateId, setSelectedCertificateId] = useState<string>('CCL-CERT-2026-8941');

  // User & Auth
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for rich developer test, toggleable anytime
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Theme & overlays
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('ccl_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // ignore
    }
    return 'light';
  });
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  // Data states
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>(INITIAL_SUBMISSIONS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(['prm_01', 'prm_02', 'res_item_01']));

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'Live Lab Starting Soon',
      message: 'Sunday Sermon Visuals & Recaps with Gemini starts Thursday at 7:00 PM WAT.',
      time: '10m ago',
      read: false,
      type: 'live',
      targetView: 'live',
    },
    {
      id: 'notif_2',
      title: 'Mentor Feedback Received',
      message: 'Kofi Mensah approved your Church Easter Campaign Challenge submission with notes.',
      time: '1h ago',
      read: false,
      type: 'feedback',
      targetView: 'challenges',
    },
    {
      id: 'notif_3',
      title: 'Streak Maintained!',
      message: 'You have logged in and practiced for 8 consecutive days. Keep building with purpose.',
      time: '3h ago',
      read: true,
      type: 'system',
      targetView: 'growth',
    },
  ]);

  // Sync theme class to document element & persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('ccl_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateWithParam = (view: AppView, paramId?: string) => {
    if (view === 'course_detail' || view === 'course_player') {
      if (paramId) setSelectedCourseId(paramId);
    } else if (view === 'challenge_detail') {
      if (paramId) setSelectedChallengeId(paramId);
    } else if (view === 'verify_certificate') {
      if (paramId) setSelectedCertificateId(paramId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, role: UserRole = 'student') => {
    setCurrentUser((prev) => ({
      ...prev,
      email,
      role,
    }));
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('public_home');
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const switchRole = (newRole: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role: newRole }));
  };

  const upgradeMembership = (tier: MembershipTier) => {
    setCurrentUser((prev) => ({ ...prev, membershipTier: tier }));
  };

  const completeOnboarding = (prefs: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...prefs }));
    setIsOnboardingOpen(false);
    setCurrentView('dashboard');
  };

  const enrollInCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, isEnrolled: true, progressPercent: c.progressPercent ?? 0 } : c))
    );
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        let total = 0;
        let completed = 0;
        const updatedModules = c.modules.map((m) => {
          const updatedLessons = m.lessons.map((l) => {
            total++;
            if (l.id === lessonId) {
              const nextVal = !l.completed;
              if (nextVal) completed++;
              return { ...l, completed: nextVal };
            }
            if (l.completed) completed++;
            return l;
          });
          return { ...m, lessons: updatedLessons };
        });
        const percent = total > 0 ? Math.round((completed / total) * 100) : c.progressPercent;
        return { ...c, modules: updatedModules, progressPercent: percent };
      })
    );
  };

  const addChallengeSubmission = (newSub: Omit<ChallengeSubmission, 'id' | 'submittedAt' | 'reactions' | 'status'>) => {
    const submission: ChallengeSubmission = {
      ...newSub,
      id: `sub_${Date.now()}`,
      submittedAt: 'Just now',
      status: 'submitted',
      reactions: { cheer: 1, fire: 1, insightful: 1 },
    };
    setSubmissions((prev) => [submission, ...prev]);

    // Also register as a project
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: submission.title,
      cover: submission.images[0] || 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
      creator: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        headline: currentUser.headline,
      },
      type: 'challenge_submission',
      description: submission.description,
      projectBrief: 'Submitted for official challenge evaluation.',
      toolsUsed: submission.toolsUsed,
      images: submission.images,
      videoUrl: submission.videoUrl,
      liveUrl: submission.liveUrl,
      status: 'submitted',
      isPublic: true,
      challengeId: submission.challengeId,
      createdAt: 'Just now',
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const createProject = (newProj: Omit<Project, 'id' | 'createdAt'>) => {
    const project: Project = {
      ...newProj,
      id: `proj_${Date.now()}`,
      createdAt: 'Just now',
    };
    setProjects((prev) => [project, ...prev]);
  };

  const updateProjectReview = (projectId: string, status: Project['status'], feedback?: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status, mentorFeedback: feedback ?? p.mentorFeedback } : p))
    );
  };

  const createPost = (spaceId: string, spaceName: string, category: PostCategory, title: string, content: string) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      spaceId,
      spaceName,
      category,
      author: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        headline: currentUser.headline,
        role: currentUser.role,
        isMentor: currentUser.role === 'mentor',
        isInstructor: currentUser.role === 'instructor',
      },
      title,
      content,
      createdAt: 'Just now',
      commentsCount: 0,
      reactions: { helpful: 1, pray: 1, inspired: 1, celebrate: 0 },
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleReaction = (postId: string, reaction: 'helpful' | 'pray' | 'inspired' | 'celebrate') => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          reactions: {
            ...p.reactions,
            [reaction]: p.reactions[reaction] + 1,
          },
        };
      })
    );
  };

  const toggleSavePrompt = (promptId: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === promptId ? { ...p, saved: !p.saved } : p))
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateWithParam,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        selectedChallengeId,
        setSelectedChallengeId,
        selectedCertificateId,
        setSelectedCertificateId,
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        updateCurrentUser,
        switchRole,
        upgradeMembership,
        isOnboardingOpen,
        setIsOnboardingOpen,
        completeOnboarding,
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        isAssistantOpen,
        setIsAssistantOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        courses,
        enrollInCourse,
        toggleLessonComplete,
        challenges,
        submissions,
        addChallengeSubmission,
        projects,
        createProject,
        updateProjectReview,
        posts,
        createPost,
        toggleReaction,
        prompts,
        toggleSavePrompt,
        resources,
        bookmarks,
        toggleBookmark,
        notifications,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
