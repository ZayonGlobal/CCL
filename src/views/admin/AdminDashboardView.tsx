import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Users,
  BookOpen,
  Trophy,
  Tv,
  Bookmark,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Search,
  X,
  Star,
} from 'lucide-react';
import { UserRole } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    courses,
    challenges,
    projects,
    posts,
    resources,
    updateProjectReview,
    setCurrentView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'metrics' | 'courses' | 'challenges' | 'projects' | 'users'>('metrics');

  // New course modal state
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLab, setCourseLab] = useState('ministry');
  const [courseLevel, setCourseLevel] = useState('Creator');

  const stats = [
    { label: 'Total Registered Users', value: '2,840', sub: '+18% this month' },
    { label: 'Active Monthly Learners', value: '1,920', sub: '67.6% activity rate' },
    { label: 'Course Enrollments', value: '4,210', sub: 'Across 10 Labs' },
    { label: 'Average Completion Rate', value: '68%', sub: '+4.2% vs benchmark' },
    { label: 'Projects Evaluated', value: `${projects.length + 184}`, sub: 'Mentor reviewed' },
    { label: 'Live Attendance Record', value: '1,150', sub: 'YouTube concurrent' },
  ];

  const demoUsers: { name: string; email: string; role: UserRole; tier: string }[] = [
    { name: 'Isaac Adeleke', email: 'growwithaccolade@gmail.com', role: 'student', tier: 'builder' },
    { name: 'Dr. David Olatunji', email: 'david@ccl.academy', role: 'instructor', tier: 'pro' },
    { name: 'Pastor Tunde Balogun', email: 'tunde@ccl.academy', role: 'mentor', tier: 'teams' },
    { name: 'Grace Eze', email: 'grace@example.com', role: 'student', tier: 'creator' },
    { name: 'Special Apostle J.O. Adebayo', email: 'adebayo@csmcorisunibukun.org', role: 'organization_admin', tier: 'teams' },
  ];

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            <Shield className="h-4 w-4 text-zinc-900" />
            <span>Platform Administration & CMS</span>
          </div>
          <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Platform Command Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
            Monitor ecosystem analytics, manage curriculum courses, oversee monthly challenges,
            and moderate student project submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full font-semibold">
            Admin: {currentUser.firstName} ({currentUser.role})
          </span>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex border-b border-gray-200 gap-4 text-xs font-semibold overflow-x-auto pb-1">
        {[
          { id: 'metrics', label: 'Ecosystem Analytics' },
          { id: 'courses', label: `Courses (${courses.length})` },
          { id: 'challenges', label: `Challenges (${challenges.length})` },
          { id: 'projects', label: `Project Moderation (${projects.length})` },
          { id: 'users', label: 'User Directory' },
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

      {/* TAB 1: Metrics */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1"
              >
                <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">{s.label}</div>
                <div className="text-3xl font-bold font-serif-ccl text-zinc-950">{s.value}</div>
                <div className="text-[11px] text-zinc-500 font-mono">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Quick Platform Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setActiveTab('courses')}
                className="p-4 rounded-xl border border-gray-200 bg-[#f9fafb] hover:bg-zinc-100 transition-colors text-left space-y-1 text-xs"
              >
                <span className="font-bold text-zinc-950 block">Manage Courses</span>
                <span className="text-zinc-500 text-[11px]">Add modules or update YouTube links</span>
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className="p-4 rounded-xl border border-gray-200 bg-[#f9fafb] hover:bg-zinc-100 transition-colors text-left space-y-1 text-xs"
              >
                <span className="font-bold text-zinc-950 block">Curate Challenges</span>
                <span className="text-zinc-500 text-[11px]">Publish creative briefs for churches</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className="p-4 rounded-xl border border-gray-200 bg-[#f9fafb] hover:bg-zinc-100 transition-colors text-left space-y-1 text-xs"
              >
                <span className="font-bold text-zinc-950 block">Review Projects</span>
                <span className="text-zinc-500 text-[11px]">Grade deliverables & approve credentials</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Courses Management */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Active Courses Directory</h2>
            <button
              onClick={() => setIsAddCourseOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 px-4 py-2 text-xs font-semibold text-white transition-colors shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f9fafb] text-zinc-500 font-mono text-[10px] uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-4">Course Title</th>
                    <th className="p-4">Lab Pathway</th>
                    <th className="p-4">Instructor</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Lessons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-4 font-semibold text-zinc-950">{c.title}</td>
                      <td className="p-4 font-mono text-zinc-600">{c.labName}</td>
                      <td className="p-4 text-zinc-700">{c.instructor.name}</td>
                      <td className="p-4 font-mono text-zinc-500">{c.durationMinutes} mins</td>
                      <td className="p-4 font-mono text-zinc-500">{c.lessonCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Challenges Management */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Active Monthly Challenges</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {challenges.map((ch) => (
              <div
                key={ch.id}
                className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="uppercase text-zinc-900 font-bold">{ch.category}</span>
                  <span>Deadline: {ch.deadline}</span>
                </div>
                <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">{ch.title}</h3>
                <p className="text-xs text-zinc-600">{ch.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="font-mono text-zinc-500">{ch.participantsCount} participants</span>
                  <span className="bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded text-[10px] font-semibold">
                    Live Status: {ch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Project Moderation */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">
              Student Submissions Moderation Queue
            </h2>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded">
                      {proj.type}
                    </span>
                    <h3 className="font-serif-ccl text-lg font-bold text-zinc-950 mt-1">{proj.title}</h3>
                    <p className="text-xs text-zinc-500">Created by {proj.creator.name}</p>
                  </div>
                  <span className="text-xs font-mono uppercase font-semibold bg-zinc-100 px-2.5 py-1 rounded">
                    Status: {proj.status}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">{proj.description}</p>

                {proj.mentorFeedback ? (
                  <div className="p-3 rounded-xl bg-[#f9fafb] border border-gray-100 text-xs space-y-1">
                    <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-zinc-900" />
                      <span>Approved with Mentor Feedback</span>
                    </div>
                    <p className="text-zinc-600 italic">"{proj.mentorFeedback}"</p>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() =>
                        updateProjectReview(
                          proj.id,
                          'approved',
                          'Excellent execution of layout hierarchy, strong contrast for sanctuary screens, and scripture verification completed accurately.'
                        )
                      }
                      className="rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-2xs"
                    >
                      Approve Deliverable
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: User Directory */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Active Member Roster</h2>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f9fafb] text-zinc-500 font-mono text-[10px] uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-4">User Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Membership Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {demoUsers.map((u, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-4 font-semibold text-zinc-950">{u.name}</td>
                      <td className="p-4 font-mono text-zinc-600">{u.email}</td>
                      <td className="p-4 font-mono uppercase text-zinc-800">{u.role}</td>
                      <td className="p-4 font-mono uppercase text-zinc-500">{u.tier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddCourseOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsAddCourseOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl relative text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddCourseOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950 mb-1">
              Add New Academy Course
            </h2>
            <p className="text-xs text-zinc-500 mb-5">
              Publish a new video masterclass to the platform curriculum.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddCourseOpen(false);
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. AI-Powered Church Media SOPs"
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Curriculum Lab</label>
                <select
                  value={courseLab}
                  onChange={(e) => setCourseLab(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                >
                  <option value="ministry">Ministry Lab</option>
                  <option value="design">Design Lab</option>
                  <option value="video">Video & Motion Lab</option>
                  <option value="web-build">Web & Build Lab</option>
                  <option value="automation">Automation Lab</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-black hover:bg-zinc-800 text-white py-3 text-xs font-semibold transition-colors shadow-2xs mt-2"
              >
                Create & Publish Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
