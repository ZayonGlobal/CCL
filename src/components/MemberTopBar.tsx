import { roleHome } from '../services/roleHome';
import { BrandLogo } from './BrandLogo';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Shield,
  LogOut,
  MessageCircle,
  Building2,
  LayoutDashboard,
  Globe,
} from 'lucide-react';
import { UserRole } from '../types';
import { ThemeToggle } from './ThemeToggle';

export const MemberTopBar: React.FC = () => {
  const {
    currentUser,
    logout,
    setCurrentView,
    setIsSearchOpen,
    notifications,
    markNotificationRead,
    setIsAssistantOpen,
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="w-full flex items-center justify-between gap-4 py-4 px-6 sm:px-8 border-b border-gray-200/70 bg-[#f7f8fa]">
      <button className="lg:hidden shrink-0" aria-label="CCL dashboard" onClick={() => setCurrentView(roleHome(currentUser.role))}><BrandLogo className="w-24" /></button>
      {/* Search Input Box */}
      <div className="hidden sm:block flex-1 min-w-0 max-w-xl">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center gap-3 rounded-xl bg-[#eeeff2] hover:bg-[#e7e9ed] px-4 py-2.5 text-xs text-zinc-500 transition-colors text-left"
        >
          <Search className="h-4 w-4 text-zinc-500 shrink-0" />
          <span className="truncate">Search for courses, resources, or topics...</span>
          <kbd className="hidden sm:inline-block ml-auto rounded bg-white px-2 py-0.5 text-[10px] font-mono text-zinc-500 shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      <button className="sm:hidden p-2" aria-label="Search CCL" onClick={() => setIsSearchOpen(true)}><Search className="h-4 w-4" /></button>
      {/* Right Controls: Bell Notification & User Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Night Mode Theme Toggle */}
        <ThemeToggle variant="icon" />

        {/* CCL Assistant Quick Trigger */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-black transition-colors"
          title="Open CCL Assistant"
        >
          <MessageCircle className="h-4 w-4 text-amber-600" />
          <span>Assistant</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-full text-zinc-700 hover:text-black hover:bg-black/[0.04] transition-colors focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl z-50">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                <span className="text-xs font-bold text-zinc-900">Notifications</span>
                <span className="text-[11px] text-zinc-500">{unreadCount} unread</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.targetView) setCurrentView(n.targetView);
                      setNotifOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-900">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{n.time}</span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-0.5 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Signed-in profile */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 rounded-full p-1 pr-2 hover:bg-black/[0.04] transition-colors focus:outline-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.firstName}
              className="h-8 w-8 rounded-full object-cover border border-gray-300"
            />
            <span className="text-sm font-medium text-zinc-900">{currentUser.firstName}</span>
            <ChevronDown className="h-4 w-4 text-zinc-600" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-zinc-900">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-[11px] text-zinc-500 truncate">{currentUser.email}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-amber-700">
                  <span>Level: {currentUser.learningLevel}</span>
                  <span>·</span>
                  <span className="uppercase">{currentUser.role.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="py-1 text-xs text-zinc-700">
                <button
                  onClick={() => {
                    setCurrentView('profile');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 text-left"
                >
                  <User className="h-3.5 w-3.5 text-zinc-500" />
                  <span>View Creator Profile</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('teams');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 text-left"
                >
                  <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Team Requests</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('public_home');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 text-left"
                >
                  <Globe className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Switch to Public Website</span>
                </button>
                {['instructor','administrator','super_admin'].includes(currentUser.role) && <button onClick={() => { setCurrentView('instructor'); setUserDropdownOpen(false); }} className="w-full px-3 py-2 text-left font-semibold rounded-lg hover:bg-zinc-100">Instructor Studio</button>}
                {(currentUser.role === 'administrator' ||
                  currentUser.role === 'super_admin') && (
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 text-amber-800 font-semibold text-left"
                  >
                    <Shield className="h-3.5 w-3.5 text-amber-600" />
                    <span>Admin Operations Console</span>
                  </button>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100 mt-1">
                <button
                  onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 text-xs font-medium text-left"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

