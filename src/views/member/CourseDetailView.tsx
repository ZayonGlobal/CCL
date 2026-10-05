import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Layers,
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    setCurrentView,
    navigateWithParam,
    enrollInCourse,
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleStart = () => {
    if (!course.isEnrolled) {
      enrollInCourse(course.id);
    }
    navigateWithParam('course_player', course.id);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto text-zinc-900">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('learn')}
        className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Course Academy</span>
      </button>

      {/* Hero Banner */}
      <div className="rounded-3xl border border-gray-200/90 bg-white p-7 sm:p-10 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
              <span className="font-semibold text-zinc-900">{course.labName}</span>
              <span aria-hidden="true">·</span>
              <span>Level: {course.level}</span>
              <span aria-hidden="true">·</span>
              <span>{course.difficulty}</span>
            </div>

            <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
              {course.title}
            </h1>

            <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">{course.fullDesc || course.shortDesc}</p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-zinc-800" />
                <span>{course.durationMinutes} Minutes Video</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-zinc-800" />
                <span>{course.lessonCount} Lessons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-zinc-800" />
                <span>Verified Certificate Track</span>
              </div>
            </div>

            {/* Instructor badge */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="h-10 w-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="text-xs font-bold text-zinc-950">{course.instructor.name}</p>
                <p className="text-[11px] text-zinc-500">{course.instructor.title}</p>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="w-full lg:w-72 rounded-2xl border border-gray-200 bg-[#f9fafb] p-6 space-y-4 shrink-0 shadow-2xs">
            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-zinc-100">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <button
                  onClick={handleStart}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg hover:scale-105 transition-transform"
                >
                  <Play className="h-5 w-5 fill-black ml-0.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full rounded-full bg-black hover:bg-zinc-800 py-3 text-xs font-semibold text-white transition-colors shadow-2xs text-center"
            >
              {course.isEnrolled ? 'Resume Course →' : 'Start Free Learning →'}
            </button>
            <p className="text-[10px] text-zinc-400 text-center font-mono">
              Includes prompt kits, project files & certificate
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Outline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950">
            Curriculum & Modules
          </h2>
          <span className="text-xs font-mono text-zinc-500">
            {course.modules.length} Modules · {course.lessonCount} Lessons
          </span>
        </div>

        <div className="space-y-4">
          {course.modules.map((mod, idx) => (
            <div
              key={mod.id}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                    Module 0{idx + 1}
                  </span>
                  <h3 className="font-serif-ccl text-lg font-bold text-zinc-950 mt-0.5">
                    {mod.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {mod.lessons.length} Lessons
                </span>
              </div>

              <div className="space-y-2">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (!course.isEnrolled) enrollInCourse(course.id);
                      navigateWithParam('course_player', course.id);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f7f8fa] cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 shrink-0 font-mono text-[10px]">
                        {lesson.order}
                      </div>
                      <div>
                        <span className="font-medium text-zinc-900 block">{lesson.title}</span>
                        <span className="text-[10px] text-zinc-500 line-clamp-1">
                          {lesson.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-zinc-400">
                      <span>{lesson.durationMinutes}m</span>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
