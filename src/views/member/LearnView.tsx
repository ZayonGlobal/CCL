import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { LABS } from '../../data/seedData';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { LabId, LearningLevel } from '../../types';

export const LearnView: React.FC = () => {
  const { courses, navigateWithParam, enrollInCourse } = useApp();

  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (selectedLab !== 'all' && c.labId !== selectedLab) return false;
      if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;
      if (selectedDifficulty !== 'all' && c.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.shortDesc.toLowerCase().includes(q) ||
          c.labName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [courses, selectedLab, selectedLevel, selectedDifficulty, searchQuery]);

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/70 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Course Library & Labs
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-900 mt-1">
          Practical Creator & AI Academy
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-2xl">
          Zero-fluff, outcome-focused curriculum. Every course includes hands-on prompt templates,
          deliverables, and mentor review.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-4 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Search input */}
        <div className="relative">
          <Search className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title, skill, or keyword..."
            className="w-full rounded-xl border-0 bg-[#eeeff2] pl-9 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-900 focus:outline-none"
          />
        </div>

        {/* Filter dropdowns & tabs */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Lab select */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-mono text-[11px]">Lab:</span>
            <select
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
              className="rounded-lg border border-gray-200 bg-[#f7f8fa] px-2.5 py-1.5 text-zinc-800 focus:outline-none"
            >
              <option value="all">All 10 Labs</option>
              {LABS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level select */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-mono text-[11px]">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-lg border border-gray-200 bg-[#f7f8fa] px-2.5 py-1.5 text-zinc-800 focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="Explorer">Explorer (L1)</option>
              <option value="Creator">Creator (L2)</option>
              <option value="Builder">Builder (L3)</option>
              <option value="Professional">Professional (L4)</option>
              <option value="Kingdom Leader">Kingdom Leader (L5)</option>
            </select>
          </div>

          {/* Difficulty select */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-mono text-[11px]">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-lg border border-gray-200 bg-[#f7f8fa] px-2.5 py-1.5 text-zinc-800 focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {(selectedLab !== 'all' || selectedLevel !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedLab('all');
                setSelectedLevel('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-zinc-600 hover:text-black hover:underline font-mono ml-auto"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-900 font-semibold uppercase">
                  {course.labName}
                </div>
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-white">
                  {course.difficulty}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                  <span>Level: {course.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.durationMinutes} mins</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.lessonCount} lessons</span>
                </div>

                <h3 className="font-serif-ccl text-lg font-bold text-zinc-900 group-hover:text-black transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {course.shortDesc}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium text-zinc-700 truncate">
                      {course.instructor.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="p-5 pt-0">
              {course.isEnrolled ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Enrolled</span>
                    <span className="text-zinc-900 font-bold">{course.progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-200 overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 rounded-full"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                  <button
                    onClick={() => navigateWithParam('course_player', course.id)}
                    className="w-full mt-2 rounded-xl bg-zinc-900 hover:bg-black py-2 text-xs font-bold text-white transition-colors"
                  >
                    Continue Course
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateWithParam('course_detail', course.id)}
                    className="flex-1 rounded-xl bg-[#eeeff2] hover:bg-[#e4e6ea] py-2 text-xs font-semibold text-zinc-800 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      enrollInCourse(course.id);
                      navigateWithParam('course_player', course.id);
                    }}
                    className="flex-1 rounded-xl bg-zinc-900 hover:bg-black py-2 text-xs font-bold text-white transition-colors"
                  >
                    Enroll Free
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-zinc-500 space-y-2">
          <BookOpen className="h-8 w-8 text-zinc-400 mx-auto" />
          <p className="text-sm font-bold text-zinc-800">No courses match your filter criteria</p>
          <p className="text-xs text-zinc-500">
            Try adjusting your search keyword or clearing the selected Lab and Level.
          </p>
        </div>
      )}
    </div>
  );
};
