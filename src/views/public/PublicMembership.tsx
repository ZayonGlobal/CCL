import React from 'react';
import { PublicPage, PublicActions, Cards, ChannelCard } from './PublicContent';
export const PublicMembership: React.FC = () => <PublicPage photo="team" eyebrow="Join CCL for free" title={<>Start where you are.<br /><em>Create with us.</em></>} intro="CCL is currently free. Create your account, verify your email, and explore the learning workspace. There is no CCL subscription checkout or payment step.">
 <Cards items={[
  { title: 'Create your account', text: 'Enter your details and verify the code sent to your email. Your workspace opens after verification.' },
  { title: 'Choose a starting point', text: 'Explore AI Foundations, read the free guides, or bring a real task to the prompt builder. Specialist labs remain coming soon.' },
  { title: 'Connect and practise', text: 'Follow the WhatsApp channel for resources and learning updates. Use the member community to share your process and ask questions.' }
 ]} /><PublicActions secondary="public_community" label="Meet the community" /><ChannelCard />
</PublicPage>;
