import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicPage, Cards, SectionHeading, ChannelCard, EditorialImage, PublicActions } from './PublicContent';
export const PublicCommunity: React.FC = () => {
 const { setCurrentView } = useApp();
 return <PublicPage photo="team" eyebrow="The CCL community" title={<>Your creative journey.<br /><em>Shared with others.</em></>} intro="A place for Christians learning to use AI in real work. Bring your questions, share what you are trying, and grow alongside people creating for ministry, business, and everyday life.">
  <section><SectionHeading eyebrow="Learn with others" title="You do not have to figure it all out alone." /><Cards items={[
   { title: 'Ask a clear question', text: 'Explain what you are making, what you tried, and where you got stuck. Keep private information out of screenshots and prompts.' },
   { title: 'Share your process', text: 'Show the idea, the prompt, and what you changed. Useful feedback begins with understanding how the work was made.' },
   { title: 'Encourage better work', text: 'Offer specific, respectful feedback. Help one another improve the message, accuracy, and creative choices.' }
  ]} /></section>
  <section className="ccl-team-story"><EditorialImage photo="team" /><div><p className="ccl-eyebrow">Two ways to connect</p><h2>Follow the channel.<br />Join the conversation.</h2><p>Our WhatsApp channel shares the free AI Bible, creative resources, and learning announcements. With a free CCL account, you can also join discussions in the member community.</p><button className="ccl-button ccl-button-primary" onClick={() => setCurrentView('community')}>Open the member community</button></div></section>
  <section><SectionHeading eyebrow="How we learn together" title="Helpful. Honest. Rooted in faith." /><Cards items={[
   { title: 'People before performance', text: 'Welcome beginners, explain in plain language, and treat questions with patience.' },
   { title: 'Responsibility before publishing', text: 'Check Scripture, facts, and permissions. Avoid misleading images, invented quotes, and claims you cannot support.' },
   { title: 'Practice before promises', text: 'Build useful skills through real tasks. CCL does not promise jobs, income, or a guaranteed response time.' }
  ]} /></section><PublicActions secondary="public_resources" label="Read the free guides" /><ChannelCard />
 </PublicPage>;
};
