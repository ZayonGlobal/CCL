import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  ChevronRight,
  Cpu,
  PenTool,
  Check,
  Play,
  ArrowRight,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setCurrentView, navigateWithParam, currentUser } = useApp();

  return (
    <div className="space-y-6 pb-16 text-zinc-900">
      {/* 1. HERO BANNER CARD - Matching Screenshot Exactly with High Contrast Dark Mode */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ebe9e3] via-[#f1f0ec] to-[#e4e3dd] dark:from-[#131620] dark:via-[#191d2a] dark:to-[#11131a] border border-[#e2e0d8] dark:border-white/15 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[260px] sm:min-h-[290px]">
          {/* Left Content */}
          <div className="p-8 sm:p-10 max-w-xl z-10 space-y-3">
            <div className="text-[11px] font-sans font-medium tracking-[0.2em] text-zinc-600 dark:text-amber-400/90 uppercase font-mono">
              GOOD TO SEE YOU AGAIN
            </div>

            <h1 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-[#111113] dark:text-white leading-none tracking-tight">
              Welcome back, {currentUser.firstName}.
            </h1>

            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
              Keep learning, creating, and building with purpose.
            </p>

            <p className="italic text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 pt-1 font-sans">
              “Ideas become impact when you use your gifts well.”
            </p>
          </div>

          {/* Right Image: Black creator looking towards mountain sunrise */}
          <div className="relative w-full md:w-1/2 h-64 md:h-[290px] overflow-hidden flex items-end justify-end">
            {/* Subtle gradient overlay to smoothly blend with the background on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ebe9e3] via-[#ebe9e3]/60 dark:from-[#131620] dark:via-[#131620]/80 to-transparent z-10 hidden md:block w-36 pointer-events-none" />

            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
              alt="Creator looking at mountains"
              className="h-full w-full object-cover grayscale contrast-110 brightness-95"
            />
          </div>
        </div>
      </section>

      {/* 2. FOUR MAIN CARDS - 2x2 Grid Matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1: Continue Learning */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-900 tracking-tight">
                Continue Learning
              </h2>
              <button
                onClick={() => navigateWithParam('course_player', 'crs_ai_foundations')}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View Course</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card Body */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
                alt="AI for Content Creation workspace"
                className="w-full sm:w-36 h-24 rounded-xl object-cover grayscale shrink-0 border border-gray-100"
              />

              <div className="flex-1 min-w-0 space-y-1 w-full">
                <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                  AI for Content Creation
                </h3>
                <p className="text-xs text-zinc-500">
                  Module 3 · Prompting with Purpose
                </p>

                {/* Progress bar with percentage on right */}
                <div className="pt-3 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-900 rounded-full w-[60%]" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 shrink-0 font-sans">
                    60%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Upcoming Live Class */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-900 tracking-tight">
                Upcoming Live Class
              </h2>
              <button
                onClick={() => setCurrentView('live')}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card Body */}
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Instructor"
                className="w-20 h-20 rounded-xl object-cover shrink-0 grayscale contrast-110 border border-gray-100"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-zinc-800 shrink-0 mt-0.5" />
                  <h3 className="font-sans font-bold text-sm text-zinc-900 leading-snug">
                    Turn Your Ideas Into Impactful Content
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 pl-6">
                  Wed, Apr 16 · 7:00 PM (WAT)
                </p>

                <div className="pt-2 pl-6">
                  <button
                    onClick={() => setCurrentView('live')}
                    className="rounded-xl bg-[#eeeff2] hover:bg-[#e4e6ea] px-5 py-2 text-xs font-semibold text-zinc-800 transition-colors"
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Your Labs */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-900 tracking-tight">
                Your Labs
              </h2>
              <button
                onClick={() => setCurrentView('public_labs')}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card Body */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                alt="Workspace with laptop"
                className="w-full sm:w-44 h-32 rounded-xl object-cover grayscale shrink-0 border border-gray-100"
              />

              <div className="flex-1 w-full space-y-2.5">
                {/* Lab 1: AI Lab */}
                <div
                  onClick={() => setCurrentView('learn')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-zinc-800" />
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900">AI Lab</h4>
                      <p className="text-xs text-zinc-500">Create better content with AI</p>
                    </div>
                  </div>
                  <div className="bg-[#f0f1f4] rounded-full p-1.5 text-zinc-600">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Lab 2: Design Lab */}
                <div
                  onClick={() => setCurrentView('learn')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PenTool className="h-5 w-5 text-zinc-800" />
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900">Design Lab</h4>
                      <p className="text-xs text-zinc-500">Create beautiful visuals</p>
                    </div>
                  </div>
                  <div className="bg-[#f0f1f4] rounded-full p-1.5 text-zinc-600">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Your Growth Journey */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-900 tracking-tight">
                Your Growth Journey
              </h2>
              <button
                onClick={() => setCurrentView('growth')}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Stepper with 4 milestones - Matching Screenshot Exactly */}
            <div className="relative pt-2 pb-4">
              {/* Stepper Connecting Lines */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-zinc-200 -z-0">
                {/* Active connecting segment */}
                <div className="h-full bg-zinc-900 w-1/3" />
              </div>

              <div className="grid grid-cols-4 gap-2 text-center relative z-10">
                {/* 1. Explorer (Completed) */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="font-bold text-xs text-zinc-900 mt-2">Explorer</span>
                  <span className="text-[11px] text-zinc-500 leading-tight">Learn the basics</span>
                </div>

                {/* 2. Creator (Completed) */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="font-bold text-xs text-zinc-900 mt-2">Creator</span>
                  <span className="text-[11px] text-zinc-500 leading-tight">Build and practice</span>
                </div>

                {/* 3. Builder (In Progress / Current) */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-white border-2 border-zinc-400 flex items-center justify-center text-xs font-bold" />
                  <span className="font-bold text-xs text-zinc-900 mt-2">Builder</span>
                  <span className="text-[11px] text-zinc-500 leading-tight">Launch projects</span>
                </div>

                {/* 4. Kingdom Leader (Upcoming) */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center text-xs font-bold" />
                  <span className="font-bold text-xs text-zinc-900 mt-2">Kingdom Leader</span>
                  <span className="text-[11px] text-zinc-500 leading-tight">Create lasting impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
