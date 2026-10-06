import { LabAvailability, isLabOpen } from '../../components/LabAvailability';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LABS } from '../../data/seedData';
import {
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle2,
  Users,
  Compass,
  Award,
  Filter,
} from 'lucide-react';

export const PublicLabs: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setAuthModalMode } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 10 Labs' },
    { id: 'creative', label: 'Design & Visual' },
    { id: 'technical', label: 'Web & Automation' },
    { id: 'ministry', label: 'Ministry & Church' },
    { id: 'leadership', label: 'Business & Growth' },
  ];

  const filteredLabs = LABS.filter((lab) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'creative') {
      return ['design', 'video', 'content'].includes(lab.id);
    }
    if (activeCategory === 'technical') {
      return ['ai-foundations', 'web-build', 'automation'].includes(lab.id);
    }
    if (activeCategory === 'ministry') {
      return ['ministry', 'leadership'].includes(lab.id);
    }
    if (activeCategory === 'leadership') {
      return ['business', 'growth', 'leadership'].includes(lab.id);
    }
    return true;
  });

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              CURRICULUM ARCHITECTURE × 10 PATHWAYS
            </div>

            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              The 10 Practical <br />
              <span className="italic font-normal">Learning Labs.</span> <br />
              Targeted for Impact.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Christian Creator Lab organizes every discipline into dedicated, self-contained labs.
              Whether you are an aspiring designer, church media director, or entrepreneur, there is a
              tailored progression track waiting for you.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Start with AI Foundations</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('public_courses')}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <span>Browse Course Catalog</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Creator Lab Cohort"
                className="h-full w-full object-cover grayscale contrast-115 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “Structured tracks ensure you don’t just accumulate knowledge—you produce verified deliverables.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">— LAB ARCHITECTURE</div>
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
              <Layers className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10 LABS</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  SPECIALIZED CURRICULA
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <BookOpen className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">100% PRACTICAL</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  REAL DELIVERABLES
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">10,000+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  ACTIVE STUDENTS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <Award className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">VERIFIED</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  PORTFOLIO PROJECTS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LABS GRID WITH FILTER */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-gray-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
              BROWSE BY FOCUS
            </div>
            <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950">
              Explore the 10 Learning Labs
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-black text-white shadow-xs'
                    : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The 10 Labs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="rounded-3xl border border-gray-200/80 bg-white p-7 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow shadow-[0_2px_14px_rgba(0,0,0,0.03)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                  <span className="text-zinc-900 font-bold uppercase">Level: {lab.level}</span>
                  {isLabOpen(lab.id) && <span>{lab.courseCount} Courses · {lab.studentCount.toLocaleString()} Learners</span>}
                </div>

                <h3 className="font-serif-ccl text-2xl font-bold text-zinc-950 mt-1">{lab.name}</h3>
                <div className="mt-2"><LabAvailability id={lab.id} /></div>
                <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">{lab.description}</p>

                {/* Topics */}
                <div className="mt-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
                    Core Topics Covered
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-800 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practical Skills */}
                <div className="mt-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
                    Practical Skills Built
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.skillsTaught.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-mono text-zinc-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono">
                  {lab.id === 'ministry'
                    ? 'Includes Church SOPs'
                    : lab.id === 'web-build'
                    ? 'Includes Vibe Coding'
                    : 'Hands-on Projects'}
                </span>
                <button
                  disabled={!isLabOpen(lab.id)}
                  onClick={() => setCurrentView('public_courses')}
                  className="disabled:opacity-40 disabled:cursor-not-allowed rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>{isLabOpen(lab.id) ? 'Explore Courses' : 'Coming soon'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 text-center pt-10">
        <div className="rounded-3xl bg-zinc-950 text-white p-10 sm:p-16 space-y-6 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            JOIN CHRISTIAN CREATOR LAB
          </div>

          <h2 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Start with AI Foundations
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Begin with AI Foundations. Our other nine learning labs are coming soon.
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
              View Course Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
