import { MembershipTier } from '../types';

export interface MembershipPlanConfig {
  id: MembershipTier;
  name: string;
  badge: string;
  monthlyPriceUSD: number;
  annualPriceUSD: number;
  currencySymbol: string;
  shortDescription: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlanConfig[] = [
  {
    id: 'free',
    name: 'Free Starter',
    badge: 'Explorer Tier',
    monthlyPriceUSD: 0,
    annualPriceUSD: 0,
    currencySymbol: '$',
    shortDescription: 'Core foundation for Christians exploring AI with discernment and purpose.',
    features: [
      'Access to foundational starter courses',
      'Responsible AI for Christians track',
      'Curated starter prompt recipes',
      'Access to selected YouTube Live streams',
      'Public community reading & general discussions',
      'Standard learner profile',
    ],
    ctaText: 'Get Started Free',
    highlighted: false,
  },
  {
    id: 'creator',
    name: 'Creator',
    badge: 'Most Popular for Artists & Church Teams',
    monthlyPriceUSD: 19,
    annualPriceUSD: 190,
    currencySymbol: '$',
    shortDescription: 'For graphic designers, video editors, writers, and church media servants.',
    features: [
      'Full access to Design Lab, Video Lab & Content Lab',
      'Participation in all Monthly Creator Challenges',
      'Complete prompt library & design templates',
      'Submission reviews in challenge galleries',
      'Verified CCL Creator Certificates upon passing criteria',
      'Priority live Q&A in YouTube Live sessions',
    ],
    ctaText: 'Join Creator Tier',
    highlighted: true,
  },
  {
    id: 'builder',
    name: 'Builder',
    badge: 'For Solution Builders & Automators',
    monthlyPriceUSD: 39,
    annualPriceUSD: 390,
    currencySymbol: '$',
    shortDescription: 'Everything in Creator plus Web & Build Lab, Automation Lab, and digital products.',
    features: [
      'Everything in Creator tier',
      'Full access to Web & Build Lab & Automation Lab',
      'Vibe coding frameworks & church portal blueprints',
      'Make.com & Zapier workflow scenario downloads',
      'Interactive project reviews & case study showcasing',
      'Verified Builder Certificate track',
    ],
    ctaText: 'Upgrade to Builder',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Professional',
    badge: 'Career & Agency Growth',
    monthlyPriceUSD: 79,
    annualPriceUSD: 790,
    currencySymbol: '$',
    shortDescription: 'For ethical freelancers, creative agency founders, and senior professionals.',
    features: [
      'Everything in Builder tier',
      'Full access to Business Lab & Creator Growth Lab',
      'Bi-weekly live mentor office hours & portfolio audits',
      'Access to curated client & ministry opportunities',
      'Commercial client proposal & contract templates',
      'Verified CCL Pro badge on public creator profile',
    ],
    ctaText: 'Enroll in Professional',
    highlighted: false,
  },
  {
    id: 'teams',
    name: 'Churches & Teams',
    badge: 'Churches, NGOs & Schools',
    monthlyPriceUSD: 149,
    annualPriceUSD: 1490,
    currencySymbol: '$',
    shortDescription: 'Equip your entire media department, volunteer staff, or ministry team.',
    features: [
      'Includes up to 10 active team member seats',
      'Dedicated Church / Team Management Dashboard',
      'Assign custom learning tracks and monitor completion',
      'Church-wide AI policy template & consultation call',
      'Centralized billing & invoice management',
      'Direct contact with CCL curriculum leads',
    ],
    ctaText: 'Equip Your Church Team',
    highlighted: false,
  },
];
