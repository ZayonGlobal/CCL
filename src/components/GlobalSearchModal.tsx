import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  BookOpen,
  Trophy,
  Bookmark,
  Terminal,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { LABS, AI_TOOLS } from '../data/seedData';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    courses,
    prompts,
    resources,
    challenges,
    navigateWithParam,
  } = useApp();

  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedCourses = courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.shortDesc.toLowerCase().includes(q)
    );
    const matchedPrompts = prompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.promptText.toLowerCase().includes(q)
    );
    const matchedResources = resources.filter(
      (r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
    const matchedChallenges = challenges.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
    const matchedLabs = LABS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.shortDesc.toLowerCase().includes(q)
    );
    const matchedTools = AI_TOOLS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.useCase.toLowerCase().includes(q)
    );

    return {
      courses: matchedCourses,
      prompts: matchedPrompts,
      resources: matchedResources,
      challenges: matchedChallenges,
      labs: matchedLabs,
      tools: matchedTools,
    };
  }, [query, courses, prompts, resources, challenges]);

  if (!isSearchOpen) return null;

  const handleSelect = (action: () => void) => {
    action();
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-gray-200/90 bg-white p-5 shadow-2xl overflow-hidden text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-100 pb-3">
          <Search className="h-5 w-5 text-zinc-400 absolute left-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, lessons, prompts, AI tools, challenges..."
            autoFocus
            className="w-full bg-transparent pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-8 text-zinc-400 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <kbd className="absolute right-1 hidden sm:inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto pt-3 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center space-y-3">
              <Search className="h-8 w-8 text-zinc-400 mx-auto" />
              <p className="text-xs text-zinc-500">
                Type keywords like <span className="font-semibold text-zinc-800 font-mono">"church media"</span>,{' '}
                <span className="font-semibold text-zinc-800 font-mono">"easter"</span>, or{' '}
                <span className="font-semibold text-zinc-800 font-mono">"midjourney"</span>...
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {['Church Easter Campaign', 'AI Foundations', 'Sermon Recaps', 'Vibe Coding', 'Make.com'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-700 hover:bg-zinc-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              {/* Courses */}
              {results.courses.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-zinc-400 font-semibold px-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Courses ({results.courses.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.courses.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect(() => navigateWithParam('course_player', c.id))}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-zinc-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="h-10 w-14 rounded-lg object-cover grayscale"
                          />
                          <div>
                            <p className="text-xs font-semibold text-zinc-900">{c.title}</p>
                            <p className="text-[10px] text-zinc-500 font-mono">
                              {c.labName} · {c.durationMinutes} mins
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {results.challenges.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-zinc-400 font-semibold px-2">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Challenges ({results.challenges.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.challenges.map((ch) => (
                      <div
                        key={ch.id}
                        onClick={() => handleSelect(() => navigateWithParam('challenge_detail', ch.id))}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-zinc-50 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-zinc-900">{ch.title}</p>
                          <p className="text-[10px] text-zinc-500">Deadline: {ch.deadline}</p>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded font-semibold">
                          View Brief →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompts */}
              {results.prompts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-zinc-400 font-semibold px-2">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Prompt Recipes ({results.prompts.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.prompts.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(() => navigateWithParam('prompts', p.id))}
                        className="p-2.5 rounded-2xl hover:bg-zinc-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-zinc-900">
                          <span>{p.title}</span>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">{p.category}</span>
                        </div>
                        <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5">{p.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results notice */}
              {results.courses.length === 0 &&
                results.challenges.length === 0 &&
                results.prompts.length === 0 &&
                results.resources.length === 0 && (
                  <div className="py-8 text-center text-xs text-zinc-500">
                    No results found for <span className="font-semibold text-zinc-900 font-mono">"{query}"</span>.
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

