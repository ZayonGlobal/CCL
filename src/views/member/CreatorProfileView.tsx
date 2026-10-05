import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  MapPin,
  Mail,
  Shield,
  Briefcase,
  Flame,
  Award,
  ExternalLink,
  Edit3,
  Check,
  Lock,
  Eye,
  CheckCircle2,
} from 'lucide-react';


export const CreatorProfileView: React.FC = () => {
  const { currentUser, updateCurrentUser, projects, navigateWithParam } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [headline, setHeadline] = useState(currentUser.headline);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [availFreelance, setAvailFreelance] = useState(currentUser.availableForFreelance);
  const [availMinistry, setAvailMinistry] = useState(currentUser.availableForMinistry);
  const [availCollab, setAvailCollab] = useState(currentUser.availableForCollaboration);

  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    const saved = await updateCurrentUser({
      headline,
      bio,
      location,
      availableForFreelance: availFreelance,
      availableForMinistry: availMinistry,
      availableForCollaboration: availCollab,
    });
    setSaving(false);
    if (saved) setIsEditing(false);
  };

  const publicProjects = projects.filter((p) => p.creator.id === currentUser.id);

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto text-zinc-900">
      {/* Privacy Notice Banner */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-2">
          {currentUser.isPublicProfile ? (
            <Eye className="h-4 w-4 text-zinc-900" />
          ) : (
            <Lock className="h-4 w-4 text-zinc-400" />
          )}
          <span className="text-zinc-600">
            Profile Status:{' '}
            <strong className="text-zinc-950 font-semibold">
              Private Profile · Visible to You and Administrators
            </strong>
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-[#f9fafb] hover:bg-gray-100 px-4 py-1.5 text-xs font-semibold text-zinc-800 transition-colors"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="rounded-3xl border border-gray-200/90 bg-white p-7 sm:p-10 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.firstName}
            className="h-24 w-24 rounded-2xl object-cover border-2 border-gray-200 shadow-md shrink-0"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-serif-ccl text-3xl font-bold text-zinc-950">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <span className="rounded-full bg-black text-white text-[10px] font-mono uppercase px-2.5 py-0.5 font-semibold">
                {currentUser.learningLevel}
              </span>
              <span className="rounded-full bg-zinc-100 text-zinc-800 text-[10px] font-mono uppercase px-2.5 py-0.5">
                {currentUser.membershipTier} Member
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 font-medium">{currentUser.headline}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-zinc-700" />
                {currentUser.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-zinc-700" />
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-zinc-700 leading-relaxed">
          <h2 className="font-bold text-zinc-950 font-sans">About & Creative Calling:</h2>
          <p>{currentUser.bio}</p>
        </div>

        {/* Availability tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 text-xs">
          {currentUser.availableForFreelance && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-[11px] text-zinc-800 flex items-center gap-1">
              <Check className="h-3 w-3 text-zinc-900" />
              <span>Available for Freelance</span>
            </span>
          )}
          {currentUser.availableForMinistry && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-[11px] text-zinc-800 flex items-center gap-1">
              <Check className="h-3 w-3 text-zinc-900" />
              <span>Church Media Volunteer</span>
            </span>
          )}
          {currentUser.availableForCollaboration && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-[11px] text-zinc-800 flex items-center gap-1">
              <Check className="h-3 w-3 text-zinc-900" />
              <span>Open to Collaborations</span>
            </span>
          )}
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Update Profile Details</h2>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] p-2.5 text-zinc-900 focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] p-2.5 text-zinc-900 focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Bio</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] p-2.5 text-zinc-900 focus:outline-none focus:border-black resize-none"
              />
            </div>

            <div className="space-y-2 pt-2">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availFreelance}
                  onChange={(e) => setAvailFreelance(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span>Available for Freelance Contracts</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availMinistry}
                  onChange={(e) => setAvailMinistry(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span>Available for Church Media Departments</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-full border border-gray-200 px-5 py-2 text-xs font-semibold text-zinc-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave} disabled={saving}
                className="rounded-full bg-black hover:bg-zinc-800 px-6 py-2 text-xs font-semibold text-white transition-colors shadow-2xs"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Public Projects Showcase */}
      <div className="space-y-4">
        <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950">
          Your Portfolio Projects ({publicProjects.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {publicProjects.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl border border-gray-200/80 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              <img src={p.cover} alt={p.title} className="h-44 w-full object-cover" />
              <div className="p-5 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                  {p.type}
                </span>
                <h3 className="font-serif-ccl text-lg font-bold text-zinc-950">{p.title}</h3>
                <p className="text-zinc-600 line-clamp-2">{p.description}</p>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-zinc-900 hover:underline pt-2"
                  >
                    <span>View Live Deliverable</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
