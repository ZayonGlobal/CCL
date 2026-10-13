import React from 'react';
import { PublicPage, PublicActions, Cards } from './PublicContent';
export const PublicAbout: React.FC = () => <PublicPage eyebrow="About CCL" title="Faith shapes the purpose. Skills help us do the work." intro="Christian Creator Lab is a learning platform for Christians who want to use AI tools for creative work. We bring the conversation close to real tasks: communicating a church event, shaping a design concept, planning content, and solving everyday business problems.">
  <PublicActions />
  <section className="rounded-3xl bg-white border border-gray-200 p-8"><h2 className="font-serif-ccl text-3xl font-bold mb-4">Why we are building CCL</h2><p className="text-zinc-600 leading-relaxed max-w-3xl">Many people have access to AI tools but are unsure what to ask, how to judge the output, or where it fits in their work. We want to help Christian creators move from experimenting to working with clear intent, useful skills, and responsible habits. Our starting point is AI Foundations; specialist labs will follow as they become ready.</p></section>
  <section><h2 className="font-serif-ccl text-3xl font-bold mb-6">Our approach</h2><Cards items={[
    { title: 'Learn through a real task', text: 'Begin with something you need to make. Give the tool context, review the result, improve it, and apply your own creative judgment.' },
    { title: 'Keep people responsible', text: 'AI can support preparation and production. Prayer, spiritual discernment, pastoral care, and responsibility for what we publish remain human.' },
    { title: 'Check before sharing', text: 'Verify Scripture against the Bible translation you use. Check factual claims, permissions, and sensitive information before sharing AI-assisted work.' },
    { title: 'Create honestly', text: 'Respect other people’s work. Avoid misleading images, invented endorsements, and presenting AI-generated material as someone’s real words or actions.' },
    { title: 'Build useful skills', text: 'Learn to explain your goal, write better prompts, edit carefully, and judge whether the result serves its audience.' },
    { title: 'Grow with the community', text: 'Follow our WhatsApp channel for the AI Bible, creative resources, and updates as CCL develops.' }
  ]} /></section>
</PublicPage>;
