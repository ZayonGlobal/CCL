import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    setIsOnboardingOpen,
  } = useApp();

  const [email, setEmail] = useState('growwithaccolade@gmail.com');
  const [password, setPassword] = useState('password123');
  const [firstName, setFirstName] = useState('Isaac');
  const [lastName, setLastName] = useState('Adeleke');
  const [role, setRole] = useState<UserRole>('student');
  const [resetSent, setResetSent] = useState(false);
  const [viewState, setViewState] = useState<'form' | 'forgot'>('form');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    if (authModalMode === 'register') {
      setIsOnboardingOpen(true);
    }
  };

  const handleGoogleSignIn = () => {
    login('growwithaccolade@gmail.com', role);
    if (authModalMode === 'register') {
      setIsOnboardingOpen(true);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setViewState('form');
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-gray-200/90 bg-white p-7 sm:p-8 shadow-2xl relative text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1.5 rounded-full hover:bg-zinc-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Monogram */}
        <div className="flex items-center gap-3 mb-6">
          <div className="font-serif-ccl text-3xl font-bold tracking-tight text-black leading-none">
            CCL
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-zinc-800 uppercase leading-tight">
              CHRISTIAN
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-zinc-800 uppercase leading-tight">
              CREATOR LAB
            </span>
          </div>
        </div>

        {viewState === 'forgot' ? (
          /* Forgot Password View */
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950">
                Reset Password
              </h2>
              <p className="text-xs text-zinc-600">
                Enter your account email to receive reset instructions.
              </p>
            </div>

            {resetSent ? (
              <div className="rounded-2xl bg-zinc-50 border border-gray-200 p-4 text-xs text-zinc-800 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-zinc-900 shrink-0" />
                <span>Password reset link sent to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-black hover:bg-zinc-800 py-3 text-xs font-semibold text-white transition-colors shadow-2xs"
                >
                  Send Reset Link
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setViewState('form')}
                    className="text-xs text-zinc-500 hover:text-black font-medium"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Main Auth Form */
          <div className="space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1 rounded-full bg-[#f4f4f6] p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className={`rounded-full py-2 transition-all ${
                  authModalMode === 'login'
                    ? 'bg-white text-black shadow-xs font-bold'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className={`rounded-full py-2 transition-all ${
                  authModalMode === 'register'
                    ? 'bg-white text-black shadow-xs font-bold'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authModalMode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Isaac"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Adeleke"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Email Address</label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@ccl.academy"
                    className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700">Password</label>
                  {authModalMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setViewState('forgot')}
                      className="text-[11px] text-zinc-500 hover:text-black"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="h-4 w-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Demo Role Selector */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-600 font-medium">Demo Experience Role:</span>
                  <span className="font-mono text-zinc-400 uppercase">{role}</span>
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-black"
                >
                  <option value="student">Student / Creator</option>
                  <option value="mentor">Mentor</option>
                  <option value="instructor">Course Instructor</option>
                  <option value="organization_admin">Church Team Admin (CSMC Orisun Ibukun)</option>
                  <option value="administrator">Platform Administrator</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-black hover:bg-zinc-800 py-3 text-xs font-semibold text-white transition-colors shadow-2xs flex items-center justify-center gap-2 mt-2"
              >
                <span>{authModalMode === 'login' ? 'Sign In to CCL' : 'Create Free Account'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono">
                <span className="bg-white px-3 text-zinc-400">or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 py-2.5 text-xs font-semibold text-zinc-800 transition-colors shadow-2xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
