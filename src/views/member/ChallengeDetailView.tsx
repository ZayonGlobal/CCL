import { LoadingSymbol } from '../../components/LoadingSymbol';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Trophy,
  Clock,
  Calendar,
  Upload,
  ExternalLink,
  Flame,
  CheckCircle2,
  Share2,
  Heart,
  MessageSquare,
  Award,
  Star,
  Plus,
  X,
} from 'lucide-react';
import { ChallengeSubmission } from '../../types';

export const ChallengeDetailView: React.FC = () => {
  const {
    challenges,
    selectedChallengeId,
    setCurrentView,
    submissions,
    addChallengeSubmission,
    currentUser,
  } = useApp();

  const challenge =
    challenges.find((c) => c.id === selectedChallengeId) || challenges[0];

  const challengeSubmissions = submissions.filter(
    (s) => s.challengeId === challenge.id
  );

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'brief' | 'submissions'>('brief');

  // Submit form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (saving) return;
    setSaving(true);
    const saved = await addChallengeSubmission({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      creator: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        headline: currentUser.headline,
        level: currentUser.learningLevel,
      },
      title,
      description,
      toolsUsed: toolsUsed.split(',').map((t) => t.trim()),
      images: [imageUrl],
      liveUrl: liveUrl.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
    });

    setSaving(false);
    if (!saved) return;
    setIsSubmitModalOpen(false);
    setActiveTab('submissions');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto text-zinc-900">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('challenges')}
        className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Challenges Board</span>
      </button>

      {/* Header Banner */}
      <div className="rounded-3xl border border-gray-200/90 bg-white p-7 sm:p-10 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
              <span className="font-semibold text-zinc-900">{challenge.category}</span>
              <span aria-hidden="true">·</span>
              <span>{challenge.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{challenge.participantsCount} Joined</span>
            </div>

            <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
              {challenge.title}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{challenge.description}</p>

            <div className="pt-2 flex flex-wrap gap-5 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-zinc-700" />
                Start: {challenge.startDate}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                <Clock className="h-4 w-4 text-zinc-900" />
                Deadline: {challenge.deadline}
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-black hover:bg-zinc-800 px-7 py-3.5 text-xs font-semibold text-white transition-colors shadow-2xs"
            >
              <Upload className="h-4 w-4" />
              <span>Submit Your Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('brief')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'brief'
              ? 'border-black text-black font-bold'
              : 'border-transparent text-zinc-500 hover:text-black'
          }`}
        >
          Creative Brief & Rules
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'submissions'
              ? 'border-black text-black font-bold'
              : 'border-transparent text-zinc-500 hover:text-black'
          }`}
        >
          <span>Submissions Gallery</span>
          <span className="rounded-full bg-zinc-100 text-zinc-800 text-[10px] font-mono px-2 py-0.5">
            {challengeSubmissions.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Creative Brief */}
      {activeTab === 'brief' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Brief Statement */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Creative Context & Goal</h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {challenge.creativeBrief}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Required Deliverables</h2>
              <div className="space-y-2 pt-1">
                {challenge.deliverables.map((d: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-700">
                    <CheckCircle2 className="h-4 w-4 text-zinc-950 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
              <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Rules & Ethical Guardrails</h2>
              <ul className="space-y-2 text-xs text-zinc-600 list-disc list-inside">
                {challenge.rules.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Judging & Tools */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
              <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">Judging Criteria</h3>
              <div className="space-y-2 text-xs">
                {challenge.judgingCriteria.map((c: string, i: number) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#f9fafb] border border-gray-100">
                    <span className="font-semibold text-zinc-900 block">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
              <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">Recommended Tools</h3>
              <div className="flex flex-wrap gap-1.5">
                {challenge.recommendedTools.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-mono text-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Submissions Gallery */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challengeSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-3xl border border-gray-200/80 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={sub.images[0]}
                    alt={sub.title}
                    className="h-full w-full object-cover"
                  />
                  {sub.mentorFeedback && (
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>Mentor Reviewed</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">{sub.title}</h3>
                  <p className="text-xs text-zinc-600 line-clamp-2">{sub.description}</p>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <img
                      src={sub.creator.avatar}
                      alt={sub.creator.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-zinc-800">{sub.creator.name}</span>
                  </div>

                  {sub.mentorFeedback && (
                    <div className="p-3 rounded-xl bg-[#f9fafb] border border-gray-100 text-xs space-y-1">
                      <div className="font-semibold text-zinc-900 flex items-center gap-1">
                        <Star className="h-3 w-3 text-zinc-800 fill-zinc-800" />
                        <span>Mentor Rating: {sub.mentorFeedback.rating}/10</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 italic">
                        "{sub.mentorFeedback.comment}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl relative text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950 mb-1">
              Submit Your Challenge Project
            </h2>
            <p className="text-xs text-zinc-500 mb-5">
              Submit for community showcase and mentor evaluation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grace Community Church Easter Campaign"
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Project Description & Creative Rationale</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your design choices, prompt structure, and scripture verification..."
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
                <label className="text-xs font-semibold text-zinc-700">Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit" disabled={saving}
                className="w-full rounded-full bg-black hover:bg-zinc-800 text-white py-3 text-xs font-semibold transition-colors shadow-2xs mt-2"
              >{saving && <LoadingSymbol inline inverse label="Saving…" />}
                Submit Project for Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

