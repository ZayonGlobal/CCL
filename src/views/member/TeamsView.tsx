import { WorkspaceHeader, WorkspaceStat } from '../../components/WorkspaceHeader';
import { LoadingSymbol } from '../../components/LoadingSymbol';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TeamsView: React.FC = () => {
  const { currentUser, saveActivity, dataRecords, setCurrentView } = useApp();
  const [name, setName] = useState(currentUser.organizationName || '');
  const [details, setDetails] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice,setNotice]=useState('');
  const requests = dataRecords.filter(r => r.kind === 'team_request' && r.user_id === currentUser.id);
  return <div className="space-y-6 pb-20">
    <WorkspaceHeader eyebrow="Churches and organizations" title={currentUser.role==='organization_admin'?'Organization workspace':'Your church team'} description="Plan your creative learning together. Track your workspace requests and connect with the CCL community." action={<button onClick={()=>setCurrentView('community')} className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold">Connect with creators</button>}/>
    <div className="grid sm:grid-cols-3 gap-4"><WorkspaceStat label="Your workspace requests" value={requests.length}/><WorkspaceStat label="Organization" value={currentUser.organizationName||'Add your organization'}/><div className="workspace-card"><p className="text-xs text-zinc-500">Next step</p><button onClick={()=>setCurrentView('learn')} className="text-sm font-semibold mt-4">Explore the learning library →</button></div></div>
    {notice&&<p role="status" className="rounded-xl bg-emerald-50 text-emerald-900 p-4 text-sm">{notice}</p>}
    <div className="grid lg:grid-cols-2 gap-6 items-start">
    <form className="rounded-3xl border bg-white p-7 space-y-4" onSubmit={async e => {
      e.preventDefault(); if (saving) return; setSaving(true);
      const saved = await saveActivity('team_request', { organizationName: name.trim(), details: details.trim() });
      setSaving(false); if (saved) {setDetails('');setNotice('Your workspace request has been submitted.');}
    }}>
      <div><label htmlFor="team-name" className="text-sm font-semibold">Church or organization name</label><input id="team-name" required maxLength={200} className="w-full border rounded-xl p-3 mt-1 text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
      <div><label htmlFor="team-details" className="text-sm font-semibold">Tell us about your team</label><textarea id="team-details" required maxLength={3000} className="w-full border rounded-xl p-3 mt-1 text-sm" rows={4} value={details} onChange={e => setDetails(e.target.value)} /></div>
      <button disabled={saving} className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold disabled:opacity-50">{saving && <LoadingSymbol inline inverse label="Saving…" />}{saving ? 'Saving…' : 'Request team workspace'}</button>
    </form>
    <section className="workspace-card"><h2 className="font-serif-ccl text-2xl font-bold">Build a learning plan</h2><p className="text-sm text-zinc-500 leading-relaxed mt-3">Choose courses, gather useful resources, and share practical projects with your team.</p><div className="flex flex-wrap gap-3 mt-5"><button onClick={()=>setCurrentView('learn')} className="rounded-full border border-gray-200 px-4 py-2 text-sm">Courses</button><button onClick={()=>setCurrentView('resources')} className="rounded-full border border-gray-200 px-4 py-2 text-sm">Resources</button></div></section></div>
    {requests.length > 0 && <section className="rounded-3xl border bg-white p-7"><h2 className="font-serif-ccl text-xl">Your requests</h2>{requests.map(r => <div key={r.id} className="py-3 border-b text-sm"><strong>{r.payload.organizationName}</strong><p className="text-zinc-500 mt-1">{r.status} · {new Date(r.created_at).toLocaleDateString()}</p></div>)}</section>}
  </div>;
};

