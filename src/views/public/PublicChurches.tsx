import React, { useState } from 'react';
import { saveInquiry } from '../../services/data';
import { errorMessage } from '../../services/supabase';
import { LoadingSymbol } from '../../components/LoadingSymbol';
import { PublicPage, Cards, EditorialImage } from './PublicContent';
export const PublicChurches: React.FC = () => {
  const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [church, setChurch] = useState(''); const [size, setSize] = useState('');
  const [needs, setNeeds] = useState(''); const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false); const [error, setError] = useState('');
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (saving) return; setSaving(true); setError('');
    try { await saveInquiry({ name, email, subject: 'Church team request', message: `Church or organisation: ${church}. Team size: ${size}. Learning needs: ${needs}` }); setSubmitted(true); }
    catch (err) { setError(errorMessage(err)); } finally { setSaving(false); }
  }
  const inputClass = 'block w-full mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm';
  return <PublicPage eyebrow="Churches and teams" title="Help your media team work with clarity and confidence." intro="Tell us what your church or organisation wants to learn. From event communication to content planning, we want to help teams explore practical AI skills with care for accuracy, people, and the message they share.">
    <Cards items={[
      { title: 'Service and event communication', text: 'Discuss your needs for announcements, invitation copy, flyer concepts, and social content that communicates clearly.' },
      { title: 'A more confident creative team', text: 'Identify the skills your volunteers need: better prompts, creative planning, editing, or checking AI-assisted work.' },
      { title: 'Responsible use in ministry', text: 'Build habits for checking Scripture, protecting personal information, and keeping human review in your workflow.' }
    ]} />
    <div className="ccl-enquiry-layout"><aside className="ccl-enquiry-aside"><EditorialImage photo="team" /><h2>Tell us where<br />you want to grow.</h2><p>Share your team’s goals. We’ll start with the skills, tasks, and people that matter to you.</p><a href="mailto:cclabsupport@gmail.com" className="ccl-text-link">cclabsupport@gmail.com</a></aside><section className="ccl-editorial-panel"><h2 className="font-serif-ccl text-3xl font-bold mb-4">Tell us about your team</h2><p className="text-sm text-zinc-600 mb-6">This form starts a conversation. Learning needs and programme availability need to be discussed with CCL. Shared team seats and reporting are not activated by submitting an enquiry.</p>
    {submitted ? <p role="status">Thank you, {name}. Your team enquiry has been received. We have {email} as your contact address.</p> : <form onSubmit={submit} className="space-y-5">
      {error && <p role="alert" className="text-rose-700">{error}</p>}
      <fieldset disabled={saving} className="space-y-5">
        <label className="block text-sm font-semibold">Your name<input required maxLength={150} value={name} onChange={e => setName(e.target.value)} autoComplete="name" className={inputClass} /></label>
        <label className="block text-sm font-semibold">Email address<input required type="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" className={inputClass} /></label>
        <label className="block text-sm font-semibold">Church or organisation<input required maxLength={150} value={church} onChange={e => setChurch(e.target.value)} className={inputClass} /></label>
        <label className="block text-sm font-semibold">Number of team members<input required type="number" min="1" max="10000" value={size} onChange={e => setSize(e.target.value)} className={inputClass} /></label>
        <label className="block text-sm font-semibold">What would you like to learn?<textarea required maxLength={3000} rows={4} value={needs} onChange={e => setNeeds(e.target.value)} className={inputClass} /></label>
        <button className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold flex items-center gap-2" type="submit">{saving && <LoadingSymbol inline inverse label="Sending enquiry" />}{saving ? 'Sending…' : 'Send team enquiry'}</button>
      </fieldset>
    </form>}</section></div>
  </PublicPage>;
};
