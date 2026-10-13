import React from 'react';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PublicPage, PublicActions, Cards, ChannelCard, EditorialImage, SectionHeading } from './PublicContent';
export const PublicHome: React.FC = () => {
 const { setCurrentView } = useApp();
 return <PublicPage home eyebrow="Faith × Creativity × Impact" title={<>Create with<br /><em>Purpose.</em><br />Build for Eternity.</>} intro="Christian Creator Lab equips you with the skills, tools, and community to create meaningful content, grow your influence, and make a lasting impact for God’s Kingdom.">
  <div className="ccl-focus-strip"><span>Built around your real work</span><div><span>Church media</span><span>Design & content</span><span>Business ideas</span><span>Responsible AI</span></div></div>
  <section><SectionHeading eyebrow="Inside Christian Creator Lab" title="Learn. Ask. Create. Grow." text="A practical starting point for Christians who want to turn AI experiments into useful work." /><Cards items={[
   {title:'Learn the foundations',text:'Build understanding before chasing tools. Start with clear instructions, useful context, and careful review.'},
   {title:'Ask and share',text:'Bring a question or show your process in the member community. Make it easy for others to understand what you are trying.'},
   {title:'Make something useful',text:'Practise with a church announcement, a business brief, a content idea, or another task that matters to you.'},
   {title:'Use free resources',text:'Read our starting guides, try the prompt builder, and get the AI Bible from the WhatsApp channel.'},
   {title:'Build with integrity',text:'Check Scripture and factual claims. Respect privacy and permissions, and keep human judgment in the process.'},
   {title:'Grow at your own pace',text:'Create a free account and follow learning updates. AI Foundations is open; specialist labs are coming soon.'}
  ]} /></section>
  <section><SectionHeading eyebrow="From possibility to practice" title="What will you create next?" text="Start with a task that matters to you. Learn how AI can help you think, draft, and make it better." /><Cards items={[
    { title: 'Media that carries the message', text: 'Plan service announcements, develop flyer ideas, write event invitations, and shape social content that serves your church.' },
    { title: 'Content with your own voice', text: 'Organise ideas, draft captions and scripts, and edit with intention. Let the tool help you express what you actually want to say.' },
    { title: 'Ideas that move your business', text: 'Work on creative briefs, product descriptions, customer messages, and digital concepts you can develop into useful services.' }
  ]} /></section>
  <section className="ccl-foundation"><div className="ccl-foundation-copy"><p className="ccl-eyebrow"><span className="ccl-status-dot" />The open starting point</p><h2>A strong foundation.<br />Room to grow.</h2><p>Begin with AI Foundations: understand the tools, write clearer prompts, and learn to check what they produce. The other specialist labs are coming soon.</p><ul className="ccl-check-list">{['Understand what AI can and cannot do', 'Give better instructions and useful context', 'Review, refine, and create responsibly'].map(x => <li key={x}><Check size={17} />{x}</li>)}</ul><PublicActions secondary="public_courses" label="Explore learning" /></div><div className="ccl-foundation-visual"><EditorialImage photo="creator" /><div className="ccl-foundation-tag"><span>01 / THE FOUNDATIONS</span><strong>Start curious.<br />Build confidence.</strong><ArrowUpRight size={26} /></div></div></section>
  <section><SectionHeading eyebrow="A simple way to begin" title="Bring an idea. Build a skill." /><div className="ccl-steps ccl-joining-steps">{[
    ['01', 'Join free', 'Create your CCL account. There is no subscription or payment step.'],
    ['02', 'Confirm your email address', 'Enter the email code to open your personal workspace.'],
    ['03', 'Choose your starting point', 'Bring a caption, announcement, design idea, or business problem to practise with.'],
    ['04', 'Practise and share', 'Check the result, improve it, and apply your creative judgment before sharing.']
  ].map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  <section className="ccl-team-story"><EditorialImage photo="team" /><div><p className="ccl-eyebrow">For churches & creative teams</p><h2>Good work grows<br />when we learn together.</h2><p>Help your volunteers explore practical AI skills for communication, creative planning, and responsible publishing. Tell us what your team needs.</p><button className="ccl-text-link" onClick={() => setCurrentView('public_churches')}>Talk about team learning<ArrowRight size={18} /></button></div></section>
  <section className="ccl-editorial-panel"><p className="ccl-eyebrow">Free to use, no sign-in needed</p><h2>Give your next idea a clearer brief.</h2><p className="text-zinc-600 my-5">Use the prompt builder and short guides for creative tasks, church communication, and responsible AI habits.</p><button className="ccl-button ccl-button-primary" onClick={() => setCurrentView('public_resources')}>Open guides & tools<ArrowRight size={18}/></button></section>
  <ChannelCard />
 </PublicPage>;
};
