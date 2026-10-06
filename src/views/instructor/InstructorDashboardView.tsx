import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LABS } from '../../data/seedData';
import { isAdmin } from '../../services/data';
import { safeUrl, errorMessage } from '../../services/supabase';
import type { Course, Module, Lesson, MembershipTier } from '../../types';

function videoId(value: string) {
  const input = value.trim();
  if (!input) return '';
  if (/^[\w-]{11}$/.test(input)) return input;
  const url = new URL(input);
  if (!['youtube.com','www.youtube.com','m.youtube.com','youtu.be','www.youtube-nocookie.com'].includes(url.hostname)) throw new Error('Use a YouTube video link or 11-character video ID.');
  const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').pop() || '';
  if (!/^[\w-]{11}$/.test(id)) throw new Error('That YouTube video link is not valid.');
  return id;
}
const field = 'w-full rounded-xl border border-gray-200 bg-white p-3 text-sm';
const secondary = 'rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold disabled:opacity-50';

export const InstructorDashboardView: React.FC = () => {
  const { currentUser, courses, publishCatalog, navigateWithParam } = useApp();
  const [editing, setEditing] = useState<Course | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const admin = isAdmin(currentUser.role);
  const owned = courses.filter(c => admin || c.ownerId === currentUser.id);
  const patch = (changes: Partial<Course>) => setEditing(c => c ? { ...c, ...changes } : c);
  const patchModule = (id: string, changes: Partial<Module>) => setEditing(c => c ? { ...c, modules: c.modules.map(m => m.id === id ? { ...m, ...changes } : m) } : c);
  const patchLesson = (moduleId: string, id: string, changes: Partial<Lesson>) => setEditing(c => c ? { ...c, modules: c.modules.map(m => m.id === moduleId ? { ...m, lessons: m.lessons.map(l => l.id === id ? { ...l, ...changes } : l) } : m) } : c);
  const startNew = () => {
    const id = `course_${crypto.randomUUID()}`;
    setEditing({ id, slug: id, ownerId: currentUser.id, title: '', shortDesc: '', fullDesc: '', thumbnail: '/brand/ccl-logo.png',
      labId: LABS[0].id, labName: LABS[0].name, level: 'Explorer', difficulty: 'Beginner', durationMinutes: 0, lessonCount: 0,
      membershipAccess: 'free', published: false, learningOutcomes: [], prerequisites: [], projectsOverview: '', faq: [], modules: [],
      instructor: { name: `${currentUser.firstName} ${currentUser.lastName}`.trim(), title: 'CCL Instructor', bio: currentUser.bio, avatar: currentUser.avatar } });
    setError(''); setNotice('');
  };
  const edit = (course: Course) => { setEditing(structuredClone(course)); setNotice(''); setError(''); };
  const save = async (course: Course, published: boolean) => {
    if (busy) return;
    setBusy(true); setError(''); setNotice('');
    try {
      if (!course.title.trim() || !course.shortDesc.trim()) throw new Error('Add a course title and description.');
      const modules = course.modules.map((m, i) => ({ ...m, order: i + 1, lessons: m.lessons.map((l, j) => ({ ...l, order: j + 1, youtubeVideoId: videoId(l.youtubeVideoId) })) }));
      const lessons = modules.flatMap(m => m.lessons);
      if (published && (!lessons.length || modules.some(m => !m.title.trim()) || lessons.some(l => !l.title.trim() || !l.youtubeVideoId))) throw new Error('Before publishing, add a named module and at least one lesson. Every lesson needs a title and a valid YouTube video.');
      const thumbnail = course.thumbnail.startsWith('/') && !course.thumbnail.startsWith('//') ? course.thumbnail : safeUrl(course.thumbnail);
      if (!thumbnail) throw new Error('Enter a valid thumbnail URL.');
      const saved = await publishCatalog('course', { ...course, title: course.title.trim(), modules, thumbnail,
        lessonCount: lessons.length, durationMinutes: lessons.reduce((n, l) => n + l.durationMinutes, 0), published }, published);
      if (!saved) throw new Error('The course could not be saved. Check your access and try again.');
      setEditing(null); setNotice(published ? 'Course saved and published.' : 'Course saved as a draft.');
    } catch (e) { setError(errorMessage(e)); }
    finally { setBusy(false); }
  };
  return <div className="max-w-5xl mx-auto space-y-6 pb-20">
    <div className="flex flex-wrap justify-between items-center gap-4"><div><p className="text-xs uppercase tracking-widest text-zinc-500">Teach with purpose</p><h1 className="text-4xl font-serif-ccl font-bold mt-2">Instructor Studio</h1><p className="text-sm text-zinc-500 mt-2">{admin ? 'Manage all CCL courses.' : 'Create and manage your own courses.'}</p></div><button disabled={busy || !!editing} onClick={startNew} className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold disabled:opacity-50">New course</button></div>
    <div className="grid grid-cols-3 gap-3">{[['Courses', owned.length], ['Published', owned.filter(c => c.published).length], ['Drafts', owned.filter(c => !c.published).length]].map(([label, count]) => <div key={label} className="bg-white border rounded-2xl p-4"><p className="text-xs text-zinc-500">{label}</p><p className="text-3xl font-serif-ccl mt-1">{count}</p></div>)}</div>
    {error && <p role="alert" className="rounded-xl bg-rose-50 text-rose-800 p-4 text-sm">{error}</p>}
    {notice && <p role="status" className="rounded-xl bg-emerald-50 text-emerald-900 p-4 text-sm">{notice}</p>}
    {editing ? <form onSubmit={e => { e.preventDefault(); void save(editing, editing.published); }} className="bg-white border rounded-3xl p-5 sm:p-8 space-y-5">
      <fieldset disabled={busy} className="space-y-5">
        <h2 className="text-2xl font-serif-ccl">Course details</h2>
        {editing.published && <p className="text-sm text-amber-800">This course is live. Saving updates changes what learners see.</p>}
        <label className="block text-sm">Course title<input required maxLength={200} className={field} value={editing.title} onChange={e => patch({ title: e.target.value })} /></label>
        <label className="block text-sm">Short description<textarea required maxLength={500} className={field} value={editing.shortDesc} onChange={e => patch({ shortDesc: e.target.value })} /></label>
        <label className="block text-sm">Full description<textarea maxLength={10000} className={field} value={editing.fullDesc || ''} onChange={e => patch({ fullDesc: e.target.value })} /></label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm">Learning lab<select className={field} value={editing.labId} onChange={e => { const lab = LABS.find(l => l.id === e.target.value)!; patch({ labId: lab.id, labName: lab.name }); }}>{LABS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}</select></label>
          <label className="text-sm">Difficulty<select className={field} value={editing.difficulty} onChange={e => patch({ difficulty: e.target.value as Course['difficulty'] })}>{['Beginner','Intermediate','Advanced'].map(v => <option key={v}>{v}</option>)}</select></label>
          <label className="text-sm">Membership access<select className={field} value={editing.membershipAccess} onChange={e => patch({ membershipAccess: e.target.value as MembershipTier })}>{['free','creator','builder','pro','teams'].map(v => <option key={v}>{v}</option>)}</select></label>
          <label className="text-sm">Thumbnail URL<input className={field} value={editing.thumbnail} onChange={e => patch({ thumbnail: e.target.value })} /></label>
        </div>
        <label className="block text-sm">Learning outcomes (one per line)<textarea className={field} value={editing.learningOutcomes.join('\n')} onChange={e => patch({ learningOutcomes: e.target.value.split('\n') })} /></label>
        <div className="flex flex-wrap justify-between gap-3 items-center"><h2 className="font-serif-ccl text-2xl">Modules and lessons</h2><button type="button" className={secondary} onClick={() => patch({ modules: [...editing.modules, { id: `module_${crypto.randomUUID()}`, courseId: editing.id, title: '', description: '', order: editing.modules.length + 1, lessons: [] }] })}>Add module</button></div>
        {editing.modules.map((m, mi) => <section key={m.id} className="rounded-2xl border p-4 space-y-4">
          <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold">Module {mi + 1}</h3><button type="button" className="text-xs underline" onClick={() => { if (window.confirm('Remove this module and its lessons from the editor? Save to apply.')) patch({ modules: editing.modules.filter(v => v.id !== m.id) }); }}>Remove module</button></div>
          <label className="block text-sm">Module title<input className={field} value={m.title} onChange={e => patchModule(m.id, { title: e.target.value })} /></label>
          {m.lessons.map((l, li) => <div key={l.id} className="rounded-xl bg-zinc-50 border p-4 space-y-3">
            <div className="flex justify-between gap-3"><h4 className="text-sm font-semibold">Lesson {li + 1}</h4><button type="button" className="text-xs underline" onClick={() => { if (window.confirm('Remove this lesson from the editor? Save to apply.')) patchModule(m.id, { lessons: m.lessons.filter(v => v.id !== l.id) }); }}>Remove lesson</button></div>
            <label className="block text-sm">Lesson title<input className={field} value={l.title} onChange={e => patchLesson(m.id, l.id, { title: e.target.value })} /></label>
            <label className="block text-sm">YouTube link or video ID<input className={field} value={l.youtubeVideoId} onChange={e => patchLesson(m.id, l.id, { youtubeVideoId: e.target.value })} /></label>
            <label className="block text-sm">Duration in minutes<input type="number" min={0} max={1440} className={field} value={l.durationMinutes} onChange={e => patchLesson(m.id, l.id, { durationMinutes: Math.max(0, Math.min(1440, Number(e.target.value))) })} /></label>
            <label className="block text-sm">Lesson notes<textarea className={field} value={l.notes} onChange={e => patchLesson(m.id, l.id, { notes: e.target.value })} /></label>
            <label className="block text-sm">Transcript<textarea className={field} value={l.transcript} onChange={e => patchLesson(m.id, l.id, { transcript: e.target.value })} /></label>
          </div>)}
          <button type="button" className={secondary} onClick={() => patchModule(m.id, { lessons: [...m.lessons, { id: `lesson_${crypto.randomUUID()}`, moduleId: m.id, courseId: editing.id, title: '', description: '', youtubeVideoId: '', durationMinutes: 0, notes: '', transcript: '', resources: [], order: m.lessons.length + 1 }] })}>Add lesson</button>
        </section>)}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <button type="submit" className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold">{busy ? 'Saving…' : editing.published ? 'Save published course' : 'Save draft'}</button>
          {!editing.published && <button type="button" className={secondary} onClick={() => save(editing, true)}>Save and publish</button>}
          <button type="button" className={secondary} onClick={() => { if (window.confirm('Discard unsaved course changes?')) setEditing(null); }}>Cancel</button>
        </div>
      </fieldset>
    </form> : <section className="bg-white border rounded-3xl p-5 sm:p-8 space-y-4"><h2 className="text-2xl font-serif-ccl">{admin ? 'All courses' : 'Your courses'}</h2>
      {!owned.length && <p className="text-sm text-zinc-500">No courses yet. Create a draft, add your lessons, then publish when ready.</p>}
      {owned.map(c => <div key={c.id} className="border-t pt-4 flex flex-wrap items-center justify-between gap-4"><div><h3 className="font-semibold">{c.title}</h3><p className="text-xs text-zinc-500 mt-1">{c.published ? 'Published' : 'Draft'} · {c.lessonCount} lessons · {c.labName}</p></div><div className="flex flex-wrap gap-2"><button disabled={busy} className={secondary} onClick={() => edit(c)}>Edit</button><button disabled={busy} className={secondary} onClick={() => navigateWithParam('course_detail', c.id)}>Preview</button><button disabled={busy} className={secondary} onClick={() => save(c, !c.published)}>{c.published ? 'Unpublish' : 'Publish'}</button></div></div>)}
    </section>}
  </div>;
};
