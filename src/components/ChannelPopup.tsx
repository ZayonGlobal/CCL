import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useApp } from '../context/AppContext';
export const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i';
const storageKey = 'ccl-channel-popup-dismissed';
export const ChannelPopup: React.FC = () => {
  const { currentView, isAuthModalOpen, isOnboardingOpen, isSearchOpen, isAssistantOpen } = useApp();
  const [open,setOpen]=useState(false); const [dismissed,setDismissed]=useState(false);
  const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [saved,setSaved]=useState(false);
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState('');
  const [website,setWebsite]=useState('');
  const box=useRef<HTMLDivElement>(null);
  const blocked=isAuthModalOpen || isOnboardingOpen || isSearchOpen || isAssistantOpen;
  useEffect(()=>{try { setDismissed(sessionStorage.getItem(storageKey)==='1'); } catch {}},[]);
  useEffect(()=>{
    if(dismissed || blocked || open) return;
    let engaged=false;
    const timer=window.setTimeout(()=>{engaged=true;},12000);
    const show=()=>{ if(engaged && !document.querySelector('input:focus,textarea:focus,select:focus')) setOpen(true); };
    const exit=(e:MouseEvent)=>{if(!e.relatedTarget && e.clientY<=0) show();};
    const scroll=()=>{const distance=document.documentElement.scrollHeight-window.innerHeight; if(distance>200 && window.scrollY/distance>=0.55) show();};
    document.addEventListener('mouseout',exit); window.addEventListener('scroll',scroll,{passive:true});
    return ()=>{clearTimeout(timer);document.removeEventListener('mouseout',exit);window.removeEventListener('scroll',scroll);};
  },[currentView,dismissed,blocked,open]);
  const close=()=>{if(busy)return;setOpen(false);setDismissed(true);try{sessionStorage.setItem(storageKey,'1');}catch{}};
  useEffect(()=>{
    if(!open || blocked)return;
    const prev=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
    box.current?.querySelector<HTMLInputElement>('input')?.focus();
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();if(e.key==='Tab'){const items=box.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled):not([tabindex="-1"]),a[href]');if(!items?.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}}};
    document.addEventListener('keydown',key);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',key);prev?.focus();};
  },[open,blocked,busy]);
  if(!open || blocked)return null;
  const submit=async(e:React.FormEvent)=>{e.preventDefault();if(busy)return;setBusy(true);setError('');try{
    const response=await fetch('/api/channel-signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone,website,welcomeRequested:true})});
    const result=await response.json();if(!response.ok || !result.saved)throw new Error(result.error || 'Could not save. Please try again.');
    setSaved(true);setDismissed(true);try{sessionStorage.setItem(storageKey,'1');}catch{}
    if (result.emailSent === true) window.location.assign(WHATSAPP_CHANNEL);
    else setError(result.emailError || 'Your details are saved, but the welcome email could not be sent.');
  }catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}};
  const input='w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black';
  return <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={close}>
    <div ref={box} role="dialog" aria-modal="true" aria-labelledby="channel-title" className="relative w-full max-w-sm max-h-[90dvh] overflow-y-auto rounded-2xl border border-zinc-200 p-5 sm:p-6 font-sans shadow-2xl" style={{background:'#fff',color:'#111'}} onClick={e=>e.stopPropagation()}>
      <button aria-label="Close WhatsApp invitation" disabled={busy} onClick={close} className="absolute right-4 top-4 rounded-full border border-zinc-200 p-2"><X className="h-5 w-5"/></button>
      <BrandLogo className="w-32 pr-2" />
      <span className="mt-4 inline-block text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-zinc-500">We have a gift for you</span>
      <h2 id="channel-title" className="mt-2 font-serif-ccl text-2xl font-bold tracking-tight leading-tight">Get the free <span className="italic font-normal">AI Bible.</span></h2>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">Join our WhatsApp channel for AI tips and creative resources.</p>
      {saved ? <p role="status" className="mt-6">{error || "Your details are saved. Opening WhatsApp…"} <a href={WHATSAPP_CHANNEL} className="underline">Tap here if it doesn’t open.</a></p> : <form onSubmit={submit} className="mt-4 space-y-3">
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <label className="block text-xs font-medium">Name<input required maxLength={150} autoComplete="name" placeholder="Your full name" className={input+' mt-1'} style={{background:'#fff',color:'#111'}} value={name} onChange={e=>setName(e.target.value)}/></label>
        <label className="block text-xs font-medium">Email<input required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" className={input+' mt-1'} style={{background:'#fff',color:'#111'}} value={email} onChange={e=>setEmail(e.target.value)}/></label>
        <label className="block text-xs font-medium">WhatsApp number<input type="tel" maxLength={30} autoComplete="tel" placeholder="+234…" className={input+' mt-1'} style={{background:'#fff',color:'#111'}} value={phone} onChange={e=>setPhone(e.target.value)}/></label>
        <div className="hidden" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} aria-label="Website"/></div>
        <button disabled={busy} className="w-full rounded-full py-3 text-xs font-semibold disabled:opacity-50" style={{background:'#111',color:'#fff'}}>{busy?'Saving…':<span className="inline-flex items-center gap-2">Get free access<ArrowUpRight className="h-4 w-4"/></span>}</button>
        <p className="text-[10px] leading-relaxed text-center text-zinc-500">Submit to save your details and receive a welcome email with the channel link. You’ll continue to WhatsApp.</p>
      </form>}
    </div>
  </div>;
};
