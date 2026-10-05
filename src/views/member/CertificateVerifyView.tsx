import React from 'react';
import { useApp } from '../../context/AppContext';
import { CERTIFICATES } from '../../data/seedData';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Share2,
  ArrowLeft,
  Lock,
} from 'lucide-react';

export const CertificateVerifyView: React.FC = () => {
  const { selectedCertificateId, setCurrentView } = useApp();

  const cert =
    CERTIFICATES.find((c) => c.certificateId === selectedCertificateId) ||
    CERTIFICATES[0];

  return (
    <div className="space-y-8 pb-20 max-w-3xl mx-auto text-zinc-900">
      <button
        onClick={() => setCurrentView('growth')}
        className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to My Growth</span>
      </button>

      {/* Official Certificate Verification Card */}
      <div className="rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Top Seal & Verification Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="font-serif-ccl text-3xl font-bold tracking-tight text-black leading-none">
              CCL
            </div>
            <div>
              <span className="font-serif-ccl text-base font-bold text-zinc-950 block">
                Christian Creator Lab
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Official Credential Verification Registry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>VERIFIED VALID CREDENTIAL</span>
          </div>
        </div>

        {/* Certificate Center Parchment */}
        <div className="py-8 text-center space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
            CERTIFICATE OF VERIFIED MASTERY
          </div>

          <div className="text-sm text-zinc-600">This credential certifies that</div>

          <h1 className="font-serif-ccl text-3xl sm:text-5xl font-bold text-zinc-950">
            {cert.recipientName}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
            has successfully completed all project milestones, rigorous prompt engineering evaluations,
            and mentor reviews in:
          </p>

          <div className="p-4 rounded-2xl bg-[#f9fafb] border border-gray-200 inline-block mx-auto max-w-lg">
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">
              {cert.courseOrPathTitle}
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              Curriculum Track: {cert.certificationType}
            </p>
          </div>
        </div>

        {/* Verified Criteria Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-gray-100 py-6 text-xs">
          <div className="flex items-center gap-2 text-zinc-800">
            <CheckCircle2 className="h-4 w-4 text-zinc-950 shrink-0" />
            <span>100% Lessons Completed</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800">
            <CheckCircle2 className="h-4 w-4 text-zinc-950 shrink-0" />
            <span>Deliverables Evaluated</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800">
            <CheckCircle2 className="h-4 w-4 text-zinc-950 shrink-0" />
            <span>Doctrinal Safety Vetted</span>
          </div>
        </div>

        {/* Verification Registry Details & Signatures */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center sm:text-left font-mono">
            <div className="text-[11px] text-zinc-500">
              Certificate ID: <strong className="text-zinc-900">{cert.certificateId}</strong>
            </div>
            <div className="text-[11px] text-zinc-500">
              Issue Date: {cert.issueDate} · Verification Protocol v2.4
            </div>
          </div>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 text-white px-6 py-2.5 text-xs font-semibold transition-colors shadow-2xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Verified Credential</span>
          </button>
        </div>
      </div>
    </div>
  );
};
