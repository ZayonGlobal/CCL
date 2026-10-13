import { roleHome } from '../services/roleHome';
import { BrandLogo } from './BrandLogo';
import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Home,
  BookOpen,
  Radio,
  LayoutGrid,
  BarChart2,
  Sparkles,
  Users,
  Building2,
  Shield,
  Layers,
  Award,
  Globe,
  FolderGit2,
  Bookmark,
  Briefcase,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const AppSidebar: React.FC = () => {
  const { currentView, setCurrentView, currentUser, setIsAssistantOpen } = useApp();

  const primaryNavItems: { label: string; view: AppView; icon: React.ElementType }[] = [
    { label: 'Workspace', view: roleHome(currentUser.role), icon: Home },
    { label: 'Learn', view: 'learn', icon: BookOpen },
    { label: 'Live', view: 'live', icon: Radio },
    { label: 'Labs', view: 'labs', icon: LayoutGrid },
    { label: 'Growth', view: 'growth', icon: BarChart2 },
  ];

  const secondaryNavItems: { label: string; view: AppView; icon: React.ElementType }[] = [
    { label: 'Projects', view: 'projects', icon: FolderGit2 },
    { label: 'Resources', view: 'resources', icon: Bookmark },
    { label: 'Opportunities', view: 'opportunities', icon: Briefcase },
    { label: 'Public Site', view: 'public_home', icon: Globe },
    { label: 'Challenges', view: 'challenges', icon: Award },
    { label: 'Community', view: 'community', icon: Users },
    { label: 'Church Team', view: 'teams', icon: Building2 },
  ];

  const isAdministrator =
    currentUser.role === 'administrator' ||
    currentUser.role === 'super_admin';

  return (
    <aside className="hidden lg:flex w-60 flex-col justify-between bg-[#0e0f12] text-white p-6 select-none shrink-0 h-screen sticky top-0 overflow-y-auto border-r border-[#1a1c22]">
      <div className="space-y-6">
        {/* Top Branding - Matching Screenshot */}
        <button aria-label="CCL dashboard" className="rounded-lg py-3" onClick={() => setCurrentView(roleHome(currentUser.role))}>
          <BrandLogo inverse className="w-40" />
        </button>

        {/* Primary Navigation - Matching 5 items in image */}
        <nav className="space-y-2">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            // Check active state
            const isActive =
              (item.view === roleHome(currentUser.role) && currentView === roleHome(currentUser.role)) ||
              (item.view === 'learn' && (currentView === 'learn' || currentView === 'course_player' || currentView === 'course_detail')) ||
              (item.view === 'live' && currentView === 'live') ||
              ((item.view === 'labs' || item.view === 'public_labs') && (currentView === 'labs' || currentView === 'public_labs' || currentView === 'resources' || currentView === 'prompts' || currentView === 'tools')) ||
              (item.view === 'growth' && (currentView === 'growth' || currentView === 'profile' || currentView === 'verify_certificate'));

            return (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                className={`group flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#23252a] text-white shadow-sm'
                    : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-white' : 'text-[#9496a1] group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="pt-4 border-t border-zinc-800/60 space-y-1">
          <div className="px-4 pb-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            Explore CCL
          </div>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-white/[0.08]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {isAdministrator && <button onClick={() => setCurrentView('instructor')} className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${currentView === 'instructor' ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5'}`}>Instructor Studio</button>}

        </div>
      </div>

      {/* Bottom Controls: Theme Toggle & Assistant Quick Button */}
      <div className="pt-5 border-t border-zinc-800/60 space-y-3">
        <ThemeToggle variant="menu-item" className="bg-[#15171e] border-zinc-800 hover:bg-[#1c1f28]" />

        <button
          onClick={() => setIsAssistantOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 px-3 py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Ask CCL Assistant</span>
        </button>
      </div>
    </aside>
  );
};

