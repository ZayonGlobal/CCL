import { LabAvailability, isLabOpen } from '../../components/LabAvailability';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LABS } from '../../data/seedData';
import {
  Layers,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  Award,
  Filter,
  Bookmark,
  Terminal,
} from 'lucide-react';

export const LabsView: React.FC = () => {
  const { courses, setCurrentView, navigateWithParam } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 10 Labs' },
    { id: 'creative', label: 'Design & Visual' },
    { id: 'technical', label: 'Web & Automation' },
    { id: 'ministry', label: 'Ministry & Church' },
    { id: 'leadership', label: 'Business & Growth' },
  ];

  const filteredLabs = LABS.filter((lab) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'creative') {
      return ['design', 'video', 'content'].includes(lab.id);
    }
    if (activeCategory === 'technical') {
      return ['ai-foundations', 'web-build', 'automation'].includes(lab.id);
    }
    if (activeCategory === 'ministry') {
      return ['ministry', 'leadership'].includes(lab.id);
    }
    if (activeCategory === 'leadership') {
      return ['business', 'growth', 'leadership'].includes(lab.id);
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
          10 Specialized Focus Tracks
        </div>
        <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          Curriculum Learning Labs
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
          Start with AI Foundations. Our other nine specialized learning labs are coming soon.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors ${
              activeCategory === c.id
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLabs.map((lab) => {
          const labCourses = courses.filter((c) => c.labId === lab.id);
          const completedCount = labCourses.filter((c) => (c.progressPercent || 0) >= 100).length;

          return (
            <div
              key={lab.id}
              className="relative isolate overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest bg-zinc-100 text-zinc-800 font-bold px-3 py-1 rounded-full">
                    Level: {lab.level}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-zinc-500">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{labCourses.length} Courses</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-ccl text-2xl font-bold text-zinc-950">{lab.name}</h3>
                
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                    {lab.description}
                  </p>
                </div>

                {/* Progress bar if any completed or enrolled */}
                {isLabOpen(lab.id) && labCourses.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1.5">
                      <span>Lab Progress</span>
                      <span>
                        {completedCount} of {labCourses.length} Completed
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 rounded-full transition-all"
                        style={{
                          width: `${(completedCount / Math.max(labCourses.length, 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {lab.skillsTaught.map((skill: string, sIdx: number) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono bg-zinc-50 border border-zinc-200/70 text-zinc-700 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between gap-3">
                <button
                  disabled={!isLabOpen(lab.id)}
                  onClick={() => setCurrentView('learn')}
                  className="disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>{isLabOpen(lab.id) ? 'Explore Courses' : 'Coming soon'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  disabled={!isLabOpen(lab.id)}
                  onClick={() => setCurrentView('prompts')}
                  className="disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-black transition-colors"
                >
                  <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Prompt Kits</span>
                </button>
              </div>
              <LabAvailability id={lab.id} name={lab.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

