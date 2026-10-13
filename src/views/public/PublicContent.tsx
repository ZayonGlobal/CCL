import React from 'react';
import { ArrowUpRight, ArrowRight, BookOpen, Check, Briefcase, PenTool, Users } from 'lucide-react';
import { useApp, type AppView } from '../../context/AppContext';
export const CHANNEL_URL = 'https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i';
export const PHOTOS = {
  creator: { src: '/images/ccl-creator.webp', alt: 'Illustration of a Nigerian designer developing creative work at her laptop' },
  team: { src: '/images/ccl-team.webp', alt: 'Illustration of a Nigerian creative team discussing ideas together' },
  study: { src: '/images/ccl-study.webp', alt: 'Illustration of an open Bible, sketchbook, and laptop on a desk' },
};
type Photo = keyof typeof PHOTOS;
export function EditorialImage({ photo, className = '', eager = false }: { photo: Photo; className?: string; eager?: boolean }) {
  return <img {...PHOTOS[photo]} className={`ccl-photo ${className}`} width="1536" height="1024" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />;
}
export function PublicPage({ eyebrow, title, intro, children, photo, home = false }: { eyebrow: string; title: React.ReactNode; intro: string; children: React.ReactNode; photo?: Photo; home?: boolean }) {
  const image = photo ?? (/Church|About/.test(eyebrow) ? 'team' : /Membership|Questions/.test(eyebrow) ? 'study' : 'creator');
  return <div className={`ccl-public ${home ? 'ccl-public-home' : ''}`}><section className="ccl-container ccl-hero">
    <div className="ccl-hero-copy"><p className="ccl-eyebrow"><span className="ccl-status-dot" />{eyebrow}</p><h1>{title}</h1><p className="ccl-intro">{intro}</p><PublicActions primaryLabel={home ? 'Join CCL' : undefined} /><div className="ccl-hero-notes"><span><Check size={14} />Beginner friendly</span><span><Check size={14} />Faith-led creativity</span></div></div>
    <div className="ccl-hero-visual"><EditorialImage photo={image} eager /><div className="ccl-image-label"><span>{image === 'team' ? 'Learn together. Create with purpose.' : image === 'study' ? 'Let faith guide what you create.' : 'Use your gifts to make a difference in this generation.'}</span><ArrowUpRight size={20} /></div></div>
  </section><div className="ccl-container ccl-page-body">{children}</div></div>;
}
const icons = [PenTool, BookOpen, Briefcase, Users, Check, ArrowUpRight];
export function Cards({ items }: { items: { title: string; text: string }[] }) {
  return <div className="ccl-card-grid">{items.map((item, i) => { const Icon = icons[i % icons.length]; return <article key={item.title} className="ccl-feature-card"><div className="ccl-card-top"><span className="ccl-icon-box"><Icon size={22} strokeWidth={1.5} /></span><span className="ccl-card-number">0{i + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>;
}
export function PublicActions({ secondary = 'public_labs', label = 'Explore the labs', primaryLabel }: { secondary?: AppView; label?: string; primaryLabel?: string }) {
  const { setAuthModalMode, setIsAuthModalOpen, setCurrentView, isAuthenticated } = useApp();
  return <div className="ccl-actions"><button className="ccl-button ccl-button-primary" onClick={() => { if (isAuthenticated) setCurrentView('dashboard'); else { setAuthModalMode('register'); setIsAuthModalOpen(true); } }}>{isAuthenticated ? 'Open your workspace' : (primaryLabel || 'Create a free account')}<ArrowUpRight size={17} /></button><button className="ccl-button ccl-button-secondary" onClick={() => setCurrentView(secondary)}>{label}<ArrowRight size={17} /></button></div>;
}
export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="ccl-section-heading"><div><p className="ccl-eyebrow">{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}
export function ChannelCard() {
  return <section className="ccl-channel"><div className="ccl-channel-art"><EditorialImage photo="study" /><span className="ccl-art-label">A little inspiration.<br />A useful next step.</span></div><div className="ccl-channel-copy"><p className="ccl-eyebrow">The resource corner</p><h2>Your next idea<br />starts here.</h2><p>Get our free AI Bible, along with loads of other helpful AI and creative resources, in the Christian Creator Lab WhatsApp channel.</p><a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="ccl-button ccl-button-primary">Join the WhatsApp channel<ArrowUpRight size={18} /></a><span className="ccl-small-note">Free resources · Practical tips · Learning updates</span></div></section>;
}
