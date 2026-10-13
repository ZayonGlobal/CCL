import React from 'react';
import { LABS } from '../../data/seedData';
import { LabAvailability, isLabOpen } from '../../components/LabAvailability';
import { PublicPage, PublicActions, SectionHeading } from './PublicContent';
const descriptions: Record<string, string> = {
  'ai-foundations': 'Understand what AI can do, write clear prompts, check answers, and build responsible habits before using it in your creative work.',
  design: 'Develop visual ideas, creative briefs, and design workflows for church communication and brands.',
  video: 'Plan scripts, storyboards, captions, and video content with AI support and your own editorial judgment.',
  content: 'Shape ideas into captions, articles, newsletters, and scripts while keeping your voice and checking the facts.',
  'web-build': 'Explore how AI can help you plan and build websites and useful digital tools.',
  automation: 'Explore ways to simplify repeated tasks and keep people in control of important decisions.',
  ministry: 'Apply responsible AI habits to church communication, study preparation, and outreach materials.',
  business: 'Develop service ideas, proposals, customer communication, and practical business resources.',
  'creator-growth': 'Build a clear creative identity and a consistent approach to sharing useful work.',
  leadership: 'Explore how to guide creative teams, share skills, and set sensible boundaries for AI use.'
};
export const PublicLabs: React.FC = () => <PublicPage eyebrow="Learning labs" title="Start with the foundations. Grow into your craft." intro="CCL’s ten learning labs organise the skills we want to help you develop. AI Foundations is open; the other nine are coming soon. Their descriptions show the planned focus, rather than courses already available.">
  <section className="ccl-lab-feature"><div><p className="ccl-eyebrow"><span className="ccl-status-dot" />Open lab / 01</p><h2>AI Foundations</h2><p>Start with the essentials: understand the tools, give useful instructions, and make thoughtful creative decisions.</p><PublicActions secondary="public_courses" label="Explore foundation learning" /></div><ol>{['Understand AI', 'Write clear prompts', 'Check the answers', 'Create responsibly'].map((text, i) => <li key={text}><span>0{i + 1}</span>{text}</li>)}</ol></section>
  <section><SectionHeading eyebrow="The next chapters" title="More ways to put your ideas to work." text="These specialist labs are in development. Follow our channel for announcements as they become ready." /><div className="ccl-lab-grid">{LABS.filter(lab => !isLabOpen(lab.id)).map((lab, i) => <article key={lab.id} className="ccl-lab-card"><div className="ccl-lab-title"><span>0{i + 2}</span><h3>{lab.name}</h3></div><div className="ccl-lab-preview"><p>{descriptions[lab.id]}</p><LabAvailability id={lab.id} name={lab.name} /></div></article>)}</div></section>
</PublicPage>;
