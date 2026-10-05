import React, { useState } from 'react';
import { AI_TOOLS } from '../../data/seedData';
import {
  ExternalLink,
  Search,
  Star,
  CheckCircle2,
  Tv,
  Filter,
} from 'lucide-react';
import { AITool } from '../../types';

export const AIToolsView: React.FC = () => {
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Design',
    'Video',
    'Writing',
    'Development',
    'Audio',
    'Productivity',
    'Automation',
  ];

  const filteredTools = AI_TOOLS.filter((t) => {
    if (selectedPricing !== 'all' && t.pricingType !== selectedPricing) return false;
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.useCase.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          Curated Software Catalog
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          AI Tools Directory for Believers
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
          Tested and recommended creative intelligence software. Each tool includes realistic ratings,
          pricing clarity, and recommended Kingdom use cases.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-4 space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="relative">
          <Search className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI software by name or use case..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] pl-9 pr-4 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
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

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-zinc-500 font-mono text-[11px]">Pricing:</span>
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="rounded-lg border border-gray-200 bg-[#f9fafb] px-2.5 py-1.5 text-zinc-800 focus:outline-none text-xs"
            >
              <option value="all">All Models</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="font-semibold text-zinc-900 uppercase">{tool.category}</span>
                <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                  {tool.pricingType}
                </span>
              </div>

              <h3 className="font-serif-ccl text-xl font-bold text-zinc-950">{tool.name}</h3>

              <div className="flex items-center gap-1.5 text-xs text-zinc-700 font-medium">
                <Star className="h-4 w-4 text-zinc-900 fill-zinc-900" />
                <span>{tool.cclRating} / 5.0</span>
                <span className="text-zinc-400 font-mono">({tool.pricingType})</span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">{tool.description}</p>

              {/* Recommended Kingdom Use Case */}
              <div className="p-3 rounded-2xl bg-[#f9fafb] border border-gray-100 space-y-1 text-xs">
                <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                  Recommended Kingdom Application
                </div>
                <p className="text-zinc-700 leading-tight">{tool.useCase}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-zinc-500">
                {tool.freeTier ? 'Free tier available' : 'Paid subscription'}
              </span>
              <a
                href={tool.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-semibold text-zinc-900 hover:underline"
              >
                <span>Visit Tool</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
