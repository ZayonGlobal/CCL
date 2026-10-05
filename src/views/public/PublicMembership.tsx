import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_PLANS } from '../../config/membershipPlans';
import { Check, ShieldCheck, ArrowRight, Users, HelpCircle, BookOpen, Layers, Award } from 'lucide-react';
import { MembershipTier } from '../../types';

export const PublicMembership: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalMode, upgradeMembership, currentUser, setCurrentView, isAuthenticated } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (tier: MembershipTier) => {
    if (isAuthenticated) { void upgradeMembership(tier); return; }
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              MEMBERSHIP & ENROLLMENT
            </div>

            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              Invest in Your <br />
              <span className="italic font-normal">Calling.</span> <br />
              Plans for Every Stage.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Start free as an Explorer, accelerate your skills in our monthly Creator Cohort, or
              provision centralized seats for your church media team. Cancel anytime with zero lock-in.
            </p>

            {/* Billing Switcher Toggle */}
            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    billingCycle === 'annual'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="rounded bg-zinc-100 text-zinc-800 text-[10px] font-mono px-1.5 py-0.5">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                alt="Creative team planning"
                className="h-full w-full object-cover grayscale contrast-115 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “The laborer is worthy of his wages, and stewardship starts with investing in the craft.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">— STEWARDSHIP ETHIC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS RIBBON */}
      <section className="border-y border-gray-200/90 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10,000+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  MEMBERS WORLDWIDE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <BookOpen className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10 LABS</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  FULL ACCESS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <ShieldCheck className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">100% FLEXIBLE</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  CANCEL ANYTIME
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <Award className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">VERIFIED</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  CREDENTIALS INCLUDED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP PLANS GRID */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="text-center max-w-2xl mx-auto pb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
            MEMBERSHIP TIERS
          </div>
          <h2 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-zinc-950">
            Select Your Progression Plan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
            All plans include community access, prompt templates, and core ethical guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price =
              billingCycle === 'annual'
                ? Math.round(plan.annualPriceUSD / 12)
                : plan.monthlyPriceUSD;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  plan.highlighted
                    ? 'border-2 border-black bg-white shadow-xl relative'
                    : 'border border-gray-200/90 bg-white hover:border-zinc-400 shadow-[0_2px_14px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div>
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black text-white px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold">
                      Most Popular
                    </span>
                  )}

                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                    {plan.badge}
                  </span>
                  <h3 className="font-serif-ccl text-xl font-bold text-zinc-950 mt-1">{plan.name}</h3>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-serif-ccl text-4xl font-bold text-zinc-950">
                      {plan.currencySymbol}
                      {price}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">/mo</span>
                  </div>

                  {billingCycle === 'annual' && plan.annualPriceUSD > 0 && (
                    <p className="text-[11px] text-zinc-500 font-mono mt-1">
                      Billed annually ({plan.currencySymbol}{plan.annualPriceUSD}/yr)
                    </p>
                  )}

                  <p className="text-xs text-zinc-600 mt-3 leading-relaxed">{plan.shortDescription}</p>

                  <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5 text-xs text-zinc-700">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-zinc-950 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight text-zinc-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      plan.highlighted
                        ? 'bg-black text-white hover:bg-zinc-800 shadow-sm'
                        : 'border border-gray-300 bg-white text-zinc-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>{plan.id === 'free' ? 'Start Free' : 'Choose Plan'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CHURCHES & TEAMS CALLOUT */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                CHURCHES & MINISTRIES
              </div>
              <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                Need Centralized Seats for Your Media Department?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Empower your local church volunteer team with customized learning tracks, Sunday recap
                templates, and centralized progress oversight. As seen in <strong className="text-zinc-900">CSMC Orisun Ibukun</strong>'s implementation.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('public_churches')}
                  className="rounded-full bg-black px-6 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>Explore Church Team Seats</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-6 space-y-3 font-mono text-xs text-zinc-600">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold border-b border-gray-200 pb-2">
                Team Tier Includes
              </div>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-zinc-900" />
                  <span>Up to 10 or 25 Volunteer Team Seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-zinc-900" />
                  <span>Sunday Service SOP & Prompt Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-zinc-900" />
                  <span>Team Leader Progress Dashboard & Reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-zinc-900" />
                  <span>Monthly Private Church Cohort Masterclasses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 text-center pt-10">
        <div className="rounded-3xl bg-zinc-950 text-white p-10 sm:p-16 space-y-6 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            JOIN CHRISTIAN CREATOR LAB
          </div>

          <h2 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to Create with Purpose?
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Join thousands of Christian creators, graphic designers, video editors, and church media
            servants using technology with excellence for Kingdom impact.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
              className="rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-black hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Get Started for Free →
            </button>
            <button
              onClick={() => setCurrentView('public_courses')}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Browse Course Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
