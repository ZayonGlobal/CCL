import React from 'react';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PublicPage, PublicActions, Cards, ChannelCard, EditorialImage, SectionHeading } from './PublicContent';
export const PublicHome: React.FC = () => {
 const { setCurrentView } = useApp();
 return <PublicPage home eyebrow="A space for Christian creators" title="Learn AI. Create with purpose." intro="Turn your ideas into meaningful creative work. Explore AI for design, content, ministry, and business—with faith and human judgment at the heart of it.">
  <div className="ccl-focus-strip"><span>Built around your real work</span><div><span>Church media</span><span>Design & content</span><span>Business ideas</span><span>Responsible AI</span></div></div>
  <section><SectionHeading eyebrow="From possibility to practice" title="What will you create next?" text="Start with a task that matters to you. Learn how AI can help you think, draft, and make it better." /><Cards items={[
    { title: 'Media that carries the message', text: 'Plan service announcements, develop flyer ideas, write event invitations, and shape social content that serves your church.' },
    { title: 'Content with your own voice', text: 'Organise ideas, draft captions and scripts, and edit with intention. Let the tool help you express what you actually want to say.' },
    { title: 'Ideas that move your business', text: 'Work on creative briefs, product descriptions, customer messages, and digital concepts you can develop into useful services.' }
  ]} /></section>
  <section className="ccl-foundation"><div className="ccl-foundation-copy"><p className="ccl-eyebrow"><span className="ccl-status-dot" />The open starting point</p><h2>A strong foundation.<br />Room to grow.</h2><p>Begin with AI Foundations: understand the tools, write clearer prompts, and learn to check what they produce. The other specialist labs are coming soon.</p><ul className="ccl-check-list">{['Understand what AI can and cannot do', 'Give better instructions and useful context', 'Review, refine, and create responsibly'].map(x => <li key={x}><Check size={17} />{x}</li>)}</ul><PublicActions secondary="public_courses" label="Explore learning" /></div><div className="ccl-foundation-visual"><EditorialImage photo="creator" /><div className="ccl-foundation-tag"><span>01 / THE FOUNDATIONS</span><strong>Start curious.<br />Build confidence.</strong><ArrowUpRight size={26} /></div></div></section>
  <section><SectionHeading eyebrow="A simple way to begin" title="Bring an idea. Build a skill." /><div className="ccl-steps">{[
    ['01', 'Get your bearings', 'Create a free account and explore the AI Foundations learning space.'],
    ['02', 'Try a real task', 'Bring a caption, announcement, design idea, or business problem to practise with.'],
    ['03', 'Make it your own', 'Check the result, improve it, and apply your creative judgment before sharing.']
  ].map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  <section className="ccl-team-story"><EditorialImage photo="team" /><div><p className="ccl-eyebrow">For churches & creative teams</p><h2>Good work grows<br />when we learn together.</h2><p>Help your volunteers explore practical AI skills for communication, creative planning, and responsible publishing. Tell us what your team needs.</p><button className="ccl-text-link" onClick={() => setCurrentView('public_churches')}>Talk about team learning<ArrowRight size={18} /></button></div></section>
  <ChannelCard />
 </PublicPage>;
};
