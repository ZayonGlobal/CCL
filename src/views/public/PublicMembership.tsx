import React from 'react';
import { PublicPage, PublicActions, Cards, ChannelCard } from './PublicContent';
export const PublicMembership: React.FC = () => <PublicPage eyebrow="Membership" title="Start with a free CCL account." intro="Create your account, verify your email, and begin exploring CCL. AI Foundations is the open lab. Specialist labs are marked coming soon, and individual course pages explain their access requirements.">
  <PublicActions secondary="public_courses" label="Explore learning" />
  <Cards items={[
    { title: 'Your learning workspace', text: 'Your account gives you a personal dashboard where you can find courses, follow your enrolled learning, and complete your creator profile.' },
    { title: 'Free channel resources', text: 'The AI Bible and other helpful resources are available in our WhatsApp channel. You can follow the channel without purchasing a membership.' },
    { title: 'Future programmes', text: 'Additional lab access, paid programme details, and team arrangements will be announced when ready. We are not accepting subscription payments on this page.' }
  ]} />
  <section className="rounded-3xl bg-white border border-gray-200 p-8"><h2 className="font-serif-ccl text-3xl font-bold mb-4">Learning as a church or team?</h2><p className="text-sm text-zinc-600 mb-6">Tell us who you want to equip and what you want them to learn. We can discuss your needs before agreeing on a programme or cost.</p><PublicActions secondary="public_churches" label="Church and team enquiries" /></section>
  <ChannelCard />
</PublicPage>;
