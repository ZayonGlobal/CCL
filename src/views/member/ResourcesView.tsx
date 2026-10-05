import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bookmark,
  Download,
  ExternalLink,
  Search,
  Filter,
  FileText,
  Sparkles,
  Layers,
  Check,
  Tag,
} from 'lucide-react';
import { ResourceItem } from '../../types';

export const ResourcesView: React.FC = () => {
  const { resources, bookmarks, toggleBookmark } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Church Media',
    'Templates',
    'Checklists',
    'Workflows',
    'Business',
    'Automation',
    'Design',
    'Video',
  ];

  const filteredResources = resources.filter((res) => {
    if (selectedCategory !== 'all' && res.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          Curated Downloads & Toolkits
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          CCL Resource Library
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
          Standard operating procedures, Figma/Canva templates, Make.com scenario exports, and
          theological checklists vetted by the Christian Creator Lab curriculum team.
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
            placeholder="Search templates, SOPs, checklists, or prompt kits..."
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

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isSaved = bookmarks.has(res.id);
          return (
            <div
              key={res.id}
              className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                  <span className="uppercase text-zinc-900 font-semibold">{res.category}</span>
                  <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded uppercase text-[10px]">
                    {res.accessLevel}
                  </span>
                </div>

                <h3 className="font-serif-ccl text-xl font-bold text-zinc-950">{res.title}</h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{res.description}</p>

                <div className="mt-4 flex flex-wrap gap-1">
                  {res.tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-700 font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleBookmark(res.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved ? 'text-black bg-zinc-100' : 'text-zinc-400 hover:text-black'
                  }`}
                  title="Bookmark resource"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-black' : ''}`} />
                </button>

                <a
                  href={res.linkUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Toolkit</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
