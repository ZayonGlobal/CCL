import React from 'react';
import { PublicPage, PublicActions, Cards, ChannelCard } from './PublicContent';
export const PublicHome: React.FC = () => <PublicPage eyebrow="Christian Creator Lab" title="Learn AI. Create with purpose." intro="Learn how to use AI tools for creative work, church communication, and everyday business tasks. CCL helps Christians turn ideas into useful work while keeping faith, honesty, and human judgment at the centre.">
  <PublicActions />
  <section><h2 className="font-serif-ccl text-3xl font-bold mb-6">What would you like to create?</h2><Cards items={[
    { title: 'Church media that communicates clearly', text: 'Explore ways to plan service announcements, write event invitations, develop flyer ideas, and turn a message into useful social content.' },
    { title: 'Content with your own voice', text: 'Use AI to organise ideas, draft captions and scripts, and improve your writing. Edit the result so it sounds like you and serves your audience.' },
    { title: 'Practical work for your business', text: 'Build confidence with creative briefs, product descriptions, customer messages, and digital ideas you can develop into real services.' }
  ]} /></section>
  <section className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10"><p className="text-xs uppercase tracking-widest text-zinc-500">Start here</p><h2 className="font-serif-ccl text-3xl font-bold mt-3">AI Foundations Lab</h2><p className="text-sm text-zinc-600 max-w-2xl my-5 leading-relaxed">Our open starting point focuses on understanding AI, writing clear prompts, checking its answers, and using it responsibly. The other specialist labs are coming soon. Each course page shows its own lessons and access details.</p><PublicActions secondary="public_courses" label="Explore learning" /></section>
  <section><h2 className="font-serif-ccl text-3xl font-bold mb-6">Made for people doing meaningful work</h2><Cards items={[
    { title: 'New to AI?', text: 'Start with the basics. You do not need a coding background to learn how to give clear instructions and evaluate an AI response.' },
    { title: 'A designer or content creator?', text: 'Bring your creative judgment. Explore how AI can support research, concepts, writing, and production without losing your original voice.' },
    { title: 'Serving on a church team?', text: 'Apply what you learn to announcements, outreach, and media planning. Talk to us about the skills your team wants to develop.' }
  ]} /></section>
  <ChannelCard />
</PublicPage>;
