import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, BookOpen, FolderGit2, Users, Clock } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentUser, courses, projects, challenges, navigateWithParam, setCurrentView } = useApp();
  const enrolled = courses.filter(c => c.isEnrolled);
  const completed = enrolled.filter(c => c.progressPercent === 100).length;
  const available = courses.filter(c => c.published && !c.isEnrolled);
  return <div className="space-y-6 pb-16 text-zinc-900">
    <WorkspaceHeader eyebrow="Your Creator Lab" title={`Welcome, ${currentUser.firstName || 'Creator'}.`} description="Make space to learn, create, and build with purpose. Your next step starts here." action={<button onClick={()=>setCurrentView('learn')} className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold inline-flex gap-2 items-center">Explore courses<ArrowRight className="h-4 w-4"/></button>}/>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[
      ['Enrolled courses',enrolled.length,BookOpen],['Courses completed',completed,BookOpen],
      ['Your projects',projects.filter(p=>p.creator.id===currentUser.id).length,FolderGit2],['Lesson hours',currentUser.hoursLearned,Clock],
    ].map(([label,value,Icon]: any) => <div key={label} className="rounded-2xl border bg-white p-5"><Icon className="h-4 w-4 text-zinc-500" /><p className="text-3xl font-serif-ccl mt-3">{value}</p><p className="text-xs text-zinc-500 mt-1">{label}</p></div>)}</div>
    <section className="rounded-3xl border bg-white p-7 space-y-5"><h2 className="font-serif-ccl text-2xl font-bold">Continue learning</h2>{enrolled.length ? enrolled.map(c => <button key={c.id} onClick={() => navigateWithParam('course_detail',c.id)} className="w-full text-left border-t pt-4 flex justify-between gap-4"><div><strong className="text-sm">{c.title}</strong><p className="text-xs text-zinc-500 mt-1">{c.labName}</p></div><span className="text-sm shrink-0">{c.progressPercent}%<span className="mt-2 block w-20 h-1.5 rounded-full bg-zinc-100 overflow-hidden"><span className="block h-full rounded-full bg-black dark:bg-white" style={{width:`${c.progressPercent}%`}}/></span></span></button>) : <p className="text-sm text-zinc-500">You have not enrolled in a course yet. Explore the academy when new lessons are published.</p>}</section>
    <div className="grid lg:grid-cols-2 gap-5">
      <section className="rounded-3xl border bg-white p-7 space-y-4"><h2 className="font-serif-ccl text-2xl font-bold">Explore the academy</h2>{available.slice(0,3).map(c => <button key={c.id} onClick={() => navigateWithParam('course_detail',c.id)} className="block text-left w-full border-t pt-3 text-sm">{c.title}<p className="text-xs text-zinc-500 mt-1">{c.shortDesc}</p></button>)}{!available.length && <p className="text-sm text-zinc-500">New courses will appear here when they are published.</p>}</section>
      <section className="rounded-3xl border bg-white p-7 space-y-4"><h2 className="font-serif-ccl text-2xl font-bold">Create with your community</h2><p className="text-sm text-zinc-500">Share your work, ask questions, and learn from other creators.</p><button onClick={() => setCurrentView('community')} className="inline-flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4" />Open the community<ArrowRight className="h-4 w-4" /></button>{challenges.slice(0,2).map(c => <button key={c.id} onClick={() => navigateWithParam('challenge_detail',c.id)} className="block border-t pt-3 text-sm text-left w-full">{c.title}</button>)}</section>
    </div>
  </div>;
};

