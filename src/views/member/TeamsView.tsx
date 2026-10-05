import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_ORGANIZATION, LABS } from '../../data/seedData';
import {
  Building2,
  Users,
  CheckCircle2,
  Plus,
  Mail,
  Award,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  X,
} from 'lucide-react';

export const TeamsView: React.FC = () => {
  const [org, setOrg] = useState(DEMO_ORGANIZATION);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Volunteer Designer');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [assignedLabs, setAssignedLabs] = useState<string[]>(org.assignedLabs);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setOrg((prev) => ({
      ...prev,
      seatsUsed: Math.min(prev.seatsAllocated, prev.seatsUsed + 1),
      members: [
        ...prev.members,
        {
          id: `usr_invited_${Date.now()}`,
          name: inviteEmail.split('@')[0],
          role: inviteRole,
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          coursesCompleted: 0,
          hoursLearned: 0,
          status: 'Invited',
        },
      ],
    }));

    setInviteEmail('');
    setIsInviteOpen(false);
  };

  const toggleLabAssignment = (labId: string) => {
    setAssignedLabs((prev) =>
      prev.includes(labId) ? prev.filter((id) => id !== labId) : [...prev, labId]
    );
  };

  return (
    <div className="space-y-8 pb-16 text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            <Building2 className="h-4 w-4 text-zinc-900" />
            <span>Church Media Teams & Organizations</span>
          </div>
          <h1 className="font-serif-ccl text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            {org.name} Portal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
            {org.denominationOrTag} · Centralized volunteer training dashboard, assigned labs, and
            Sunday service turnaround monitoring.
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-black hover:bg-zinc-800 px-5 py-2.5 text-xs font-semibold text-white transition-colors shadow-2xs"
        >
          <Plus className="h-4 w-4" />
          <span>Invite Media Volunteer</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Team Seat Allocation</span>
          <div className="text-3xl font-bold font-serif-ccl text-zinc-950">
            {org.seatsUsed} <span className="text-sm font-sans font-normal text-zinc-400">/ {org.seatsAllocated} Seats</span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            {org.seatsAllocated - org.seatsUsed} active licenses available to assign
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Avg Volunteer Progress</span>
          <div className="text-3xl font-bold font-serif-ccl text-zinc-950">
            74%
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            Sunday recap workflows mastered
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Assigned Lab Tracks</span>
          <div className="text-3xl font-bold font-serif-ccl text-zinc-950">
            {assignedLabs.length} Labs
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            Active department curricula
          </p>
        </div>
      </div>

      {/* Assigned Labs Checklist Section */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Assigned Department Learning Tracks</h2>
          <p className="text-xs text-zinc-500">
            Volunteers invited to this organization are automatically enrolled into these selected labs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {LABS.map((lab) => {
            const isAssigned = assignedLabs.includes(lab.id);
            return (
              <button
                key={lab.id}
                onClick={() => toggleLabAssignment(lab.id)}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${
                  isAssigned
                    ? 'border-black bg-zinc-50 text-black font-semibold'
                    : 'border-gray-200 bg-white text-zinc-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase opacity-75">{lab.level}</span>
                  {isAssigned && <CheckCircle2 className="h-3.5 w-3.5 text-black" />}
                </div>
                <span className="block truncate">{lab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Volunteer Active Roster */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="font-serif-ccl text-xl font-bold text-zinc-950">Volunteer Active Roster</h2>
            <p className="text-xs text-zinc-500">
              Manage team members, view completed courses, and track hours practiced.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {org.members.length} Total Registered
          </span>
        </div>

        <div className="space-y-3">
          {org.members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f9fafb] border border-gray-100 text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-9 w-9 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="font-bold text-zinc-950">{member.name}</p>
                  <p className="text-[11px] text-zinc-500">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-zinc-600 text-[11px]">
                <div>
                  <span>Courses: </span>
                  <strong className="text-zinc-950">{member.coursesCompleted}</strong>
                </div>
                <div>
                  <span>Hours: </span>
                  <strong className="text-zinc-950">{member.hoursLearned}h</strong>
                </div>
                <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsInviteOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl relative text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsInviteOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif-ccl text-2xl font-bold text-zinc-950 mb-1">
              Invite Media Volunteer
            </h2>
            <p className="text-xs text-zinc-500 mb-5">
              Assign a license from {org.name}'s seat pool.
            </p>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Volunteer Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="volunteer@church.org"
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700">Team Role / Responsibilities</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-black"
                >
                  <option value="Volunteer Graphic Designer">Volunteer Graphic Designer</option>
                  <option value="Volunteer Video Editor">Volunteer Video Editor</option>
                  <option value="Social Media Carousel Director">Social Media Carousel Director</option>
                  <option value="Church Sound & Broadcast Lead">Church Sound & Broadcast Lead</option>
                  <option value="Youth Media Apprentice">Youth Media Apprentice</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-black hover:bg-zinc-800 text-white py-3 text-xs font-semibold transition-colors shadow-2xs mt-2"
              >
                Send Seat Invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
