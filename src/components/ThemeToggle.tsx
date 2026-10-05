import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'icon' | 'pill' | 'menu-item';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all border ${
          isDark
            ? 'bg-[#181b26] border-white/20 text-amber-300 hover:bg-[#202534] hover:border-amber-400/40 shadow-xs'
            : 'bg-white border-gray-200 text-zinc-700 hover:bg-zinc-50 hover:text-black hover:border-zinc-300 shadow-2xs'
        } ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to high-contrast night mode'}
        title={isDark ? 'Switch to day mode' : 'Switch to night mode (reduces eye strain)'}
      >
        {isDark ? (
          <>
            <Sun className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Night Mode</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
          </>
        ) : (
          <>
            <Moon className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
            <span>Night Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'menu-item') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        className={`flex w-full items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
          isDark
            ? 'bg-[#181b26] border-white/15 text-white hover:bg-[#202534]'
            : 'bg-white border-gray-200 text-zinc-800 hover:bg-zinc-50'
        } ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to high-contrast night mode'}
      >
        <div className="flex items-center gap-2.5">
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-700" />
          )}
          <div className="text-left">
            <span className="font-semibold block">Night-Time Display</span>
            <span className="text-[10px] text-zinc-400 block">
              {isDark ? 'High-contrast dark active' : 'Standard light active'}
            </span>
          </div>
        </div>

        {/* Toggle track indicator */}
        <div
          className={`w-10 h-5 rounded-full p-0.5 transition-colors relative ${
            isDark ? 'bg-amber-500' : 'bg-zinc-300'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              isDark ? 'translate-x-5 shadow-xs' : 'translate-x-0'
            }`}
          />
        </div>
      </button>
    );
  }

  // Default 'icon' variant
  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all border ${
        isDark
          ? 'bg-[#181b26] border-white/15 text-amber-300 hover:bg-[#222738] hover:border-amber-400/50 shadow-xs'
          : 'bg-white border-gray-200 text-zinc-700 hover:bg-zinc-100 hover:text-black hover:border-zinc-300 shadow-2xs'
      } ${className}`}
      aria-label={isDark ? 'Switch to day mode' : 'Switch to night-time high-contrast mode'}
      title={isDark ? 'Switch to day mode' : 'Switch to night mode (high-contrast, eye strain relief)'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-zinc-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};
