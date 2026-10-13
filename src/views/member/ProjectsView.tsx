import { LoadingSymbol } from '../../components/LoadingSymbol';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderGit2,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  Award,
  Globe,
  Lock,
  X,
} from 'lucide-react';
import { Project } from '../../types';

export const ProjectsView: React.FC = () => {
  const { projects, createProject, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New project state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Project['type']>('personal');
  const [description, setDescription] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const isPublic = false;

  const filteredProjects = projects.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const [saving, setSaving] = useState(false);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (saving) return;
    setSaving(true);
    const saved = await createProject({
      title,
      cover: '/avatar.svg',
      creator: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        headline: currentUser.headline,
      },
      type,
      description,
      projectBrief,
      toolsUsed: toolsUsed.split(',').map((t) => t.trim()),
      images: [],
      liveUrl: liveUrl.trim() || undefined,
      status: 'submitted',
      isPublic,
    });

    setSaving(false);
    if (!saved) return;
    setIsCreateOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            Portfolio & Proof of Work
          </div>
          <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Creator Projects Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
            Save your creative work and submit it for administrator review. Projects are visible
            to you and platform administrators.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 px-5 py-2.5 text-xs font-semibold text-white transition-colors shadow-2xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 gap-4 text-xs font-semibold overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'approved', label: 'Approved & Verified' },
          { id: 'featured', label: 'Featured' },
          { id: 'submitted', label: 'Under Mentor Review' },
          { id: 'draft', label: 'Drafts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`pb-2 border-b-2 whitespace-nowrap transition-colors ${
              filterStatus === tab.id
                ? 'border-black text-black font-bold'
                : 'border-transparent text-zinc-500 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-3xl border border-gray-200/80 bg-white overflow-hidden shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                <img
                  src={proj.cover}
                  alt={proj.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-900 font-semibold uppercase">
                  {proj.type}
                </div>
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono capitalize text-white">
                  {proj.status}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif-ccl text-xl font-bold text-zinc-950 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tools Used */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.toolsUsed.map((t, i) => (
                    <span
                      key={i}
                      className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Mentor Review Badge */}
                {proj.mentorFeedback && (
                  <div className="p-3 rounded-xl bg-[#f9fafb] border border-gray-100 text-xs space-y-1 mt-2">
                    <div className="flex items-center justify-between font-semibold text-zinc-900">
                      <span>Mentor Review</span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 italic">
                      "{proj.mentorFeedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 text-xs">
              <span className="text-[11px] font-mono text-zinc-400">
                Private Project
              </span>
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-semibold text-zinc-900 hover:underline"
                >
                  <span>View Deliverable</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl relative text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950 mb-1">
              Add New Project to Portfolio
            </h2>
            <p className="text-xs text-zinc-500 mb-5">
              Showcase work produced for courses, client deliverables, or church media.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Easter Sunday Visual Identity Package"
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Project Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                >
                  <option value="course_project">Course Milestone Project</option>
                  <option value="challenge_submission">Challenge Submission</option>
                  <option value="personal">Personal / Church Portfolio Project</option>
                  <option value="client_work">Client / Ministry Work</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the background, creative brief, and technical workflow..."
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Tools Used</label>
                <input
                  type="text"
                  value={toolsUsed}
                  onChange={(e) => setToolsUsed(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Deliverable URL (Figma, Website, Drive)</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit" disabled={saving}
                className="w-full rounded-full bg-black hover:bg-zinc-800 text-white py-3 text-xs font-semibold transition-colors shadow-2xs mt-2"
              >{saving && <LoadingSymbol inline inverse label="Saving…" />}
                Add Project to Portfolio
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

