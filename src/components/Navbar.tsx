import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  ChevronDown,
  LayoutDashboard,
  User,
  LogOut,
  Sparkles,
  Search,
} from 'lucide-react';
import { UserRole } from '../types';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isAuthenticated,
    currentUser,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsAssistantOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Navigation links for the public website
  const navLinks: { label: string; view: AppView }[] = [
    { label: 'Home', view: 'public_home' },
    { label: '10 Labs', view: 'public_labs' },
    { label: 'Programs', view: 'public_courses' },
    { label: 'Membership', view: 'public_membership' },
    { label: 'Churches', view: 'public_churches' },
    { label: 'About', view: 'public_about' },
  ];

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md transition-colors text-zinc-900">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Brand Logo - Matching Screenshot Exactly */}
        <button
          onClick={() => handleNav('public_home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <span className="font-serif-ccl text-3xl font-bold tracking-tight text-black leading-none">
            CCL
          </span>
          <div className="flex flex-col">
            <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-zinc-800 uppercase leading-tight">
              CHRISTIAN
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-zinc-800 uppercase leading-tight">
              CREATOR LAB
            </span>
          </div>
        </button>

        {/* Center Nav Links - Matching Screenshot */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.view)}
              className={`transition-colors hover:text-black ${
                currentView === link.view
                  ? 'text-black font-semibold'
                  : 'text-zinc-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions - Matching Screenshot: Black Pill Button "Join CCL →" */}
        <div className="flex items-center gap-3">
          {/* Night Mode Theme Toggle */}
          <ThemeToggle variant="icon" />

          {/* Quick link to Member Dashboard if authenticated */}
          {isAuthenticated && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-black px-3 py-2 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-zinc-800" />
              <span>Dashboard</span>
            </button>
          )}

          {/* Primary CTA: "Join CCL →" black pill button */}
          <button
            onClick={() => {
              if (isAuthenticated) {
                setCurrentView('dashboard');
              } else {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }
            }}
            className="rounded-full bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>{isAuthenticated ? 'Enter Lab →' : 'Join CCL →'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-6 py-5 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.view)}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentView === link.view ? 'text-black font-bold' : 'text-zinc-600'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2">
            <ThemeToggle variant="menu-item" />
          </div>

          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  handleNav('dashboard');
                } else {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }
                setMobileMenuOpen(false);
              }}
              className="w-full rounded-full bg-black py-3 text-xs font-semibold text-white text-center"
            >
              {isAuthenticated ? 'Open Member Dashboard →' : 'Join CCL →'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
