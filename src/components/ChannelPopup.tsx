import React, { useEffect, useRef, useState } from 'react';
import { Gift, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i';
const storageKey = 'ccl-channel-popup-dismissed';
export const ChannelPopup: React.FC = () => {
  const { currentView, isAuthModalOpen, isOnboardingOpen, isSearchOpen, isAssistantOpen } = useApp();
  const [open,setOpen]=useState(false); const [dismissed,setDismissed]=useState(false);
  const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [saved,setSaved]=useState(false);
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState('');
  const [website,setWebsite]=useState(''); const [consent,setConsent]=useState(false);
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
    const response=await fetch('/api/channel-signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone,website,consent})});
    const result=await response.json();if(!response.ok || !result.saved)throw new Error(result.error || 'Could not save. Please try again.');
    setSaved(true);setDismissed(true);try{sessionStorage.setItem(storageKey,'1');}catch{}
    window.location.assign(WHATSAPP_CHANNEL);
  }catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}};
  const input='w-full rounded-xl border border-white/20 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400';
  return <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={close}>
    <div ref={box} role="dialog" aria-modal="true" aria-labelledby="channel-title" className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 p-6 sm:p-9 shadow-2xl" style={{background:'#10161c',color:'#fff'}} onClick={e=>e.stopPropagation()}>
      <button aria-label="Close WhatsApp invitation" disabled={busy} onClick={close} className="absolute right-4 top-4 rounded-full border border-white/15 p-2"><X className="h-5 w-5"/></button>
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-400"><Gift className="h-3.5 w-3.5"/>FREE ACCESS</span>
      <h2 id="channel-title" className="mt-5 text-2xl font-extrabold leading-tight">WAIT! DON’T LEAVE EMPTY-HANDED!</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">Join the Christian Creator Lab WhatsApp channel for practical AI tips, creative resources, and learning updates. It’s free.</p>
      {saved ? <p role="status" className="mt-6">Your details are saved. Opening WhatsApp… <a href={WHATSAPP_CHANNEL} className="underline">Tap here if it doesn’t open.</a></p> : <form onSubmit={submit} className="mt-6 space-y-4">
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <label className="block text-sm font-semibold">Name<input required maxLength={150} autoComplete="name" placeholder="Your full name" className={input+' mt-2'} style={{background:'#10161c',color:'#fff'}} value={name} onChange={e=>setName(e.target.value)}/></label>
        <label className="block text-sm font-semibold">Email<input required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" className={input+' mt-2'} style={{background:'#10161c',color:'#fff'}} value={email} onChange={e=>setEmail(e.target.value)}/></label>
        <label className="block text-sm font-semibold">WhatsApp number <span className="font-normal text-zinc-400">(optional)</span><input type="tel" maxLength={30} autoComplete="tel" placeholder="+234…" className={input+' mt-2'} style={{background:'#10161c',color:'#fff'}} value={phone} onChange={e=>setPhone(e.target.value)}/></label>
        <div className="hidden" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} aria-label="Website"/></div>
        <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1"/>I agree to receive a CCL welcome email with the channel link. My details will be saved by CCL.</label>
        <button disabled={busy} className="w-full rounded-full py-3.5 text-sm font-bold disabled:opacity-50" style={{background:'#00ce7c',color:'#07130d'}}>{busy?'Saving…':'Get free access'}</button>
        <p className="text-xs text-center text-zinc-400">No payment. You’ll go straight to the channel after this.</p>
      </form>}
    </div>
  </div>;
};
