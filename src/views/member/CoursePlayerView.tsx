import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  Check,
  FileText,
  BookOpen,
  MessageSquare,
  Sparkles,
  Award,
  Share2,
} from 'lucide-react';
import { Lesson } from '../../types';

export const CoursePlayerView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    setCurrentView,
    toggleLessonComplete,
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const allLessons: Lesson[] = course.modules.flatMap((m) => m.lessons);

  const currentLesson: Lesson =
    allLessons.find((l) => l.id === selectedLessonId) ||
    allLessons[0] || {
      id: 'default',
      moduleId: 'mod_1',
      courseId: course.id,
      title: 'Introduction to Creative AI Stewardship',
      description: 'Understanding the theological and operational foundations of generative intelligence.',
      youtubeVideoId: 'kCc8FmEb1nY',
      durationMinutes: 20,
      transcript: 'Welcome to this masterclass lesson. We examine the intersection of craft, calling, and technology...',
      notes: 'Key reminder: Stewardship means using tools with moral clarity and excellence.',
      resources: [],
      order: 1,
      completed: false,
    };

  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'transcript' | 'assignment' | 'discussion'>('notes');
  const [copiedResId, setCopiedResId] = useState<string | null>(null);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: '1', user: 'Emmanuel A.', time: '2 hours ago', text: 'The aspect ratio formula for sermon carousel slides completely revolutionized our workflow.' },
    { id: '2', user: 'Sister Bukola', time: '1 day ago', text: 'Remember to verify scripture translations directly against your church Bible translation standard.' },
  ]);

  const handleCopy = (id: string, text?: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedResId(id);
      setTimeout(() => setCopiedResId(null), 2000);
    }
  };

  const handleToggleComplete = () => {
    toggleLessonComplete(course.id, currentLesson.id);
  };

  return (
    <div className="space-y-6 pb-20 text-zinc-900">
      {/* Top Breadcrumb & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200/80 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('learn')}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:text-black hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Course Library</span>
          </button>
          <div className="text-xs text-zinc-500 font-mono truncate">
            <span className="text-zinc-900 font-semibold">{course.labName}</span> / {course.title}
          </div>
        </div>

        {/* Progress & Completion */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-zinc-500">
            Progress: <span className="text-zinc-900 font-bold">{course.progressPercent}%</span>
          </div>
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              currentLesson.completed
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-black hover:bg-zinc-800 text-white shadow-2xs'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{currentLesson.completed ? 'Lesson Completed ✓' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Main Distraction-Free Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left (2 spans): Video Player & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* YouTube Video Player Container */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-xl aspect-video border border-gray-200">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentLesson.youtubeVideoId}?rel=0&modestbranding=1`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Lesson Title & Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                Lesson {currentLesson.order} of {allLessons.length}
              </span>
              <h1 className="font-serif-ccl text-2xl font-bold text-zinc-950 mt-0.5">
                {currentLesson.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={!prevLesson}
                onClick={() => prevLesson && setSelectedLessonId(prevLesson.id)}
                className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:text-black hover:bg-gray-50 disabled:opacity-40 transition-colors shadow-2xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>
              <button
                disabled={!nextLesson}
                onClick={() => nextLesson && setSelectedLessonId(nextLesson.id)}
                className="flex items-center gap-1 rounded-full bg-black hover:bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-40 transition-colors shadow-2xs"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 gap-6 text-xs font-semibold overflow-x-auto pb-1">
            {[
              { id: 'notes', label: 'Lesson Notes' },
              { id: 'resources', label: `Prompt Kit & Files (${currentLesson.resources.length})` },
              { id: 'assignment', label: 'Practical Assignment' },
              { id: 'discussion', label: `Discussion (${comments.length})` },
              { id: 'transcript', label: 'Transcript' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black font-bold'
                    : 'border-transparent text-zinc-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Cards */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            {activeTab === 'notes' && (
              <div className="space-y-4 text-xs leading-relaxed text-zinc-700">
                <div className="font-semibold text-zinc-950 text-sm">Key Takeaways:</div>
                <div className="p-4 rounded-xl bg-[#f9fafb] border border-gray-100 font-mono text-[11px] leading-relaxed text-zinc-800">
                  {currentLesson.notes}
                </div>
                <p className="text-zinc-600">{currentLesson.description}</p>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-zinc-950">
                  Downloadable Assets & Vetted Prompt Templates:
                </div>
                {currentLesson.resources.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">No resources attached to this lesson.</p>
                ) : (
                  currentLesson.resources.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-xl border border-gray-200 bg-[#f9fafb] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="font-semibold text-zinc-900 block">{res.title}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">{res.type}</span>
                        {res.content && (
                          <p className="font-mono text-[11px] text-zinc-700 line-clamp-1 bg-white p-1.5 rounded border border-gray-200">
                            {res.content}
                          </p>
                        )}
                      </div>
                      {res.content ? (
                        <button
                          onClick={() => handleCopy(res.id, res.content)}
                          className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 text-white px-4 py-2 text-xs font-semibold shrink-0 transition-colors shadow-2xs"
                        >
                          {copiedResId === res.id ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <a
                          href={res.url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 text-white px-4 py-2 text-xs font-semibold shrink-0 transition-colors shadow-2xs"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download File</span>
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'assignment' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-zinc-950">Lesson Milestone Assignment</h3>
                  <p className="text-zinc-600">
                    Apply this lesson’s workflow by creating your deliverable and submitting for mentor
                    verification.
                  </p>
                </div>

                {assignmentSubmitted ? (
                  <div className="rounded-xl bg-zinc-50 border border-gray-200 p-6 text-center space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-zinc-900 mx-auto" />
                    <span className="font-bold text-zinc-950 block">Assignment Submitted for Review</span>
                    <p className="text-zinc-500">
                      A lab mentor will review your deliverable and provide practical feedback within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAssignmentSubmitted(true);
                    }}
                    className="space-y-3"
                  >
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700">Project / Asset Link (Figma, Canva, Google Drive)</label>
                      <input
                        type="url"
                        required
                        placeholder="https://figma.com/@..."
                        className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700">Self-Reflection & Notes</label>
                      <textarea
                        rows={3}
                        value={assignmentNotes}
                        onChange={(e) => setAssignmentNotes(e.target.value)}
                        placeholder="What prompt adjustments did you make? What scripture verse did you highlight?"
                        className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-black hover:bg-zinc-800 text-white px-6 py-2.5 text-xs font-semibold transition-colors shadow-2xs"
                    >
                      Submit Milestone Project
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-4 text-xs">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!commentInput.trim()) return;
                    setComments((prev) => [
                      {
                        id: `c_${Date.now()}`,
                        user: 'You',
                        time: 'Just now',
                        text: commentInput,
                      },
                      ...prev,
                    ]);
                    setCommentInput('');
                  }}
                  className="space-y-2"
                >
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Ask a question about this lesson or share your output..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-2xs"
                    >
                      Post Question
                    </button>
                  </div>
                </form>

                <div className="space-y-3 pt-2">
                  {comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-[#f9fafb] border border-gray-100 space-y-1">
                      <div className="flex items-center justify-between font-semibold text-zinc-900">
                        <span>{c.user}</span>
                        <span className="text-[10px] text-zinc-400 font-mono font-normal">{c.time}</span>
                      </div>
                      <p className="text-zinc-600">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="text-xs text-zinc-700 leading-relaxed max-h-60 overflow-y-auto space-y-2 font-mono">
                <p>{currentLesson.transcript}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right (1 span): Curriculum Accordion */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="font-serif-ccl text-base font-bold text-zinc-950">Course Curriculum</h2>
            <p className="text-[11px] text-zinc-500 font-mono">
              {course.modules.length} Modules · {allLessons.length} Total Lessons
            </p>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold px-1">
                  Module 0{modIdx + 1}: {mod.title}
                </div>
                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-left transition-colors ${
                          isActive
                            ? 'bg-black text-white font-semibold shadow-xs'
                            : 'hover:bg-[#f7f8fa] text-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {lesson.completed ? (
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 ${
                                isActive ? 'text-white' : 'text-emerald-600'
                              }`}
                            />
                          ) : (
                            <div
                              className={`h-4 w-4 rounded-full border shrink-0 flex items-center justify-center text-[9px] font-mono ${
                                isActive
                                  ? 'border-white text-white'
                                  : 'border-zinc-300 text-zinc-500'
                              }`}
                            >
                              {lesson.order}
                            </div>
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono shrink-0 ${
                            isActive ? 'text-zinc-300' : 'text-zinc-400'
                          }`}
                        >
                          {lesson.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
