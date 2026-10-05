import React, { useState } from 'react';
import { OPPORTUNITIES } from '../../data/seedData';
import {
  Briefcase,
  Globe,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { Opportunity } from '../../types';

export const OpportunitiesView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const filteredOpportunities = OPPORTUNITIES.filter((opp) => {
    if (filterType !== 'all' && opp.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApply = (id: string) => {
    setAppliedId(id);
    setTimeout(() => setAppliedId(null), 3500);
  };

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          Kingdom Opportunities & Roles
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          Church & Kingdom Career Board
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
          Verified ministry postings, freelance contracts, and church media positions seeking
          stewards of AI, visual excellence, and digital craft.
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
            placeholder="Search roles, church names, or skills..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] pl-9 pr-4 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {['all', 'full-time', 'freelance', 'contract', 'volunteer'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`rounded-full px-3.5 py-1.5 font-medium capitalize whitespace-nowrap transition-colors ${
                filterType === t
                  ? 'bg-black text-white font-semibold shadow-xs'
                  : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
              }`}
            >
              {t === 'all' ? 'All Roles' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="font-semibold text-zinc-900 capitalize">{opp.type.replace('_', ' ')}</span>
                <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[10px]">
                  {opp.remoteStatus}
                </span>
              </div>

              <div>
                <h3 className="font-serif-ccl text-xl font-bold text-zinc-950">{opp.title}</h3>
                <p className="text-xs text-zinc-600 font-medium mt-0.5">{opp.organization}</p>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {opp.location}
                </span>
                <span className="text-zinc-900 font-semibold">{opp.compensation}</span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">{opp.description}</p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {opp.skills.map((s: string, i: number) => (
                  <span
                    key={i}
                    className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-700 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">
                Deadline: {opp.deadline}
              </span>
              <button
                onClick={() => handleApply(opp.id)}
                className="rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-2xs"
              >
                {appliedId === opp.id ? 'Application Sent ✓' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
