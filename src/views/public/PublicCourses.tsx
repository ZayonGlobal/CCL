import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

import {
  BookOpen,
  Clock,
  ArrowRight,
  Search,
  Users,
  Video,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';

export const PublicCourses: React.FC = () => {
  const { courses, setCurrentView, navigateWithParam, setIsAuthModalOpen, setAuthModalMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState('all');

  const labFilters = [
    { id: 'all', label: 'All Programs' },
    { id: 'ai-foundations', label: 'AI Foundations' },
    { id: 'design', label: 'Design' },
    { id: 'video', label: 'Video & Motion' },
    { id: 'content', label: 'Content' },
    { id: 'web-build', label: 'Web & Build' },
    { id: 'automation', label: 'Automation' },
    { id: 'ministry', label: 'Ministry' },
    { id: 'business', label: 'Business' },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => c.published && c.ownerId && c.labId === 'ai-foundations').filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLab = selectedLab === 'all' || c.labId === selectedLab;
      return matchesSearch && matchesLab;
    });
  }, [courses, searchQuery, selectedLab]);

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              PROGRAMS & MASTERCLASSES
            </div>

            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              Practical AI <br />
              <span className="italic font-normal">Programs.</span> <br />
              Start with the Foundations.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Start with AI Foundations. Browse published courses below and check their lessons and access details. Specialist labs are coming soon; a free account does not unlock every future programme.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Create a free account</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('public_labs')}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <span>Explore the 10 Labs</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="Creator learning digital skills"
                className="h-full w-full object-cover grayscale contrast-115 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “Equipping the saints with modern tools to make the Gospel visible and compelling.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">— COURSE PHILOSOPHY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COURSES SEARCH & FILTER SECTION */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1">
              CATALOG SEARCH
            </div>
            <h2 className="font-serif-ccl text-3xl font-bold text-zinc-950">
              Explore published courses
            </h2>
          </div>

          {/* Search bar matching homepage */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, skill, instructor..."
              className="w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-6 pb-8">
          {labFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLab(tab.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                selectedLab === tab.id
                  ? 'bg-black text-white shadow-xs'
                  : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredCourses.length === 0 && <p role="status" className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-zinc-600">No instructor-published course matches this selection yet. Follow our WhatsApp channel for learning updates and free resources.</p>}
        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl border border-gray-200/80 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group shadow-[0_2px_14px_rgba(0,0,0,0.03)]"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-900 font-semibold uppercase">
                    {course.labName}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white">
                    {course.difficulty}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <span>Level: {course.level}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.durationMinutes} mins</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.lessonCount} lessons</span>
                  </div>

                  <h3 className="font-serif-ccl text-xl font-bold text-zinc-950 group-hover:text-black transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="h-7 w-7 rounded-full object-cover border border-gray-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-800 truncate">
                        {course.instructor.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate">{course.instructor.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-black hover:bg-zinc-800 py-3 text-xs font-semibold text-white transition-colors shadow-2xs"
                >
                  <span>Enroll in Program</span>
                  <ArrowRight className="h-4 w-4" />
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
            START YOUR JOURNEY
          </div>

          <h2 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to Enroll in a Course?
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Create an account to explore your learning workspace. Each course has its own content and access requirements.
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
              onClick={() => setCurrentView('public_membership')}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              About membership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

