import React from 'react';
import { LABS } from '../../data/seedData';
import { LabAvailability, isLabOpen } from '../../components/LabAvailability';
import { PublicPage, PublicActions } from './PublicContent';
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
  <PublicActions secondary="public_courses" label="Explore AI Foundations learning" />
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{LABS.map(lab => <article key={lab.id} className="relative rounded-3xl border border-gray-200 bg-white p-7 overflow-hidden min-h-64"><p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">{isLabOpen(lab.id) ? 'Open lab' : 'Planned lab'}</p><h2 className="font-serif-ccl text-2xl font-bold mb-3">{lab.name}</h2><p className="text-sm text-zinc-600 leading-relaxed">{descriptions[lab.id]}</p><LabAvailability id={lab.id} name={lab.name} /></article>)}</div>
</PublicPage>;
