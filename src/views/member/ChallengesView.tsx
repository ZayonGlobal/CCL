import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Clock,
  Users,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const ChallengesView: React.FC = () => {
  const { challenges, navigateWithParam } = useApp();

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          <Trophy className="h-4 w-4 text-zinc-900" />
          <span>Practical Creator Challenges</span>
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          Apply Your Skills to Real Briefs
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-2xl">
          Challenges are the engine of Christian Creator Lab. Build real assets for churches and
          ministries, receive mentor feedback, expand your portfolio, and compete for Kingdom impact awards.
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((ch) => (
          <div
            key={ch.id}
            className="rounded-3xl border border-gray-200/80 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group shadow-[0_2px_14px_rgba(0,0,0,0.03)]"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                <img
                  src={ch.cover}
                  alt={ch.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-900 font-semibold uppercase">
                  {ch.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono capitalize text-white">
                  {ch.status}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                  <span>{ch.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{ch.participantsCount} Creators Joined</span>
                </div>

                <h2 className="font-serif-ccl text-xl font-bold text-zinc-950 group-hover:text-black transition-colors leading-snug">
                  {ch.title}
                </h2>

                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {ch.description}
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-900 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Due: {ch.deadline}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => navigateWithParam('challenge_detail', ch.id)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-black hover:bg-zinc-800 py-3 text-xs font-semibold text-white transition-colors shadow-2xs"
              >
                <span>View Creative Brief & Submissions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

