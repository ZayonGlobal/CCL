import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { LoadingSymbol } from './LoadingSymbol';
import { BrandLogo } from './BrandLogo';
import { PasswordField } from './PasswordField';
import { useApp } from '../context/AppContext';
import { backend, errorMessage } from '../services/supabase';
const pendingKey='ccl-pending-verification';
function pendingEmail(){try{return sessionStorage.getItem(pendingKey)||'';}catch{return '';}}
export const AuthModal: React.FC = () => {
  const {isAuthModalOpen,setIsAuthModalOpen,authModalMode,setAuthModalMode,login,register,resetPassword,changePassword,isPasswordRecovery,isBackendConfigured}=useApp();
  const [email,setEmail]=useState(pendingEmail);
  const [password,setPassword]=useState(''); const [confirmPassword,setConfirmPassword]=useState('');
  const [firstName,setFirstName]=useState('');const [lastName,setLastName]=useState('');
  const [forgot,setForgot]=useState(false);const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');const [success,setSuccess]=useState('');
  const [verification,setVerification]=useState(Boolean(pendingEmail()));const [code,setCode]=useState('');
  const [cooldown,setCooldown]=useState(0);const dialog=useRef<HTMLDivElement>(null);
  const beginVerification=(value:string)=>{const clean=value.trim().toLowerCase();setEmail(clean);setPassword('');setConfirmPassword('');setCode('');setVerification(true);setCooldown(60);try{sessionStorage.setItem(pendingKey,clean);}catch{}};
  const clearVerification=()=>{setVerification(false);setCode('');try{sessionStorage.removeItem(pendingKey);}catch{}};
  useEffect(()=>{if(pendingEmail())setIsAuthModalOpen(true);},[]);
  useEffect(()=>{if(isAuthModalOpen){setError('');setSuccess('');setPassword('');setConfirmPassword('');setForgot(false);const pending=pendingEmail();if(pending&&!isPasswordRecovery){setEmail(pending);setVerification(true);}}},[isAuthModalOpen,authModalMode]);
  useEffect(()=>{if(!cooldown)return;const t=setInterval(()=>setCooldown(v=>Math.max(0,v-1)),1000);return()=>clearInterval(t);},[cooldown>0]);
  useEffect(()=>{if(!isAuthModalOpen)return;const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.current?.querySelector<HTMLInputElement>('input')?.focus();
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!busy)setIsAuthModalOpen(false);if(e.key==='Tab'){const items=dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),a[href]');if(!items?.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
    document.addEventListener('keydown',key);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',key);previous?.focus();};
  },[isAuthModalOpen,busy,verification,setIsAuthModalOpen]);
  const registering=authModalMode==='register'&&!isPasswordRecovery&&!forgot;
  const submit=async(e:React.FormEvent)=>{e.preventDefault();if(busy)return;setBusy(true);setError('');setSuccess('');try{
    if(verification&&!isPasswordRecovery){
      if(!/^\d{6,10}$/.test(code))throw new Error('Enter the verification code from your email.');
      const {data,error}=await backend().auth.verifyOtp({email:email.trim(),token:code,type:'signup'});
      if(error)throw new Error('That code is invalid or has expired. Check the latest email or request a new code.');
      if(!data.session)throw new Error('Verification could not be completed. Please try again.');
      clearVerification();setIsAuthModalOpen(false);
    }else if(isPasswordRecovery){if(password!==confirmPassword)throw new Error('Your passwords do not match.');await changePassword(password);}
    else if(forgot){await resetPassword(email);setSuccess('A password recovery link has been sent to your email. Check your Inbox and Spam folder.');}
    else if(registering){if(password!==confirmPassword)throw new Error('Your passwords do not match.');await register(email,password,firstName,lastName);beginVerification(email);}
    else {await login(email,password);clearVerification();}
  }catch(e){if((e as {code?:string}).code==='email_not_confirmed'){beginVerification(email);setError('Verify your email before signing in. Request a fresh code below.');}else setError(errorMessage(e));}finally{setBusy(false);}};
  const resend=async()=>{if(busy||cooldown)return;setBusy(true);setError('');setSuccess('');try{const {error}=await backend().auth.resend({type:'signup',email:email.trim()});if(error)throw error;setCooldown(60);setSuccess('A new verification code has been sent.');}catch(e){setError(errorMessage(e));}finally{setBusy(false);}};
  if(!isAuthModalOpen)return null;
  const verifying=verification&&!isPasswordRecovery;
  const title=verifying?'Verify your email':isPasswordRecovery?'Choose a new password':forgot?'Reset your password':registering?'Create your CCL account':'Welcome back';
  const input='w-full mt-1 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm disabled:opacity-50';
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={()=>!busy&&setIsAuthModalOpen(false)}>
    <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="auth-title" className="w-full max-w-md max-h-[90dvh] overflow-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl relative text-zinc-900" onClick={e=>e.stopPropagation()}>
      <button type="button" aria-label="Close sign in" disabled={busy} onClick={()=>setIsAuthModalOpen(false)} className="absolute top-4 right-4 rounded-full p-2 text-zinc-500 hover:bg-zinc-100"><X className="h-5 w-5"/></button>
      <BrandLogo className="w-36 mb-7"/>
      {verifying&&<div className="h-12 w-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4"><Mail className="h-5 w-5"/></div>}
      <h2 id="auth-title" className="font-serif-ccl text-3xl font-bold tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 mb-6 leading-relaxed">{verifying?<>Your account has been created. Enter the code sent to <strong className="break-all text-zinc-700">{email}</strong> to activate it.</>:'Create with excellence. Build with purpose.'}</p>
      {!isBackendConfigured&&<p role="status" className="rounded-xl bg-zinc-50 p-3 text-sm mb-4">Registration will open soon. Please check back later.</p>}
      {error&&<p role="alert" className="rounded-xl bg-rose-50 text-rose-800 p-3 text-sm mb-4">{error}</p>}
      {success&&<p role="status" className="rounded-xl bg-emerald-50 text-emerald-900 p-3 text-sm mb-4 flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0"/>{success}</p>}
      <form onSubmit={submit} className="space-y-4"><fieldset disabled={busy||!isBackendConfigured} className="space-y-4">
        {verifying?<div><label htmlFor="auth-code" className="text-xs font-semibold">Email verification code</label><input id="auth-code" required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,10}" maxLength={10} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} className={input+' text-center font-mono text-2xl tracking-[0.25em]'} aria-describedby="code-help"/><p id="code-help" className="mt-2 text-xs text-zinc-500">Use the latest code. Check Spam or Junk if the email is missing.</p></div>:<>
          {registering&&<div className="grid grid-cols-2 gap-3"><div><label htmlFor="auth-first" className="text-xs font-semibold">First name</label><input id="auth-first" required maxLength={100} autoComplete="given-name" value={firstName} onChange={e=>setFirstName(e.target.value)} className={input}/></div><div><label htmlFor="auth-last" className="text-xs font-semibold">Last name</label><input id="auth-last" required maxLength={100} autoComplete="family-name" value={lastName} onChange={e=>setLastName(e.target.value)} className={input}/></div></div>}
          {!isPasswordRecovery&&<div><label htmlFor="auth-email" className="text-xs font-semibold">Email address</label><input id="auth-email" type="email" required maxLength={254} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className={input}/></div>}
          {!forgot&&<PasswordField id="auth-password" label={isPasswordRecovery?'New password':'Password'} value={password} onChange={setPassword} minLength={registering||isPasswordRecovery?8:undefined} autoComplete={registering||isPasswordRecovery?'new-password':'current-password'} disabled={busy}/>}
          {(registering||isPasswordRecovery)&&<><PasswordField id="auth-confirm" label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} minLength={8} autoComplete="new-password" disabled={busy}/><p className="text-xs text-zinc-500">Use at least 8 characters. Both passwords must match.</p></>}
        </>}
        <button type="submit" className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50">{busy&&<LoadingSymbol inline inverse label="Please wait…"/>}{busy?'Please wait…':verifying?'Verify email and continue':isPasswordRecovery?'Save new password':forgot?'Send recovery link':registering?'Create free account':'Sign in'}{!busy&&<ArrowRight className="h-4 w-4"/>}</button>
      </fieldset></form>
      {verifying?<div className="mt-5 text-center text-sm space-y-3"><button disabled={busy||cooldown>0} onClick={resend} className="underline underline-offset-4 disabled:opacity-50">{cooldown?`Resend code in ${cooldown}s`:'Resend verification code'}</button><div><button disabled={busy} onClick={()=>{clearVerification();setError('');setSuccess('');setAuthModalMode('register');}} className="text-xs text-zinc-500">Use a different email address</button></div></div>:!isPasswordRecovery&&<div className="mt-5 text-center space-y-4 text-xs">
        {forgot?<button disabled={busy} onClick={()=>{setForgot(false);setError('');setSuccess('');}}>Back to sign in</button>:<>
          {!registering&&<button disabled={busy} onClick={()=>{setForgot(true);setError('');setSuccess('');}}>Forgot your password?</button>}
          <div className="border-t border-gray-200 pt-4"><p className="text-sm text-zinc-500 mb-3">{registering?'Already have an account?':'New to CCL?'}</p><button disabled={busy} className="w-full rounded-full border border-zinc-900 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100" onClick={()=>setAuthModalMode(registering?'login':'register')}>{registering?'Sign in':'Create an account'}</button></div>
        </>}
      </div>}
      {!verifying&&!forgot&&!isPasswordRecovery&&import.meta.env.VITE_GOOGLE_AUTH_ENABLED==='true'&&<button disabled={busy||!isBackendConfigured} className="w-full rounded-full border mt-5 py-3 text-sm" onClick={async()=>{setBusy(true);setError('');try{const {error}=await backend().auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin}});if(error)throw error;}catch(e){setError(errorMessage(e));setBusy(false);}}}>Continue with Google</button>}
    </div>
  </div>;
};
