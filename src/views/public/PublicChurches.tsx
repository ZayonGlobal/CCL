import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  Send,
  Layers,
} from 'lucide-react';
import { DEMO_ORGANIZATION } from '../../data/seedData';

export const PublicChurches: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setAuthModalMode } = useApp();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [churchName, setChurchName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [volunteerCount, setVolunteerCount] = useState('5-10');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              CHURCHES & MINISTRIES × LOCAL CONGREGATIONS
            </div>

            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              Equip Your Entire <br />
              <span className="italic font-normal">Media Department.</span> <br />
              For Sunday & Beyond.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Centralized team seats, assigned learning tracks, volunteer SOP templates, and progress
              monitoring for local churches, ministry networks, and media directors.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Request Church Team Seats</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('teams')}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <span>Preview Church Portal</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"
                alt="Church Media Production"
                className="h-full w-full object-cover grayscale contrast-115 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “AI carries the operational weight so pastors and media volunteers can carry each other.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">— MINISTRY MANDATE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS RIBBON */}
      <section className="border-y border-gray-200/90 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Building2 className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">150+ CHURCHES</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  TRAINING VOLUNTEERS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Clock className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">48HR TO 2HR</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  RECAP TURNAROUND
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <ShieldCheck className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">100% GUARDRAILS</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  DOCTRINAL RIGOR
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">FLEXIBLE SEATS</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  EASY REASSIGNMENT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CASE STUDY: CSMC ORISUN IBUKUN */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
                <Building2 className="h-4 w-4 text-zinc-900" />
                <span>Featured Church Implementation</span>
              </div>

              <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                {DEMO_ORGANIZATION.name}
              </h2>
              <p className="text-xs font-mono text-zinc-500">
                {DEMO_ORGANIZATION.denominationOrTag}
              </p>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                By equipping their volunteer media team through Christian Creator Lab's Ministry and
                Design Labs, CSMC Orisun Ibukun reduced turnaround time for Sunday service recap carousels
                from 48 hours to under 2 hours, while training youth volunteers in ethical prompt
                engineering and church visual branding.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 border-y border-gray-100 py-4 text-center">
                <div>
                  <div className="text-2xl font-bold font-serif-ccl text-zinc-950">8 Seats</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Volunteers Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif-ccl text-zinc-950">74%</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Track Completion</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif-ccl text-zinc-950">4 Labs</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Assigned Paths</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('teams')}
                  className="rounded-full bg-black px-6 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>Preview CSMC Orisun Ibukun Portal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Volunteer Roster Card Preview */}
            <div className="lg:col-span-5 rounded-2xl border border-gray-200 bg-[#f9fafb] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-xs font-bold text-zinc-950 font-sans">Volunteer Active Roster</span>
                <span className="text-[10px] font-mono text-zinc-600 font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded">
                  15 Seats License
                </span>
              </div>

              <div className="space-y-2.5">
                {DEMO_ORGANIZATION.members.slice(0, 4).map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200/80 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-7 w-7 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-900 shrink-0 font-serif-ccl">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-zinc-900 truncate">{member.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono truncate">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded font-semibold shrink-0">
                      {member.coursesCompleted} Courses · {member.hoursLearned} hrs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR CORE ADVANTAGES FOR CHURCH MEDIA */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-6">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
          WHY CHURCHES PARTNER WITH CCL
        </div>
        <h2 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mb-8">
          Built for the Unique Realities of Ministry
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Clock,
              title: 'Fast Sunday Turnaround',
              desc: 'Empower your volunteers to transform 60-minute sermons into 3-slide carousels and highlight reels before Monday morning.',
            },
            {
              icon: BookOpen,
              title: 'Standardized SOPs',
              desc: 'Stop starting from scratch when media volunteers rotate. Plug them into structured, proven CCL church media pipelines.',
            },
            {
              icon: ShieldCheck,
              title: 'Strict Theological Safety',
              desc: 'We train volunteers to verify Bible translations and preserve doctrinal context rather than generating misleading AI images.',
            },
            {
              icon: Users,
              title: 'Seat Reassignment',
              desc: 'Volunteer changes? No problem. Admins can reassign member licenses anytime with one click in the church portal.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3"
            >
              <item.icon className="h-6 w-6 text-zinc-900" />
              <h3 className="font-bold text-base text-zinc-950">{item.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CHURCH INQUIRY / CONSULTATION FORM */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 pt-6">
        <div className="rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              CHURCH CONSULTATION
            </div>
            <h2 className="font-serif-ccl text-3xl font-bold text-zinc-950">
              Request Team Seats for Your Church
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Our church partnership leads will design an onboarding pathway tailored to your denomination,
              volunteer size, and current media workflow.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-8 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-zinc-900 mx-auto" />
              <h3 className="font-serif-ccl text-xl font-bold text-zinc-950">Inquiry Received</h3>
              <p className="text-xs text-zinc-600 max-w-md mx-auto">
                Thank you! Our church partnership coordinator will contact {contactEmail || 'you'} within 24 hours with custom seat pricing and pilot access.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Church / Organization Name</label>
                  <input
                    type="text"
                    required
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    placeholder="e.g. Grace Community Church"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Media Director / Pastor Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Pastor John Doe"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Work Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="media@church.org"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Active Volunteers in Media</label>
                  <select
                    value={volunteerCount}
                    onChange={(e) => setVolunteerCount(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  >
                    <option value="1-5">1 - 5 Volunteers</option>
                    <option value="5-10">5 - 10 Volunteers</option>
                    <option value="10-25">10 - 25 Volunteers</option>
                    <option value="25+">25+ Volunteers (Network License)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="rounded-full bg-black px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Church Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 text-center pt-10">
        <div className="rounded-3xl bg-zinc-950 text-white p-10 sm:p-16 space-y-6 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            CHURCH MEDIA REVOLUTION
          </div>

          <h2 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Elevate Your Church's Visual Ministry
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Equip your church media servants with high-standard creative skills and theological discernment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
              className="rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-black hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Get Started for Free →
            </button>
            <button
              onClick={() => setCurrentView('teams')}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Explore CSMC Team Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
