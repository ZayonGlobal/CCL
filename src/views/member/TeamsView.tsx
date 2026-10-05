import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TeamsView: React.FC = () => {
  const { currentUser, saveActivity, dataRecords } = useApp();
  const [name, setName] = useState(currentUser.organizationName || '');
  const [details, setDetails] = useState('');
  const [saving, setSaving] = useState(false);
  const requests = dataRecords.filter(r => r.kind === 'team_request' && r.user_id === currentUser.id);
  return <div className="max-w-3xl space-y-6 pb-16">
    <div><p className="text-xs tracking-widest uppercase text-zinc-500">Churches and organizations</p><h1 className="font-serif-ccl text-4xl font-bold mt-2">Your church team</h1><p className="text-sm text-zinc-600 mt-3">Request a team workspace for your church or creative organization.</p></div>
    <form className="rounded-3xl border bg-white p-7 space-y-4" onSubmit={async e => {
      e.preventDefault(); if (saving) return; setSaving(true);
      const saved = await saveActivity('team_request', { organizationName: name.trim(), details: details.trim() });
      setSaving(false); if (saved) setDetails('');
    }}>
      <div><label htmlFor="team-name" className="text-sm font-semibold">Church or organization name</label><input id="team-name" required maxLength={200} className="w-full border rounded-xl p-3 mt-1 text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
      <div><label htmlFor="team-details" className="text-sm font-semibold">Tell us about your team</label><textarea id="team-details" required maxLength={3000} className="w-full border rounded-xl p-3 mt-1 text-sm" rows={4} value={details} onChange={e => setDetails(e.target.value)} /></div>
      <button disabled={saving} className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold disabled:opacity-50">{saving ? 'Saving…' : 'Request team workspace'}</button>
    </form>
    {requests.length > 0 && <section className="rounded-3xl border bg-white p-7"><h2 className="font-serif-ccl text-xl">Your requests</h2>{requests.map(r => <div key={r.id} className="py-3 border-b text-sm"><strong>{r.payload.organizationName}</strong><p className="text-zinc-500 mt-1">{r.status} · {new Date(r.created_at).toLocaleDateString()}</p></div>)}</section>}
  </div>;
};
