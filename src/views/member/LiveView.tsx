import { LoadingSymbol } from '../../components/LoadingSymbol';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

import {
  Tv,
  Calendar,
  Clock,
  Bell,
  Sparkles,
  Play,
  FileText,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Plus,
  Send,
  Users,
} from 'lucide-react';
import { LiveSession } from '../../types';

export const LiveView: React.FC = () => {
  const { currentUser, liveSessions: sessions, commentsFor, saveActivity, publishCatalog, bookmarks, toggleBookmark } = useApp();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const activeSession = sessions.find(s => s.id === sessionId) || sessions[0];
  const setActiveSession = (session: LiveSession) => setSessionId(session.id);
  const reminderSet = activeSession ? bookmarks.has(activeSession.id) : false;
  const [saving, setSaving] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const chatMessages = activeSession ? commentsFor('live_chat', activeSession.id) : [];

  const [customVideoId, setCustomVideoId] = useState('');
  const isAdmin = currentUser.role === 'administrator' || currentUser.role === 'super_admin';

  const handleUpdateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoId.trim()) return;
    let id = customVideoId.trim();
    if (id.includes('v=')) {
      id = id.split('v=')[1].split('&')[0];
    } else if (id.includes('youtu.be/')) {
      id = id.split('youtu.be/')[1].split('?')[0];
    } else if (id.includes('live/')) {
      id = id.split('live/')[1].split('?')[0];
    }

    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    setSaving(true);
    const saved = await publishCatalog('live', { ...activeSession, youtubeVideoId: id }, true);
    setSaving(false); if (saved) setCustomVideoId('');
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim() || saving) return;
    setSaving(true);
    const saved = await saveActivity('live_chat', { text: chatInput.trim() }, activeSession.id);
    setSaving(false); if (saved) setChatInput('');
  };

  if (!activeSession) return <div className="rounded-3xl bg-white border p-8"><h1 className="font-serif-ccl text-3xl">Live Labs</h1><p className="text-sm text-zinc-600 mt-3">New sessions will appear here when they are published.</p></div>;

  return (
    <div className="space-y-8 pb-20 text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            <Tv className="h-4 w-4 text-zinc-800" />
            <span>YouTube Live Infrastructure</span>
          </div>
          <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Live Lab Masterclasses & Replays
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
            Interactive, real-time workshops hosted on YouTube and curated with dedicated lesson
            resources, live Q&A, and practical prompt toolkits.
          </p>
        </div>

        {/* Calendar reminder CTA */}
        <button
          onClick={() => toggleBookmark(activeSession.id)}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors shadow-2xs ${
            reminderSet
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'border border-gray-200 bg-white hover:bg-gray-50 text-zinc-800'
          }`}
        >
          <Bell className="h-4 w-4 text-zinc-800" />
          <span>{reminderSet ? 'Session Saved ✓' : 'Save Session'}</span>
        </button>
      </div>

      {/* Main Broadcast Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 spans): Stream Player & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-xl aspect-video border border-gray-200">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeSession.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={activeSession.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Session Overview Card */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded font-semibold">
                  {activeSession.isLiveNow ? 'Streaming Live' : activeSession.isReplay ? 'Archive Replay' : 'Scheduled Masterclass'}
                </span>
                <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950 mt-1">
                  {activeSession.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-zinc-700" />
                  {activeSession.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-zinc-700" />
                  {activeSession.timeString}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {activeSession.description}
            </p>

            {/* Instructor Details */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <img
                src={activeSession.instructor.avatar}
                alt={activeSession.instructor.name}
                className="h-10 w-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="text-xs font-bold text-zinc-950">{activeSession.instructor.name}</p>
                <p className="text-[11px] text-zinc-500">{activeSession.instructor.title}</p>
              </div>
            </div>

            {/* Resources attached */}
            {activeSession.resources.length > 0 && (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <span className="text-xs font-semibold text-zinc-950 block">Session Toolkits & Files:</span>
                <div className="flex flex-wrap gap-2">
                  {activeSession.resources.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-[#f9fafb] hover:bg-zinc-100 px-3.5 py-1.5 text-xs text-zinc-800 transition-colors shadow-2xs"
                    >
                      <FileText className="h-3.5 w-3.5 text-zinc-800" />
                      <span>{r.title}</span>
                      <ExternalLink className="h-3 w-3 text-zinc-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin stream update widget */}
          {isAdmin && (
            <div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
                <span>Instructor / Admin Controls: Change YouTube Broadcast Stream</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Live Ops</span>
              </div>
              <form onSubmit={handleUpdateStream} className="flex gap-2">
                <input
                  type="text"
                  value={customVideoId}
                  onChange={(e) => setCustomVideoId(e.target.value)}
                  placeholder="Paste YouTube Video ID or URL (e.g. kCc8FmEb1nY)..."
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
                <button
                  type="submit" disabled={saving}
                  className="rounded-xl bg-black hover:bg-zinc-800 text-white px-4 py-2 text-xs font-semibold transition-colors"
                >{saving && <LoadingSymbol inline inverse label="Saving…" />}
                  Update Stream
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column (1 span): Live Interactive Chat */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4 flex flex-col h-[560px]">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-zinc-800" />
              <span className="text-xs font-bold text-zinc-950 font-sans">Live Class Discussion</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              284 Online
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {chatMessages.map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-[#f9fafb] border border-gray-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">{m.user}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{m.time}</span>
                </div>
                <p className="text-zinc-600 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendChat} className="flex gap-2 border-t border-gray-100 pt-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question in live chat..."
              className="flex-1 rounded-full border border-gray-200 bg-[#f9fafb] px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
            />
            <button
              type="submit" disabled={saving}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black hover:bg-zinc-800 text-white shrink-0 shadow-2xs"
            >{saving && <LoadingSymbol inline inverse label="Saving…" />}
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Upcoming & Replay Archive */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950">
          Upcoming Schedule & Replay Archive
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              onClick={() => setActiveSession(sess)}
              className={`rounded-2xl border p-5 cursor-pointer transition-all ${
                activeSession.id === sess.id
                  ? 'border-black bg-white shadow-md'
                  : 'border-gray-200/80 bg-white hover:border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>{sess.date} · {sess.timeString}</span>
                <span className="uppercase text-zinc-900 font-semibold">
                  {sess.isLiveNow ? 'Live Now' : sess.isReplay ? 'Replay' : 'Upcoming'}
                </span>
              </div>
              <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">{sess.title}</h3>
              <p className="text-xs text-zinc-600 mt-2 line-clamp-2">{sess.description}</p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-800">{sess.instructor.name}</span>
                <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1">
                  <span>Watch Stream</span>
                  <Play className="h-3 w-3 fill-black text-black" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

