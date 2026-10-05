import { backend } from './supabase';
import type { UserProfile, UserRole, MembershipTier } from '../types';
import type { User } from '@supabase/supabase-js';

export type CatalogKind = 'course' | 'challenge' | 'resource' | 'prompt' | 'live' | 'opportunity';
export interface CatalogRow { kind: CatalogKind; id: string; payload: any; published: boolean }
export interface DataRecord { id: string; user_id: string; kind: string; target_id: string | null; payload: any; status: string; created_at: string }

// Account roles and membership always come from protected database columns.
export const emptyProfile: UserProfile = {
  id: '', firstName: '', lastName: '', email: '', avatar: '/avatar.svg', role: 'student',
  membershipTier: 'free', learningLevel: 'Explorer', headline: '', bio: '', country: '', location: '',
  isChurchMediaTeamMember: false, primaryInterests: [], skillsToLearn: [], streakDays: 0,
  longestStreak: 0, hoursLearned: 0, isPublicProfile: false,
  availableForFreelance: false, availableForMinistry: false, availableForCollaboration: false,
};

export const profileFields = ['firstName', 'lastName', 'avatar', 'learningLevel', 'headline', 'bio',
  'country', 'location', 'organizationName', 'isChurchMediaTeamMember', 'primaryInterests',
  'skillsToLearn', 'isPublicProfile', 'availableForFreelance', 'availableForMinistry',
  'availableForCollaboration', 'portfolioWebsite', 'githubUrl', 'youtubeUrl', 'linkedinUrl',
  'whyJoining', 'preferredLearningPath'] as const;

export async function loadProfile(user: User) {
  const [profileResult, accountResult] = await Promise.all([
    backend().from('ccl_profiles').select('profile,onboarding_completed').eq('user_id', user.id).single(),
    backend().from('ccl_accounts').select('role,membership_tier').eq('user_id', user.id).single(),
  ]);
  if (profileResult.error) throw profileResult.error;
  if (accountResult.error) throw accountResult.error;
  const account = accountResult.data;
  const profile = profileResult.data;
  const allowed = Object.fromEntries(profileFields.filter(k => k in profile.profile).map(k => [k, profile.profile[k]]));
  return {
    user: { ...emptyProfile, ...allowed, id: user.id, email: user.email || '',
      role: account.role as UserRole, membershipTier: account.membership_tier as MembershipTier },
    onboarded: profile.onboarding_completed,
  };
}

export async function catalog() {
  const { data, error } = await backend().from('ccl_catalog').select('*').order('created_at');
  if (error) throw error;
  return data as CatalogRow[];
}

export async function records() {
  const { data, error } = await backend().from('ccl_records').select('*').order('created_at', { ascending: false }).limit(1000);
  if (error) throw error;
  return data as DataRecord[];
}

export async function insertRecord(userId: string, kind: string, payload: any, targetId?: string, status = 'submitted') {
  const { data, error } = await backend().from('ccl_records').insert({
    user_id: userId, kind, payload, target_id: targetId || null, status,
  }).select('*').single();
  if (error) throw error;
  return data as DataRecord;
}

export async function saveInquiry(input: { name: string; email: string; subject: string; message: string }) {
  const { data, error } = await backend().rpc('ccl_submit_inquiry', {
    p_name: input.name.trim(), p_email: input.email.trim(), p_subject: input.subject,
    p_message: input.message.trim(),
  });
  if (error) throw error;
  return data;
}

export function isAdmin(role: UserRole) { return role === 'administrator' || role === 'super_admin'; }
