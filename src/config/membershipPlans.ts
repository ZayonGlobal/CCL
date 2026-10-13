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

// CCL currently offers one free tier; no subscription plans are advertised.
export const MEMBERSHIP_PLANS: MembershipPlanConfig[] = [{
  id: 'free', name: 'Free CCL account', badge: 'Currently free',
  monthlyPriceUSD: 0, annualPriceUSD: 0, currencySymbol: '₦',
  shortDescription: 'Learn, practise, and connect with Christian creators.',
  features: ['Personal learning workspace', 'Member community discussions', 'Free public guides and prompt builder', 'AI Bible and creative resources in the WhatsApp channel'],
  ctaText: 'Start free',
}];
