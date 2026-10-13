import React from 'react';
import { useApp, type AppView } from '../../context/AppContext';
export const CHANNEL_URL = 'https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i';
export function PublicPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <div className="bg-[#fcfcfd] text-zinc-900 pb-20"><section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-12"><p className="text-xs uppercase tracking-widest text-zinc-500 mb-5">{eyebrow}</p><h1 className="font-serif-ccl text-4xl sm:text-6xl font-bold max-w-4xl leading-tight">{title}</h1><p className="text-base sm:text-lg text-zinc-600 max-w-3xl mt-6 leading-relaxed">{intro}</p></section><div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">{children}</div></div>;
}
export function Cards({ items }: { items: { title: string; text: string }[] }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{items.map(item => <article key={item.title} className="rounded-3xl bg-white border border-gray-200 p-7"><h3 className="font-serif-ccl text-xl font-bold mb-3">{item.title}</h3><p className="text-sm text-zinc-600 leading-relaxed">{item.text}</p></article>)}</div>;
}
export function PublicActions({ secondary = 'public_labs', label = 'Explore the labs' }: { secondary?: AppView; label?: string }) {
  const { setAuthModalMode, setIsAuthModalOpen, setCurrentView } = useApp();
  return <div className="flex flex-wrap gap-3"><button className="rounded-full bg-black text-white px-6 py-3 font-semibold text-sm" onClick={() => { setAuthModalMode('register'); setIsAuthModalOpen(true); }}>Create a free account</button><button className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold" onClick={() => setCurrentView(secondary)}>{label}</button></div>;
}
export function ChannelCard() {
  return <section className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10"><p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Free resources</p><h2 className="font-serif-ccl text-3xl font-bold">Get the AI Bible. Keep learning with us.</h2><p className="text-sm text-zinc-600 max-w-2xl my-5 leading-relaxed">Our free AI Bible, along with loads of other helpful AI and creative resources, is in the Christian Creator Lab WhatsApp channel. Follow for practical tips, new resources, and learning updates.</p><a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-black text-white px-6 py-3 text-sm font-semibold">Join the WhatsApp channel</a></section>;
}
