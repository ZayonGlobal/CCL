import { LoadingSymbol } from '../../components/LoadingSymbol';
import { saveInquiry } from '../../services/data';
import { errorMessage } from '../../services/supabase';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  HelpCircle,
  Mail,
  Building2,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Users,
} from 'lucide-react';

export const PublicFAQ: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setAuthModalMode } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('all');

  const faqs = [
    {
      category: 'theology',
      q: 'Does Christian Creator Lab advocate replacing pastoral ministry or human creativity with AI?',
      a: 'Absolutely not. CCL is grounded in the conviction that God has made human beings in His image (imago Dei) with the unique capacity for relationship, spiritual discernment, prayer, and worship. AI is purely a computational tool. We train believers to use it to eliminate repetitive administrative friction and elevate visual excellence so they can invest more deeply in prayer, study, and human discipleship.',
    },
    {
      category: 'theology',
      q: 'How does CCL handle theological accuracy and Scripture translations?',
      a: 'We teach strict verification protocols. Large language models frequently blend verse numbers or subtly alter theological phrases. In all CCL courses and prompts, students are trained to explicitly declare their Bible translation (e.g., ESV, NIV, CSB) and physically verify every Scripture passage before public dissemination.',
    },
    {
      category: 'courses',
      q: 'Is Christian Creator Lab suitable for complete beginners with zero tech experience?',
      a: 'Yes. Our Level 1 (Explorer) and AI Foundations Lab start from first principles. You do not need to know any programming. We guide you step-by-step through setting up accounts, writing clear prompts, and producing your very first creative asset within hours.',
    },
    {
      category: 'churches',
      q: 'Can our local church or non-profit get seats for our volunteer media team?',
      a: 'Yes. Our "Churches & Teams" plan includes centralized seats, allowing a media director to assign customized learning tracks (e.g., Design Lab for flyer designers, Video Lab for short-form editors) and track team progress in a unified portal. As seen in our CSMC Orisun Ibukun case study, this reduces turnaround times dramatically.',
    },
    {
      category: 'courses',
      q: 'How do certificates work? Can I get certified just by watching videos?',
      a: 'No. CCL certificates require verified practical output. To earn a credential like the "CCL Church Media AI Specialist", learners must submit complete project packages, pass our objective assessment, and receive approval from a designated mentor.',
    },
    {
      category: 'courses',
      q: 'How does the YouTube Live learning system operate?',
      a: 'We leverage YouTube’s high-performance video streaming infrastructure. Live sessions are embedded seamlessly inside CCL alongside live lesson notes, downloadable prompt kits, and real-time class discussions. Replays are permanently archived in your member library.',
    },
    {
      category: 'billing',
      q: 'Can I cancel or switch my membership tier at any time?',
      a: 'Yes, absolutely. You can upgrade, downgrade, or cancel your membership directly inside your account settings at any moment with zero penalty or hidden cancellation fees.',
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
              QUESTIONS & ANSWERS
            </div>

            <h1 className="font-serif-ccl text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
              Clear Answers for <br />
              <span className="italic font-normal">Creators & Leaders.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
              Everything you need to know about our learning philosophy, theological safeguards, team
              licensing, and community guidelines.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Join CCL Today</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentView('public_contact')}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
                alt="Creator reading scripture and learning"
                className="h-full w-full object-cover grayscale contrast-115 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 right-6 left-6 text-right text-white space-y-1 z-10">
                <p className="italic font-serif-ccl text-base sm:text-lg text-zinc-100 leading-snug">
                  “Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.”
                </p>
                <div className="text-zinc-400 text-xs font-mono tracking-widest">— PROVERBS 4:7</div>
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
              <ShieldCheck className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">100% TRANSPARENT</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  DOCTRINAL RIGOR
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Users className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">24/7 COMMUNITY</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  CREATOR GUILD
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center md:border-r border-gray-200">
              <Building2 className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">CHURCH READY</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  TEAM LICENSES
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <HelpCircle className="h-5 w-5 text-zinc-800 shrink-0" />
              <div>
                <div className="text-base font-bold font-sans text-zinc-950">NO LOCK-IN</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  CANCEL ANYTIME
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 pt-6">
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center pb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'theology', label: 'Theology & AI' },
            { id: 'courses', label: 'Courses & Certification' },
            { id: 'churches', label: 'Churches & Teams' },
            { id: 'billing', label: 'Billing & Account' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeTab === cat.id
                  ? 'bg-black text-white shadow-xs'
                  : 'border border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-3.5">
          {filteredFaqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left text-sm sm:text-base font-bold text-zinc-950 hover:text-black"
                >
                  <span className="font-serif-ccl pr-4">{f.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-900 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-gray-100">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered question prompt */}
        <div className="mt-12 rounded-3xl border border-gray-200 bg-[#f9fafb] p-8 text-center space-y-3">
          <h3 className="font-serif-ccl text-xl font-bold text-zinc-950">
            Have a question not addressed here?
          </h3>
          <p className="text-xs text-zinc-600 max-w-md mx-auto">
            Our team is happy to discuss your specific ministry, technological questions, or team requirements.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentView('public_contact')}
              className="rounded-full bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 text-center pt-10">
        <div className="rounded-3xl bg-zinc-950 text-white p-10 sm:p-16 space-y-6 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            JOIN CHRISTIAN CREATOR LAB
          </div>

          <h2 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to Create with Purpose?
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Join thousands of Christian creators, graphic designers, video editors, and church media
            servants using technology with excellence for Kingdom impact.
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
              onClick={() => setCurrentView('public_courses')}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Browse Course Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const PublicContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Church Media Partnership');
  const [message, setMessage] = useState('');

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (saving) return;
    setSaving(true); setFormError('');
    try { await saveInquiry({ name, email, subject, message }); setSubmitted(true); }
    catch (error) { setFormError(errorMessage(error)); }
    finally { setSaving(false); }
  };

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 pb-24 space-y-20 selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase">
            CONNECT & PARTNER
          </div>
          <h1 className="font-serif-ccl text-5xl sm:text-6xl font-bold text-zinc-950 leading-[1.06] tracking-tight">
            Connect with the <br />
            <span className="italic font-normal">CCL Team.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Whether you represent a church media department, have a partnership inquiry, or wish to
            contribute as an instructor, we would love to hear from you.
          </p>
        </div>
      </section>

      {/* 2. CONTACT GRID */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl border bg-white p-7 space-y-3"><Mail className="h-6 w-6"/><h3 className="font-serif-ccl text-xl font-bold">Email support</h3><p className="text-sm text-zinc-600">Questions about learning, partnerships, or teaching at CCL?</p><a className="block text-sm font-semibold underline break-all" href="mailto:cclabsupport@gmail.com">cclabsupport@gmail.com</a></div>
            <div className="rounded-3xl border bg-white p-7 space-y-3"><MessageSquare className="h-6 w-6"/><h3 className="font-serif-ccl text-xl font-bold">Call or WhatsApp</h3><a className="block text-sm font-semibold underline" href="tel:+2348061688292">+234 806 168 8292</a><a className="inline-block text-sm underline" href="https://wa.me/2348061688292" target="_blank" rel="noopener noreferrer">Chat with CCL support →</a></div>
            <div className="rounded-3xl border bg-white p-7 space-y-3"><Users className="h-6 w-6"/><h3 className="font-serif-ccl text-xl font-bold">Join our WhatsApp channel</h3><p className="text-sm text-zinc-600">Follow Christian Creator Lab for AI tips, creative resources, and learning updates.</p><a className="inline-block rounded-full bg-black text-white px-5 py-3 text-sm font-semibold" href="https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i" target="_blank" rel="noopener noreferrer">Follow the channel →</a></div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-zinc-900 mx-auto" />
                <h3 className="font-serif-ccl text-2xl font-bold text-zinc-950">Message Saved Successfully</h3>
                <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Your inquiry is saved for the CCL team to review, with {email} as your contact address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && <p role="alert" className="text-sm text-rose-700">{formError}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-700">Full Name</label>
                    <input
                      id="contact-name" maxLength={150}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="David Shepherd"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-700">Email Address</label>
                    <input
                      id="contact-email" maxLength={254}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="david@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-zinc-700">Inquiry Purpose</label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  >
                    <option value="Church Media Partnership">Church Media Partnership (Seats for Church)</option>
                    <option value="Course Instructor Application">Apply to Teach a Course / Lab</option>
                    <option value="Sponsorship & Challenge Host">Host a Creator Challenge / Sponsor</option>
                    <option value="General Question">General Platform Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-zinc-700">Message</label>
                  <textarea
                    id="contact-message" maxLength={5000}
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can collaborate, serve your church, or assist your creative journey..."
                    className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-xs text-zinc-900 focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={saving}
                  className="rounded-full bg-black px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm inline-flex items-center gap-2"
                >{saving && <LoadingSymbol inline inverse label="Saving…" />}
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

