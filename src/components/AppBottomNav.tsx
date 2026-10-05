import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Home,
  BookOpen,
  Tv,
  Trophy,
  MoreHorizontal,
  FolderGit2,
  Users,
  Bookmark,
  Briefcase,
  TrendingUp,
  User,
  Building2,
  Shield,
  X,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const AppBottomNav: React.FC = () => {
  const { currentView, setCurrentView, currentUser } = useApp();
  const [moreOpen, setMoreOpen] = useState(false);

  const mainTabs: { label: string; view: AppView; icon: React.ElementType }[] = [
    { label: 'Home', view: 'dashboard', icon: Home },
    { label: 'Learn', view: 'learn', icon: BookOpen },
    { label: 'Live', view: 'live', icon: Tv },
    { label: 'Challenges', view: 'challenges', icon: Trophy },
  ];

  const moreItems: { label: string; view: AppView; icon: React.ElementType }[] = [
    { label: 'Projects', view: 'projects', icon: FolderGit2 },
    { label: 'Community', view: 'community', icon: Users },
    { label: 'Resources & Prompts', view: 'resources', icon: Bookmark },
    { label: 'Opportunities', view: 'opportunities', icon: Briefcase },
    { label: 'My Growth', view: 'growth', icon: TrendingUp },
    { label: 'Creator Profile', view: 'profile', icon: User },
    { label: 'Church / Team', view: 'teams', icon: Building2 },
  ];

  if (
    currentUser.role === 'administrator' ||
    currentUser.role === 'super_admin'
  ) {
    moreItems.push({ label: 'Admin Dashboard', view: 'admin', icon: Shield });
  }

  const handleSelect = (view: AppView) => {
    setCurrentView(view);
    setMoreOpen(false);
  };

  return (
    <>
      {/* More Drawer overlay */}
      {moreOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="w-full rounded-t-3xl border-t border-gray-200 bg-white p-6 shadow-2xl text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm font-bold text-zinc-950 font-serif-ccl">More Ecosystem Sections</span>
              <button
                onClick={() => setMoreOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="pt-3 pb-1">
              <ThemeToggle variant="menu-item" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.view)}
                    className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-[#f9fafb] hover:bg-zinc-100 p-3 text-left text-xs font-medium text-zinc-800 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-zinc-900" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md px-2 py-1.5 flex items-center justify-around text-zinc-600 shadow-md">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.view;

          return (
            <button
              key={tab.label}
              onClick={() => handleSelect(tab.view)}
              className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-black font-bold' : 'text-zinc-500 hover:text-black'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium text-zinc-500 hover:text-black transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span>More</span>
        </button>
      </nav>
    </>
  );
};
