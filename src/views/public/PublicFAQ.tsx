import React, { useState } from 'react';
import { LoadingSymbol } from '../../components/LoadingSymbol';
import { saveInquiry } from '../../services/data';
import { errorMessage } from '../../services/supabase';
import { CheckCircle2, Mail, MessageSquare, Users, Send } from 'lucide-react';
import { PublicPage, PublicActions } from './PublicContent';
const faqs = [
  ['Who is CCL for?', 'Christians who want to use AI for creative work: beginners, designers, writers, video creators, church media volunteers, and people building businesses. You do not need a coding background to start with AI Foundations.'],
  ['Which labs can I use now?', 'AI Foundations is the open lab. The other nine specialist labs are coming soon. Course pages show their own lesson content and access requirements.'],
  ['Where do I get the AI Bible?', 'Join the Christian Creator Lab WhatsApp channel using the link on this website. The free AI Bible and loads of other helpful AI and creative resources are in the channel.'],
  ['How do I create an account?', 'Choose Create a free account, enter your details and matching passwords, then enter the verification code sent to your email. Your dashboard opens after your email is verified. Check your spam folder if the email is missing.'],
  ['Does AI replace prayer or studying Scripture?', 'No. Use AI as a tool for drafting, organising, and creative work. Check Bible quotations in your chosen translation, review teaching carefully, and keep spiritual discernment and pastoral responsibility with people.'],
  ['Are all AI tools free?', 'Different tools have their own access limits and pricing. A CCL account does not include subscriptions to external AI services. Check a tool’s own terms before paying or uploading sensitive information.'],
  ['Can I buy a subscription here?', 'Paid membership packages are not available for purchase on this page. We will publish programme details, costs, and access terms when they are ready.'],
  ['Can my church learn as a team?', 'Send us your church or organisation name, team size, and the skills you want to develop. This is an enquiry, not an automatic booking or activation of team seats.'],
  ['Will I receive a certificate?', 'Do not assume that registration or watching a video earns a certificate. Any course offering a certificate should state its assessment and completion requirements on its course page.'],
  ['How do I get help?', 'Email cclabsupport@gmail.com, call or WhatsApp +234 806 168 8292, or use our contact form. If you forget your password, use Forgot password on the sign-in screen.']
];
export const PublicFAQ: React.FC = () => <PublicPage eyebrow="Questions and answers" title="A few things to know before you start." intro="Straightforward answers about joining CCL, the open lab, free resources, and responsible AI use.">
  <div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-gray-200 bg-white p-6"><summary className="cursor-pointer font-semibold">{question}</summary><p className="text-sm text-zinc-600 leading-relaxed mt-4 max-w-3xl">{answer}</p></details>)}</div>
  <PublicActions secondary="public_contact" label="Contact CCL" />
</PublicPage>;

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
            <div className="rounded-3xl border bg-white p-7 space-y-3"><Users className="h-6 w-6"/><h3 className="font-serif-ccl text-xl font-bold">Join our WhatsApp channel</h3><p className="text-sm text-zinc-600">Get the free AI Bible, other creative resources, AI tips, and learning updates.</p><a className="inline-block rounded-full bg-black text-white px-5 py-3 text-sm font-semibold" href="https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i" target="_blank" rel="noopener noreferrer">Follow the channel →</a></div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-zinc-900 mx-auto" />
                <h3 className="font-serif-ccl text-2xl font-bold text-zinc-950">Thank you for reaching out</h3>
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
                      placeholder="Your full name"
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
                      placeholder="you@example.com"
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
                    <option value="Church Media Partnership">Church or team learning enquiry</option>
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

