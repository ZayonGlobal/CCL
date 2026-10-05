import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Users,
  BookOpen,
  Sparkles,
  Layers,
  HeartHandshake,
  Compass,
  Award,
} from 'lucide-react';

export const PublicAbout: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalMode, setCurrentView } = useApp();

  const socialAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  ];

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              FAITH × CRAFT × KINGDOM IMPACT
            </div>

            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              Craft with <br />
              <span className="italic font-normal">Excellence.</span> <br />
              Serve with Conviction.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Christian Creator Lab (CCL) is a global learning and community ecosystem equipping
              Christians to steward emerging artificial intelligence and digital media tools with
              theological depth, creative excellence, and Kingdom purpose.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Join the Community</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('public_labs')}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <span>Explore the 10 Labs</span>
              </button>
            </div>

            {/* Social proof avatar stack */}
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
                <strong className="text-zinc-900 font-bold">10,000+</strong> believers training across 40+ nations.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
                alt="Creative Collaboration in Lab"
                className="h-full w-full object-cover grayscale contrast-115 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “When technological shifts occur, the church does not retreat into fear—we step forward to master the tool with integrity.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">— CCL MANIFESTO</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL METRICS RIBBON */}
      <section className="border-y border-gray-200/90 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10,000+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  CREATORS ENROLLED
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <ShieldCheck className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">100%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  THEOLOGICAL INTEGRITY
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Layers className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10 LABS</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  SPECIALIZED PATHS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <Award className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">5 LEVELS</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  MASTERY FRAMEWORK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ETHICAL & THEOLOGICAL ANCHOR */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
            <ShieldCheck className="h-4 w-4 text-zinc-900" />
            <span>Our Doctrinal Guardrails</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                What AI Is — And What It Can <span className="italic font-normal">Never</span> Be
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Throughout church history, believers have engaged emerging communication shifts—from Gutenberg’s movable type to global satellite broadcasting. Today, generative artificial intelligence presents unprecedented speed.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                We reject both fearful withdrawal and uncritical hype. We teach creators that AI is an operational multiplier, never a spiritual substitute.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Divine Revelation', text: 'AI does NOT replace God, the Holy Spirit, or the inspired Word of Scripture.' },
                { title: 'Spiritual Discernment', text: 'AI cannot pray, fast, discern spiritual warfare, or hear God on behalf of a congregation.' },
                { title: 'Pastoral Care', text: 'AI cannot shepherd broken souls, conduct biblical counseling, or walk through grief.' },
                { title: 'Human Community', text: 'AI cannot replace authentic discipleship, fellowship, or physical church assembly.' },
                { title: 'Operational Stewardship', text: 'AI is a computational servant to lift administrative weight so humans can love people.' },
                { title: 'Verification Standard', text: 'All Scripture quotes and doctrinal assertions must be physically validated by human hands.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 bg-[#f9fafb] p-4 space-y-1.5 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-900 shrink-0" />
                    <span className="text-xs font-bold text-zinc-950 font-sans">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed pl-6">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 5 LEVELS OF MASTERY */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
              LEARNER JOURNEY
            </div>
            <h2 className="font-serif-ccl text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 leading-tight max-w-xl">
              Five Verifiable Levels <br />
              from Beginner to Kingdom Leader
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-md leading-relaxed">
            Every creator advances through objective milestones, project submissions, and mentor reviews rather than passive video consumption.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              level: 'Level 1 — Explorer',
              tag: 'Understand AI',
              desc: 'Grasp generative AI mechanics, safety fundamentals, prompt grammar, and theological boundaries with zero prior tech background.',
              skills: ['LLM Fundamentals', 'Prompt Architecture', 'Theological Safety', 'Hallucination Checks'],
            },
            {
              level: 'Level 2 — Creator',
              tag: 'Create Using AI',
              desc: 'Master AI image generation, typography integration, church visual packages, sermon recap reels, and biblical storytelling.',
              skills: ['Midjourney & Flux', 'Canva AI Workflows', 'CapCut & Runway', 'Sermon Carousels'],
            },
            {
              level: 'Level 3 — Builder',
              tag: 'Build Digital Solutions',
              desc: 'Harness vibe coding, web generation, Make.com automations, and custom church workflow bots to eliminate repetitive administrative burden.',
              skills: ['Vibe Coding', 'Custom GPT Assistants', 'Make.com Pipelines', 'Responsive Portals'],
            },
            {
              level: 'Level 4 — Professional',
              tag: 'Earn Ethically',
              desc: 'Package high-value digital services for ministries, non-profits, and Kingdom businesses with ethical pricing and clear client deliverables.',
              skills: ['Portfolio Building', 'Client Contracts', 'Service Packaging', 'Brand Strategy'],
            },
            {
              level: 'Level 5 — Kingdom Leader',
              tag: 'Multiply Others',
              desc: 'Draft church AI governance policies, train volunteer media departments, mentor emerging talent, and multiply digital Kingdom influence.',
              skills: ['Policy Drafting', 'Team Training SOPs', 'Mentor Reviewing', 'Kingdom Multiplication'],
            },
          ].map((lvl, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-serif-ccl text-xl font-bold text-zinc-950">{lvl.level}</span>
                  <span className="rounded bg-zinc-100 px-2.5 py-0.5 text-[10px] text-zinc-800 font-mono font-semibold uppercase">
                    {lvl.tag}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{lvl.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 lg:justify-end">
                {lvl.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-mono text-zinc-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOUR FOUNDATIONAL PILLARS */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="border-t border-gray-200 pt-10">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
            ORGANIZATIONAL VALUES
          </div>
          <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mb-8">
            The Four Pillars of CCL
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: HeartHandshake,
                title: 'Christ-Centered Calling',
                desc: 'Every technical ability and creative asset exists to bring honor to Jesus and advance His message.',
              },
              {
                icon: Sparkles,
                title: 'Uncompromising Craft',
                desc: 'Believers should produce the highest aesthetic standard in graphic design, motion, and digital interfaces.',
              },
              {
                icon: ShieldCheck,
                title: 'Theological Integrity',
                desc: 'Zero tolerance for doctrinal compromise, scripture distortion, or deceptive deepfakes in ministry work.',
              },
              {
                icon: Compass,
                title: 'Kingdom Multiplication',
                desc: 'True mastery is not hoarding knowledge, but equipping local churches and raising the next generation.',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3"
              >
                <p.icon className="h-6 w-6 text-zinc-900" />
                <h3 className="font-bold text-base text-zinc-950">{p.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION BANNER */}
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
