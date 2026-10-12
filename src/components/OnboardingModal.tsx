import { LoadingSymbol } from './LoadingSymbol';
import { BrandLogo } from './BrandLogo';
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { LearningLevel } from '../types';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding, currentUser, dataError } = useApp();

  const [step, setStep] = useState(1);

  // 10 Onboarding fields
  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [country, setCountry] = useState(currentUser.country || '');
  const [primaryInterest, setPrimaryInterest] = useState<string>('Church Media & Visual Design');
  const [currentSkillLevel, setCurrentSkillLevel] = useState<LearningLevel>('Explorer');
  const [whyJoining, setWhyJoining] = useState<string>('');
  const [preferredLearningPath, setPreferredLearningPath] = useState<string>('Ministry & Creative Systems');
  const [isChurchMediaTeamMember, setIsChurchMediaTeamMember] = useState<boolean>(false);
  const [organizationName, setOrganizationName] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!isOnboardingOpen) return;
    setStep(1); setFirstName(currentUser.firstName); setLastName(currentUser.lastName);
    setCountry(currentUser.country); setOrganizationName(currentUser.organizationName || '');
  }, [isOnboardingOpen, currentUser.id]);

  if (!isOnboardingOpen) return null;

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFinish = async () => {
    if (saving) return;
    setSaving(true);
    await completeOnboarding({
      firstName,
      lastName,
      primaryInterests: [primaryInterest],
      whyJoining,
      preferredLearningPath,
      country,
      learningLevel: currentSkillLevel,
      organizationName,
      isChurchMediaTeamMember,
      headline: `${preferredLearningPath} | ${organizationName || 'CCL Creator'}`,
      skillsToLearn: selectedSkills,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200/90 bg-white p-7 sm:p-9 shadow-2xl text-zinc-900">
        {/* Progress indicator */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-24 sm:w-32" />
            <div>
              <h2 className="font-serif-ccl text-base font-bold text-zinc-950">
                Personalize Your Creator Lab
              </h2>
              <p className="text-[11px] text-zinc-500 font-mono">Step {step} of 3</p>
            </div>
          </div>

          {/* Stepper Dots */}
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  step === s ? 'w-6 bg-black' : step > s ? 'w-2 bg-zinc-400' : 'w-2 bg-zinc-200'
                }`}
              />
            ))}
          </div>
        </div>

        {dataError && <p role="alert" className="mb-4 text-sm text-rose-700">{dataError}</p>}
        {/* STEP 1: Basic Identity & Church Context */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">Country / Region</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Nigeria, United Kingdom, United States"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-4 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-zinc-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChurchMediaTeamMember}
                  onChange={(e) => setIsChurchMediaTeamMember(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black h-4 w-4"
                />
                <span className="font-semibold">I serve on a church media or creative department</span>
              </label>

              {isChurchMediaTeamMember && (
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-medium text-zinc-600">Church / Ministry Name</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g. CSMC Orisun Ibukun"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 px-6 py-2.5 text-xs font-semibold text-white transition-colors shadow-2xs"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Current Level & Primary Calling */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">Where are you right now?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {(['Explorer', 'Creator', 'Builder', 'Professional', 'Kingdom Leader'] as LearningLevel[]).map(
                  (lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setCurrentSkillLevel(lvl)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        currentSkillLevel === lvl
                          ? 'border-black bg-zinc-50 text-black font-bold'
                          : 'border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lvl}</span>
                        {currentSkillLevel === lvl && <CheckCircle2 className="h-4 w-4 text-black" />}
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">What is your primary focus?</label>
              <select
                value={primaryInterest}
                onChange={(e) => setPrimaryInterest(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black"
              >
                <option value="Church Media & Visual Design">Church Media & Visual Design</option>
                <option value="Short-Form Video & Sermon Recaps">Short-Form Video & Sermon Recaps</option>
                <option value="Vibe Coding & Web Building">Vibe Coding & Web Building</option>
                <option value="Make.com & Automation Pipelines">Make.com & Automation Pipelines</option>
                <option value="Kingdom Business & Freelancing">Kingdom Business & Freelancing</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">Why are you joining CCL?</label>
              <textarea
                rows={2}
                value={whyJoining}
                onChange={(e) => setWhyJoining(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs text-zinc-900 focus:outline-none focus:border-black resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 px-6 py-2.5 text-xs font-semibold text-white transition-colors shadow-2xs"
              >
                <span>Next</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Target Skills to Build */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">
                Select 3 or more skills you want to master:
              </label>
              <p className="text-[11px] text-zinc-500">
                We will personalize your recommended courses and prompt kits based on these choices.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  'Prompt Architecture',
                  'AI Image Direction',
                  'Church Media Systems',
                  'Sermon Recap Reels',
                  'Vibe Coding',
                  'Make.com Pipelines',
                  'Canva AI Workflows',
                  'Ethical Client Pricing',
                  'Theological Fact-Checking',
                  'Team Training SOPs',
                ].map((skill) => {
                  const selected = selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all ${
                        selected
                          ? 'border-black bg-zinc-50 text-black font-semibold'
                          : 'border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate pr-1">{skill}</span>
                      {selected && <CheckCircle2 className="h-3.5 w-3.5 text-black shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-3 text-xs text-zinc-700 space-y-1">
              <div className="font-semibold text-zinc-950 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
                <span>Your Personalized Starting Track:</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                Level: <strong className="text-zinc-900">{currentSkillLevel}</strong> · Labs:{' '}
                <strong className="text-zinc-900">AI Foundations + Design Lab</strong>
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleFinish}
                disabled={saving || !firstName.trim() || !lastName.trim()}
                className="flex items-center gap-2 rounded-full bg-black hover:bg-zinc-800 px-7 py-2.5 text-xs font-semibold text-white transition-colors shadow-2xs"
              >
                {saving && <LoadingSymbol inline inverse label="Saving…" />}<span>{saving ? 'Saving…' : 'Enter Your Creator Lab'}</span>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

