import { LoadingSymbol } from '../../components/LoadingSymbol';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMUNITY_SPACES } from '../../data/seedData';
import {
  Users,
  MessageSquare,
  Heart,
  Plus,
  Pin,
  Bookmark,
  Send,
  Share2,
  X,
} from 'lucide-react';
import { Post, PostCategory } from '../../types';

export const CommunityView: React.FC = () => {
  const { posts, toggleReaction, createPost, currentUser, commentsFor, saveActivity } = useApp();
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('all');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // New post form state
  const [postTitle, setPostTitle] = useState('');
  const [postSpaceId, setPostSpaceId] = useState('space_general');
  const [postCategory, setPostCategory] = useState<PostCategory>('Discussion');
  const [postContent, setPostContent] = useState('');

  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const filteredPosts = posts.filter((p) => {
    if (selectedSpaceId === 'all') return true;
    return p.spaceId === selectedSpaceId;
  });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const spaceObj = COMMUNITY_SPACES.find((s) => s.id === postSpaceId);
    const spaceName = spaceObj ? spaceObj.name : 'General';

    if (saving) return;
    setSaving(true);
    const saved = await createPost(postSpaceId, spaceName, postCategory, postTitle, postContent);
    setSaving(false);
    if (!saved) return;
    setIsNewPostOpen(false);
    setPostTitle('');
    setPostContent('');
  };

  const handleSendReply = async (postId: string) => {
    const text = (replyInputs[postId] || '').trim();
    if (!text || saving) return;
    setSaving(true);
    const saved = await saveActivity('comment', { text }, postId);
    setSaving(false);
    if (saved) setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            Creator Guild & Community
          </div>
          <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Kingdom Creator Community
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
            A purposeful gathering of Christian designers, media directors, writers, and vibe coders.
            Exchange workflows, seek feedback, and celebrate milestones together.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 px-5 py-2.5 text-xs font-semibold text-white transition-colors shadow-2xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Main Grid: Spaces Sidebar & Post Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column (1 span): Spaces Directory */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-4 space-y-2 sticky top-24 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold px-3 pb-2 border-b border-gray-100">
            Discussion Spaces
          </div>

          <button
            onClick={() => setSelectedSpaceId('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
              selectedSpaceId === 'all'
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <span>All Spaces</span>
            <span className="text-[10px] font-mono opacity-80">{posts.length}</span>
          </button>

          {COMMUNITY_SPACES.map((space) => {
            const isSelected = selectedSpaceId === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpaceId(space.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="block truncate">{space.name}</span>
                </div>
                <span className="text-[10px] font-mono opacity-70 shrink-0">
                  {space.postCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column (3 spans): Posts Feed */}
        <div className="lg:col-span-3 space-y-4">
          {filteredPosts.map((post) => {
            const replies = commentsFor('comment', post.id);
            return (
              <div
                key={post.id}
                className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-zinc-950">{post.author.name}</span>
                        <span className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded uppercase">
                          {post.spaceName}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        {post.author.headline} · {post.createdAt}
                      </p>
                    </div>
                  </div>

                  {post.isPinned && (
                    <div className="flex items-center gap-1 rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                      <Pin className="h-3 w-3" />
                      <span>Pinned</span>
                    </div>
                  )}
                </div>

                {/* Title & Body */}
                <div className="space-y-2">
                  <h3 className="font-serif-ccl text-lg font-bold text-zinc-950 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100 text-xs text-zinc-500">
                  <button
                    onClick={() => toggleReaction(post.id, 'helpful')}
                    className="flex items-center gap-1.5 font-medium hover:text-black transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{post.reactions.helpful}</span>
                  </button>
                  <div className="flex items-center gap-1.5 font-medium">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.commentsCount} replies</span>
                  </div>
                </div>

                {/* Existing Replies List */}
                {replies.length > 0 && (
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3 rounded-xl bg-[#f9fafb] border border-gray-100 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between font-semibold text-zinc-900">
                          <span>{reply.author}</span>
                          <span className="text-[10px] font-mono text-zinc-400 font-normal">
                            {reply.time}
                          </span>
                        </div>
                        <p className="text-zinc-600 leading-relaxed">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Reply Input */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={replyInputs[post.id] || ''}
                    onChange={(e) =>
                      setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendReply(post.id);
                    }}
                    placeholder="Write a supportive reply or constructive feedback..."
                    className="flex-1 rounded-full border border-gray-200 bg-[#f9fafb] px-4 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={() => handleSendReply(post.id)} disabled={saving}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black hover:bg-zinc-800 text-white shrink-0 shadow-2xs"
                  >
                    {saving ? <LoadingSymbol inline inverse label="Sending reply…" /> : <Send className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Post Modal */}
      {isNewPostOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsNewPostOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl relative text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsNewPostOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950 mb-1">
              Start a Community Discussion
            </h2>
            <p className="text-xs text-zinc-500 mb-5">
              Share a breakthrough, ask for critique, or discuss ministry AI workflows.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Discussion Space</label>
                <select
                  value={postSpaceId}
                  onChange={(e) => setPostSpaceId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                >
                  {COMMUNITY_SPACES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Discussion Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. How we decreased sermon carousel turnaround time..."
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Content / Question</label>
                <textarea
                  rows={5}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your thoughts or questions with clarity and respect..."
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <button
                type="submit" disabled={saving}
                className="w-full rounded-full bg-black hover:bg-zinc-800 text-white py-3 text-xs font-semibold transition-colors shadow-2xs mt-2"
              >{saving && <LoadingSymbol inline inverse label="Saving…" />}
                Publish Discussion Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

