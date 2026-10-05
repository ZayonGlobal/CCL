import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LABS } from '../../data/seedData';
import { MEMBERSHIP_PLANS } from '../../config/membershipPlans';
import {
  ArrowRight,
  Play,
  Users,
  BookOpen,
  Radio,
  BarChart2,
  Video,
  X,
  Check,
  Building2,
  Trophy,
  Calendar,
} from 'lucide-react';

export const PublicHome: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setAuthModalMode, navigateWithParam } = useApp();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Avatar photos for social proof stack
  const socialAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  ];

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION - Matching Screenshot Exactly */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Typography, Description, CTAs, Social Proof */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker */}
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              FAITH × CREATIVITY × IMPACT
            </div>

            {/* Headline with italic serif 'Purpose.' */}
            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              Create with <br />
              <span className="italic font-normal">Purpose.</span> <br />
              Build for Eternity.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Christian Creator Lab equips you with the skills, tools, and community to create
              meaningful content, grow your influence, and make a lasting impact for God's Kingdom.
            </p>

            {/* CTAs matching screenshot */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Join CCL</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors flex items-center gap-2.5 shadow-2xs"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-700">
                  <Play className="h-2.5 w-2.5 fill-zinc-800 text-zinc-800 translate-x-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Social Proof Avatars */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {socialAvatars.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Creator"
                    className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-2xs"
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-600 font-medium">
                <strong className="text-zinc-900 font-bold">10,000+</strong> creators learning, growing
                and building together.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Atmospheric Monochrome Portrait with Quote */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                alt="Christian Creator looking towards horizon"
                className="h-full w-full object-cover grayscale contrast-115 brightness-95"
              />

              {/* Gradient shadow for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Quote on bottom of image - Matching Screenshot */}
              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “Use your gifts to make <br />
                  a difference in this generation.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">—</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL METRICS RIBBON - Matching Screenshot */}
      <section className="border-y border-gray-200/90 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {/* Metric 1 */}
            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10,000+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  CREATORS
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <BookOpen className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">PRACTICAL</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  BIBLICAL LEARNING
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Radio className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">LIVE CLASSES</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  WITH EXPERTS
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-3 md:justify-center">
              <div className="flex -space-x-1">
                <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              </div>
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">SUPPORTIVE</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  COMMUNITY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU'LL GET SECTION - Matching Screenshot */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
              WHAT YOU'LL GET
            </div>
            <h2 className="font-serif-ccl text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 leading-tight max-w-xl">
              Everything You Need <br />
              to Grow as a Christian Creator
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-md leading-relaxed">
            From practical courses to live classes and a supportive community, CCL gives you the
            environment, guidance, and tools to grow your God-given creativity.
          </p>
        </div>

        {/* 4 Feature Cards Grid - Matching Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Self-Paced Courses */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3">
            <BookOpen className="h-6 w-6 text-zinc-900" />
            <h3 className="font-bold text-base text-zinc-950">Self-Paced Courses</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Learn practical skills for content creation, branding, AI, and more.
            </p>
          </div>

          {/* Card 2: Live Classes */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3">
            <Video className="h-6 w-6 text-zinc-900" />
            <h3 className="font-bold text-base text-zinc-950">Live Classes</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Join live sessions with mentors and industry experts.
            </p>
          </div>

          {/* Card 3: Community */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3">
            <Users className="h-6 w-6 text-zinc-900" />
            <h3 className="font-bold text-base text-zinc-950">Community</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Connect with like-minded creators who share your values.
            </p>
          </div>

          {/* Card 4: Growth & Opportunities */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3">
            <BarChart2 className="h-6 w-6 text-zinc-900" />
            <h3 className="font-bold text-base text-zinc-950">Growth & Opportunities</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Get feedback, collaborate, and access real opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE 10 LEARNING LABS OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-gray-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
              CURRICULUM ARCHITECTURE
            </div>
            <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950">
              The 10 Practical Learning Labs
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('public_labs')}
            className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1.5"
          >
            <span>Explore All 10 Labs Breakdown</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
          {LABS.slice(0, 6).map((lab) => (
            <div
              key={lab.id}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>Level: {lab.level}</span>
                  <span>{lab.courseCount} Courses</span>
                </div>
                <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">{lab.name}</h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{lab.shortDesc}</p>

                <div className="mt-4 flex flex-wrap gap-1">
                  {lab.skillsTaught.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-700 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-mono">
                  {lab.studentCount.toLocaleString()} Learners
                </span>
                <button
                  onClick={() => setCurrentView('public_courses')}
                  className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MONTHLY CREATOR CHALLENGE HIGHLIGHT */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="rounded-3xl border border-gray-200 bg-[#f7f8fa] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600 font-bold">
              <Trophy className="h-4 w-4 text-zinc-900" />
              <span>Active Monthly Challenge</span>
            </div>
            <h3 className="font-serif-ccl text-2xl sm:text-3xl font-bold text-zinc-950">
              Church Easter Campaign Challenge
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Design an integrated Easter event flyer, 3-slide sermon carousel, and video concept for Grace Community Fellowship. Receive mentor feedback and build your public portfolio.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-1">
              <span>Deadline: October 25, 2026</span>
              <span>·</span>
              <span>184 Submissions Received</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigateWithParam('challenge_detail', 'ch_easter_campaign')}
              className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm text-center"
            >
              View Creative Brief & Join →
            </button>
          </div>
        </div>
      </section>

      {/* 6. CHURCHES & TEAMS CALLOUT */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                CHURCHES & MINISTRIES
              </div>
              <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                Equipping Local Church Media Departments
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Featured implementation: <strong className="text-zinc-900">CSMC Orisun Ibukun</strong> trained their volunteer media team with CCL’s Ministry & Design Labs, reducing sermon recap turnaround from 48 hours to under 2 hours without sacrificing theological depth.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('public_churches')}
                  className="rounded-full bg-black px-6 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Explore Church Team Seats →
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-6 space-y-3 font-mono text-xs text-zinc-600">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold border-b border-gray-200 pb-2">
                CCL Ministry Core Guardrail
              </div>
              <blockquote className="text-zinc-800 italic leading-relaxed">
                “AI is an operational assistant. It cannot pray, it cannot discern the Holy Spirit,
                and it cannot shepherd a hurting heart. We use AI to carry the operational load so
                believers can carry each other.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
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

      {/* VIDEO MODAL (Watch Video popup) */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-white/[0.1] bg-black p-4 shadow-2xl space-y-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white border-b border-zinc-800 pb-2">
              <span className="font-serif-ccl text-base font-bold">Christian Creator Lab — Introduction</span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
              <iframe
                src="https://www.youtube-nocookie.com/embed/kCc8FmEb1nY?autoplay=1&rel=0"
                title="CCL Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
