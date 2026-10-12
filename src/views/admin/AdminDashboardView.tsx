import { LoadingSymbol } from '../../components/LoadingSymbol';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { backend, errorMessage, safeUrl } from '../../services/supabase';
import { LABS } from '../../data/seedData';
import type { Course, MembershipTier, UserRole } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const { currentUser, courses, projects, dataRecords, publishCatalog, updateProjectReview, setDataError } = useApp();
  const [members, setMembers] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lab, setLab] = useState('ai-foundations');
  const [video, setVideo] = useState('');
  const [published, setPublished] = useState(false);
  const [feedback, setFeedback] = useState<Record<string,string>>({});
  const load = async () => {
    setLoading(true);
    try {
    const [accounts, profiles, messages] = await Promise.all([
      backend().from('ccl_accounts').select('*'), backend().from('ccl_profiles').select('*'),
      backend().from('ccl_inquiries').select('*').order('created_at', { ascending: false }).limit(100),
    ]);
    for (const result of [accounts, profiles, messages]) if (result.error) throw result.error;
    setMembers((accounts.data || []).map(a => ({ ...a, profile: (profiles.data || []).find(p => p.user_id === a.user_id)?.profile || {} })));
    setInquiries(messages.data || []);
    } finally { setLoading(false); }
  };
  useEffect(() => { void load().catch(error => setDataError(errorMessage(error))); }, []);
  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault(); if (busy) return; setBusy(true);
    try {
      let videoId = video.trim();
      if (videoId.includes('http')) {
        const url = new URL(safeUrl(videoId)!);
        videoId = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').pop() || '';
      }
      if (videoId && !/^[A-Za-z0-9_-]{11}$/.test(videoId)) throw new Error('Enter a valid YouTube video link or ID.');
      if (published && !videoId) throw new Error('Add a lesson video before publishing.');
      const id = `course_${crypto.randomUUID()}`; const lessonId = `lesson_${crypto.randomUUID()}`;
      const labData = LABS.find(l => l.id === lab)!;
      const course: Course = { id, slug: id, title: title.trim(), shortDesc: description.trim(), fullDesc: description.trim(),
        thumbnail: '/avatar.svg', labId: labData.id, labName: labData.name, level: 'Explorer', difficulty: 'Beginner',
        durationMinutes: 0, lessonCount: videoId ? 1 : 0, membershipAccess: 'free', learningOutcomes: [], prerequisites: [], published,
        instructor: { name: `${currentUser.firstName} ${currentUser.lastName}`, title: 'CCL instructor', avatar: currentUser.avatar, bio: '' },
        modules: videoId ? [{ id: `module_${id}`, courseId: id, title: 'Getting started', description: '', order: 1,
          lessons: [{ id: lessonId, moduleId: `module_${id}`, courseId: id, title: title.trim(), description: description.trim(),
            youtubeVideoId: videoId, durationMinutes: 0, transcript: '', notes: '', resources: [], order: 1 }] }] : [],
        projectsOverview: '', faq: [] };
      const saved = await publishCatalog('course', course, published);
      if (saved) { setTitle(''); setDescription(''); setVideo(''); }
    } catch (error) { setDataError(errorMessage(error)); }
    finally { setBusy(false); }
  };
  const updateMember = async (userId: string, changes: { role?: UserRole; membership_tier?: MembershipTier }) => {
    if (busy) return; setBusy(true);
    try {
      const { error } = await backend().from('ccl_accounts').update(changes).eq('user_id', userId);
      if (error) throw error; await load();
    } catch (error) { setDataError(errorMessage(error)); }
    finally { setBusy(false); }
  };
  const section = 'rounded-3xl bg-white border p-6 sm:p-8 space-y-4';
  return <div className="space-y-7 pb-20 max-w-5xl mx-auto">
    <div><p className="text-xs uppercase tracking-widest text-zinc-500">Platform administration</p><h1 className="text-4xl font-serif-ccl font-bold mt-2">CCL Operations</h1></div>
    {(loading || busy) && <LoadingSymbol inline label={loading ? "Loading admin data…" : "Saving changes…"} />}
    <div className="grid grid-cols-3 gap-3">{[['Members',members.length],['Courses',courses.length],['Inquiries',inquiries.length]].map(([label,value]) => <div key={label} className={section}><span className="text-xs text-zinc-500">{label}</span><p className="text-3xl font-serif-ccl">{value}</p></div>)}</div>
    <section className={section}><h2 className="font-serif-ccl text-2xl">Add a course</h2>
      <form onSubmit={createCourse} className="space-y-4">
        <div><label htmlFor="course-title" className="text-sm">Title</label><input id="course-title" required maxLength={200} value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
        <div><label htmlFor="course-description" className="text-sm">Description</label><textarea id="course-description" required maxLength={5000} value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
        <div><label htmlFor="course-lab" className="text-sm">Learning lab</label><select id="course-lab" value={lab} onChange={e => setLab(e.target.value)} className="w-full border rounded-xl p-3 text-sm">{LABS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}</select></div>
        <div><label htmlFor="course-video" className="text-sm">YouTube lesson link</label><input id="course-video" value={video} onChange={e => setVideo(e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />Publish now</label>
        <button disabled={busy} className="rounded-full bg-black text-white px-6 py-3 text-sm">{busy && <LoadingSymbol inline inverse label="Saving…" />}{busy ? 'Saving…' : 'Save course'}</button>
      </form>
      {courses.map(c => <div key={c.id} className="border-t pt-3 flex justify-between gap-3 text-sm"><span>{c.title} · {c.published ? 'Published' : 'Draft'}</span><button disabled={busy || (!c.published && !c.modules.some(m => m.lessons.length))} onClick={() => publishCatalog('course', c, !c.published)}>{c.published ? 'Unpublish' : 'Publish'}</button></div>)}
    </section>
    <section className={section}><h2 className="font-serif-ccl text-2xl">Members and access</h2>{members.map(m => <div key={m.user_id} className="border-t pt-4 grid sm:grid-cols-3 gap-3 text-sm"><div><strong>{m.profile.firstName} {m.profile.lastName}</strong><p className="text-xs text-zinc-500 break-all">{m.user_id}</p></div><select aria-label="Member role" disabled={busy || m.user_id===currentUser.id} value={m.role} onChange={e => updateMember(m.user_id, { role: e.target.value as UserRole })}>{['student','mentor','instructor','organization_admin','administrator'].map(r => <option key={r}>{r}</option>)}</select><select aria-label="Membership plan" disabled={busy} value={m.membership_tier} onChange={e => updateMember(m.user_id, { membership_tier: e.target.value as MembershipTier })}>{['free','creator','builder','pro','teams'].map(t => <option key={t}>{t}</option>)}</select></div>)}</section>
    <section className={section}><h2 className="font-serif-ccl text-2xl">Project reviews</h2>{projects.map(p => <div key={p.id} className="border-t pt-4 space-y-3 text-sm"><strong>{p.title}</strong><p>{p.description}</p><input aria-label="Review feedback" placeholder="Feedback for the creator" value={feedback[p.id] || ''} onChange={e => setFeedback(v => ({ ...v, [p.id]: e.target.value }))} className="w-full border rounded-xl p-3" /><div className="flex gap-4"><button onClick={() => updateProjectReview(p.id,'approved',feedback[p.id])}>Approve</button><button onClick={() => updateProjectReview(p.id,'needs_revision',feedback[p.id])}>Request revision</button></div></div>)}</section>
    <section className={section}><h2 className="font-serif-ccl text-2xl">Contact inquiries</h2>{inquiries.map(i => <div key={i.id} className="border-t pt-4 text-sm space-y-1"><strong>{i.subject}</strong><p>{i.name} · {i.email}</p><p className="whitespace-pre-wrap text-zinc-600">{i.message}</p></div>)}{!inquiries.length && <p className="text-sm text-zinc-500">No inquiries yet.</p>}</section>
    <section className={section}><h2 className="font-serif-ccl text-2xl">Team and membership requests</h2>{dataRecords.filter(r => ['team_request','membership_request'].includes(r.kind)).map(r => <div key={r.id} className="border-t pt-3 text-sm"><strong>{r.payload.creator?.name}</strong><p>{r.payload.organizationName || r.payload.requestedTier}</p><p className="text-zinc-500">{r.payload.details}</p></div>)}</section>
  </div>;
};

