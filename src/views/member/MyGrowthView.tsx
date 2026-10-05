import React from 'react';
import { useApp } from '../../context/AppContext';
import { USER_SKILLS, ACHIEVEMENTS, CERTIFICATES } from '../../data/seedData';
import {
  TrendingUp,
  Flame,
  Award,
  BookOpen,
  Trophy,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const MyGrowthView: React.FC = () => {
  const { currentUser, courses, projects, navigateWithParam } = useApp();

  const completedCourses = courses.filter((c) => (c.progressPercent || 0) >= 100).length;
  const inProgressCourses = courses.filter((c) => (c.progressPercent || 0) > 0 && (c.progressPercent || 0) < 100).length;

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          Milestones & Evolution
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          My Growth & Mastery Path
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
          Track verified competencies, hands-on lab hours, project deliverables, and earned Kingdom
          credentials.
        </p>
      </div>

      {/* Top 4 Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Daily Streak</div>
          <div className="text-2xl font-bold text-zinc-950 font-serif-ccl mt-1 flex items-center gap-1.5">
            <Flame className="h-5 w-5 text-zinc-900" />
            <span>{currentUser.streakDays} Days</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Longest: {currentUser.longestStreak}d</div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Hours Practiced</div>
          <div className="text-2xl font-bold text-zinc-950 font-serif-ccl mt-1">
            {currentUser.hoursLearned}h
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Verified lab time</div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Courses Enrolled</div>
          <div className="text-2xl font-bold text-zinc-950 font-serif-ccl mt-1">
            {inProgressCourses + completedCourses}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">{completedCourses} completed</div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Projects Built</div>
          <div className="text-2xl font-bold text-zinc-950 font-serif-ccl mt-1">
            {projects.length}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Verified deliverables</div>
        </div>
      </div>

      {/* Main Grid: Skills Mastery & Earned Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 spans): Skills Progress Bars */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Verified Competencies</h2>
            <p className="text-xs text-zinc-500">
              Evaluated based on submitted course milestones and challenge solutions.
            </p>
          </div>

          <div className="space-y-4">
            {USER_SKILLS.map((skill) => (
              <div key={skill.name} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-950">{skill.name}</span>
                    <span className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                      {skill.level}
                    </span>
                  </div>
                  <span className="font-mono text-zinc-900 font-semibold">{skill.percentage}%</span>
                </div>

                {/* Progress track */}
                <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 span): Credentials & Badges */}
        <div className="space-y-6">
          {/* Certificates */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">Earned Credentials</h3>
              <ShieldCheck className="h-4 w-4 text-zinc-900" />
            </div>

            <div className="space-y-3">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => navigateWithParam('verify_certificate', cert.certificateId)}
                  className="p-3.5 rounded-xl border border-gray-200 bg-[#f9fafb] hover:bg-zinc-50 cursor-pointer transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-950">{cert.courseOrPathTitle}</span>
                    <Award className="h-4 w-4 text-zinc-900 shrink-0" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                    <span>ID: {cert.certificateId}</span>
                    <span className="font-semibold text-zinc-900">Verify Registry →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">Milestone Badges</h3>
              <span className="text-[10px] font-mono text-zinc-400">{ACHIEVEMENTS.length} Earned</span>
            </div>

            <div className="space-y-2.5">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f9fafb] border border-gray-100 text-xs">
                  <div className="p-1.5 rounded-lg bg-white border border-gray-200 text-zinc-800 shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-zinc-950 truncate">{ach.title}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
