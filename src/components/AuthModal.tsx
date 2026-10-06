import { BrandLogo } from './BrandLogo';
import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { backend, errorMessage } from '../services/supabase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode,
    login, register, resetPassword, changePassword, isPasswordRecovery, isBackendConfigured } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [forgot, setForgot] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => { setError(''); setSuccess(''); setPassword(''); setConfirmPassword(''); setForgot(false); }, [authModalMode, isAuthModalOpen]);
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.querySelector<HTMLInputElement>('input')?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) setIsAuthModalOpen(false);
      if (e.key === 'Tab') {
        const items = element?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]');
        if (!items?.length) return;
        const first = items[0], last = items[items.length-1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [isAuthModalOpen, busy, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;
  const registering = authModalMode === 'register' && !isPasswordRecovery && !forgot;
  const label = isPasswordRecovery ? 'Set a new password' : forgot ? 'Reset your password' : registering ? 'Create your CCL account' : 'Welcome back';
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(''); setSuccess('');
    try {
      if (isPasswordRecovery) {
        if (password !== confirmPassword) throw new Error('Your passwords do not match.');
        await changePassword(password);
      } else if (forgot) {
        await resetPassword(email);
        setSuccess('If an account exists for that email, you will receive a password reset link.');
      } else if (registering) {
        if (password !== confirmPassword) throw new Error('Your passwords do not match.');
        const signedIn = await register(email, password, firstName, lastName);
        if (!signedIn) setSuccess('Check your email to confirm your account, then sign in to continue.');
      } else { await login(email, password); }
    } catch (error) { setError(errorMessage(error)); }
    finally { setBusy(false); }
  };
  const inputStyle = 'w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-black disabled:opacity-50';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={() => !busy && setIsAuthModalOpen(false)}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="auth-title" className="w-full max-w-md max-h-[90vh] overflow-auto rounded-3xl bg-white p-7 sm:p-8 shadow-2xl relative text-zinc-900" onClick={e => e.stopPropagation()}>
        <button aria-label="Close sign in" disabled={busy} onClick={() => setIsAuthModalOpen(false)} className="absolute top-5 right-5 p-1.5 text-zinc-500"><X className="h-5 w-5" /></button>
        <BrandLogo className="w-48 mb-6" />
        <h2 id="auth-title" className="font-serif-ccl text-2xl font-bold mb-2">{label}</h2>
        <p className="text-sm text-zinc-500 mb-5">Create with excellence. Build with purpose.</p>
        {!isBackendConfigured && <p role="status" className="text-sm rounded-xl bg-zinc-50 p-3 mb-4">Registration will open soon. Please check back later.</p>}
        {error && <p role="alert" className="rounded-xl bg-rose-50 text-rose-800 p-3 text-sm mb-4">{error}</p>}
        {success && <p role="status" className="rounded-xl bg-emerald-50 text-emerald-900 p-3 text-sm mb-4 flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0" />{success}</p>}
        <form onSubmit={submit} className="space-y-4">
          <fieldset disabled={busy || !isBackendConfigured} className="space-y-4">
            {registering && <div className="grid grid-cols-2 gap-3">
              <div><label htmlFor="auth-first" className="text-xs font-semibold">First name</label><input id="auth-first" required autoComplete="given-name" maxLength={100} value={firstName} onChange={e => setFirstName(e.target.value)} className={inputStyle} /></div>
              <div><label htmlFor="auth-last" className="text-xs font-semibold">Last name</label><input id="auth-last" required autoComplete="family-name" maxLength={100} value={lastName} onChange={e => setLastName(e.target.value)} className={inputStyle} /></div>
            </div>}
            {!isPasswordRecovery && <div><label htmlFor="auth-email" className="text-xs font-semibold">Email address</label><input id="auth-email" type="email" required maxLength={254} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className={inputStyle} /></div>}
            {!forgot && <div><label htmlFor="auth-password" className="text-xs font-semibold">{isPasswordRecovery ? 'New password' : 'Password'}</label><input id="auth-password" type="password" required minLength={registering || isPasswordRecovery ? 8 : undefined} autoComplete={registering || isPasswordRecovery ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} className={inputStyle} /></div>}
            {(registering || isPasswordRecovery) && <div><label htmlFor="auth-confirm" className="text-xs font-semibold">Confirm password</label><input id="auth-confirm" type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputStyle} /></div>}
            <button type="submit" className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50">{busy ? 'Please wait…' : isPasswordRecovery ? 'Save new password' : forgot ? 'Send reset link' : registering ? 'Create free account' : 'Sign in'}<ArrowRight className="h-4 w-4" /></button>
          </fieldset>
        </form>
        {!isPasswordRecovery && <div className="mt-5 text-center space-y-3 text-xs">
          {forgot ? <button onClick={() => { setForgot(false); setError(''); setSuccess(''); }}>Back to sign in</button> : <>
            {!registering && <button onClick={() => { setForgot(true); setError(''); setSuccess(''); }}>Forgot your password?</button>}
            <div><button onClick={() => setAuthModalMode(registering ? 'login' : 'register')}>{registering ? 'Already have an account? Sign in' : 'New to CCL? Create an account'}</button></div>
          </>}
        </div>}
        {import.meta.env.VITE_GOOGLE_AUTH_ENABLED === 'true' && !forgot && !isPasswordRecovery && <button disabled={busy || !isBackendConfigured} className="w-full rounded-full border mt-5 py-3 text-sm" onClick={async () => {
          setError(''); setBusy(true);
          try { const { error } = await backend().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } }); if (error) throw error; }
          catch (error) { setError(errorMessage(error)); setBusy(false); }
        }}>Continue with Google</button>}
      </div>
    </div>
  );
};
