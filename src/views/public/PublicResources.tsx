import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { PublicPage, SectionHeading, ChannelCard } from './PublicContent';
export const PublicResources: React.FC = () => {
 const [task,setTask] = useState('Write an invitation for a church event');
 const [audience,setAudience] = useState('Church members and first-time visitors');
 const [context,setContext] = useState(''); const [format,setFormat] = useState('A short WhatsApp message');
 const [copyState,setCopyState] = useState('');
 const prompt = `Task: ${task.trim() || 'Describe what you want to make'}.\nAudience: ${audience.trim() || 'Describe who it is for'}.\nContext: ${context.trim() || 'Ask me for any missing details before drafting'}.\nOutput: ${format}.\nUse clear, welcoming language. Do not invent dates, names, facts, or Bible quotations. Flag anything I should verify. Give me a draft I can review and improve.`;
 async function copy() { try { await navigator.clipboard.writeText(prompt);setCopyState('Prompt copied.'); } catch {setCopyState('Select the prompt below and copy it manually.');} }
 return <PublicPage photo="study" eyebrow="Free guides & resources" title={<>Less guesswork.<br /><em>More useful practice.</em></>} intro="Read a short guide, try the prompt builder, and put one idea to work. These resources are free to use without signing in. No subscription or payment is required.">
  <section><SectionHeading eyebrow="A tool you can use now" title="Build a clearer prompt." text="Describe the task, audience, and context. Copy the result into the AI tool you use, then review its response." /><div className="ccl-prompt-builder"><div className="ccl-editorial-panel"><div className="ccl-form-fields">
   <label>What do you want to create?<input value={task} maxLength={500} onChange={e=>setTask(e.target.value)} /></label>
   <label>Who is it for?<input value={audience} maxLength={500} onChange={e=>setAudience(e.target.value)} /></label>
   <label>Details the tool needs<textarea value={context} maxLength={2000} rows={4} placeholder="Event name, purpose, confirmed date, tone, or other details…" onChange={e=>setContext(e.target.value)} /></label>
   <label>Output format<select value={format} onChange={e=>setFormat(e.target.value)}><option>A short WhatsApp message</option><option>Three social media captions</option><option>A creative brief for a flyer</option><option>A 60-second video script</option><option>A step-by-step work plan</option></select></label>
  </div></div><div className="ccl-editorial-panel"><p className="ccl-eyebrow">Your prompt</p><pre className="ccl-prompt-output">{prompt}</pre><button className="ccl-button ccl-button-primary" onClick={copy}>{copyState==='Prompt copied.'?<Check size={16}/>:<Copy size={16}/>}Copy prompt</button><p role="status" className="ccl-small-note">{copyState}</p><p className="ccl-small-note">Keep personal or confidential information out of prompts.</p></div></div></section>
  <section><SectionHeading eyebrow="Practical starting guides" title="Small lessons. Real applications." /><div className="space-y-4">
   {[
    ['Write a better creative prompt', 'Start with one clear outcome. Say who the work is for, provide the relevant details, and choose the format. Ask for a draft, then explain what needs to change instead of starting over. Try the builder above with a task you actually need to complete.'],
    ['Turn an announcement into useful content', 'Begin with confirmed information: what is happening, who it is for, when, where, and how to respond. Ask for a short invitation, a social caption, and a flyer brief. Check each output against the original details and adjust the tone for your audience.'],
    ['Check AI-assisted work before sharing', 'Check names, dates, links, and factual claims against reliable sources. Verify Bible references and exact quotations in your chosen translation. Review images for misleading details and confirm you have permission to use any source material. You remain responsible for the final work.'],
    ['Practise with a simple project', 'Choose a church event, a business product, or a topic you care about. Create one clear brief, one caption, and one visual concept. Keep the original prompt and your edited result so you can see what improved. Share the process when asking for feedback.']
   ].map(([title,text])=><details key={title} className="border bg-white rounded-2xl"><summary>{title}</summary><p className="text-sm text-zinc-600 leading-relaxed mt-4">{text}</p></details>)}
  </div></section><ChannelCard />
 </PublicPage>;
};
