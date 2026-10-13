import { BrandLogo } from './BrandLogo';
import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import { ThemeToggle } from './ThemeToggle';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-200 bg-[#f9fafb] text-zinc-600 text-xs">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo className="w-52" />
            <p className="text-xs text-zinc-600 max-w-sm leading-relaxed">
              Equipping Christians to use AI and digital tools for creativity, ministry, business,
              career development, and Kingdom impact. Create with purpose. Build for eternity.
            </p>
            <p className="text-[11px] text-zinc-400 leading-normal max-w-sm">
              AI is a computational tool to steward with wisdom—it never replaces God, Scripture,
              prayer, spiritual discernment, pastoral leadership, or human relationships.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-950 font-bold">
              Programs & Labs
            </div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleNav('public_home')} className="hover:text-black">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_about')} className="hover:text-black">
                  About CCL
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_labs')} className="hover:text-black">
                  10 Learning Labs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_courses')} className="hover:text-black">
                  Course Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('live')} className="hover:text-black">
                  Live learning
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Churches */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-950 font-bold">
              Churches & Guild
            </div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleNav('public_churches')} className="hover:text-black">
                  Church Media Teams
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_churches')} className="hover:text-black">
                  Team learning enquiries
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('challenges')} className="hover:text-black">
                  Creator challenges
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('community')} className="hover:text-black">
                  Creator Guild Community
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_membership')} className="hover:text-black">
                  Membership
                </button>
              </li>
            </ul>
          </div>

          {/* Ethics & Legal */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-950 font-bold">
              Verification & Ethics
            </div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleNav('verify_certificate')} className="hover:text-black">
                  Certificate verification
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_faq')} className="hover:text-black">
                  FAQ & Scripture Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('public_contact')} className="hover:text-black">
                  Contact CCL
                </button>
              </li>
              <li>
                <span className="text-zinc-400">Privacy & Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-4">
            <span>© 2026 Christian Creator Lab (CCL). All rights reserved.</span>
            <ThemeToggle variant="pill" />
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>FAITH</span>
            <span>×</span>
            <span>CREATIVITY</span>
            <span>×</span>
            <span>IMPACT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

