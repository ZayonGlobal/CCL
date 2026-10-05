import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  Search,
  CheckCircle2,
  Terminal,
  Shield,
} from 'lucide-react';
import { PromptItem } from '../../types';

export const PromptLibraryView: React.FC = () => {
  const { prompts, toggleSavePrompt, bookmarks, toggleBookmark } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Social media',
    'Image generation',
    'Church communication',
    'Business',
    'Writing',
    'Video',
    'Design',
    'Productivity',
  ];

  const filteredPrompts = prompts.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.promptText.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          Vetted Prompt Engineering Architecture
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          CCL Prompt Recipe Library
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
          Tested, production-grade prompt templates engineered for Christian creative workflows,
          sermon recaps, branding packages, and generative imagery.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-4 space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="relative">
          <Search className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts by keyword, model, or use case..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] pl-9 pr-4 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-3.5 py-1.5 font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`rounded-full px-3.5 py-1.5 font-medium whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-black text-white font-semibold shadow-xs'
                  : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrompts.map((p) => {
          const isSaved = bookmarks.has(p.id);
          const isCopied = copiedId === p.id;

          return (
            <div
              key={p.id}
              className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="font-semibold text-zinc-900 uppercase">{p.category}</span>
                  <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded font-mono text-[10px]">
                    {p.toolRecommendation}
                  </span>
                </div>

                <h3 className="font-serif-ccl text-xl font-bold text-zinc-950">{p.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{p.purpose}</p>

                {/* Prompt Code Block */}
                <div className="relative rounded-2xl bg-[#f9fafb] border border-gray-200 p-4 font-mono text-xs text-zinc-800 leading-relaxed group">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold pb-2 border-b border-gray-200 mb-2">
                    Prompt Recipe
                  </div>
                  <p className="whitespace-pre-wrap select-all font-mono text-[11px] text-zinc-800">
                    {p.promptText}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleBookmark(p.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved ? 'text-black bg-zinc-100' : 'text-zinc-400 hover:text-black'
                  }`}
                  title="Save prompt"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-black' : ''}`} />
                </button>

                <button
                  onClick={() => handleCopy(p.id, p.promptText)}
                  className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-2xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied Recipe!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Recipe</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
