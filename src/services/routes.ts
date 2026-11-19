import type { AppView } from '../context/AppContext';

/**
 * Maps every screen to a real URL so pages can be shared, bookmarked,
 * opened in a new tab and found by search engines, and so the browser's
 * back and forward buttons work inside the site.
 *
 * `:id` segments carry the selected course, challenge or certificate.
 */
const ROUTES: Partial<Record<AppView, string>> = {
  public_home: '/',
  public_about: '/about',
  public_labs: '/labs',
  public_courses: '/courses',
  public_community: '/community',
  public_resources: '/guides',
  public_membership: '/membership',
  public_churches: '/churches',
  public_faq: '/faq',
  public_contact: '/contact',

  dashboard: '/app',
  mentor: '/app/mentor',
  instructor: '/app/instructor',
  admin: '/app/admin',
  learn: '/app/learn',
  labs: '/app/labs',
  course_detail: '/app/courses/:id',
  course_player: '/app/courses/:id/learn',
  live: '/app/live',
  challenges: '/app/challenges',
  challenge_detail: '/app/challenges/:id',
  projects: '/app/projects',
  community: '/app/community',
  resources: '/app/resources',
  prompts: '/app/prompts',
  tools: '/app/tools',
  opportunities: '/app/opportunities',
  growth: '/app/growth',
  profile: '/app/profile',
  teams: '/app/teams',
  verify_certificate: '/app/certificates/:id',
};

const SITE = 'Christian Creator Lab';
const HOME_TITLE = 'Christian Creator Lab (CCL) | AI & Digital Tools for Kingdom Impact';

const TITLES: Partial<Record<AppView, string>> = {
  public_about: 'About CCL',
  public_labs: 'Learning Labs',
  public_courses: 'Courses',
  public_community: 'Creator Community',
  public_resources: 'Free Guides & Tools',
  public_membership: 'Membership',
  public_churches: 'Church Media Teams',
  public_faq: 'FAQ & Scripture Policy',
  public_contact: 'Contact',
  dashboard: 'Dashboard',
  mentor: 'Mentor Workspace',
  instructor: 'Instructor Studio',
  admin: 'Management Dashboard',
  learn: 'Learn',
  labs: 'Labs',
  course_detail: 'Course',
  course_player: 'Lesson',
  live: 'Live Learning',
  challenges: 'Challenges',
  challenge_detail: 'Challenge',
  projects: 'Projects',
  community: 'Community',
  resources: 'Resources',
  prompts: 'Prompt Library',
  tools: 'AI Tools',
  opportunities: 'Opportunities',
  growth: 'My Growth',
  profile: 'Creator Profile',
  teams: 'Teams',
  verify_certificate: 'Certificate Verification',
};

const DESCRIPTIONS: Partial<Record<AppView, string>> = {
  public_home: 'Christian Creator Lab equips Christians to use AI and digital tools for creativity, ministry, business, career development, and Kingdom impact.',
  public_about: 'Learn why Christian Creator Lab exists and how it helps Christians use AI with wisdom, integrity and creativity.',
  public_labs: 'Explore the CCL learning labs. AI Foundations is open now; specialist labs are coming soon.',
  public_courses: 'Start with AI Foundations: understand AI tools, write clearer prompts and review what they produce.',
  public_community: 'Ask questions, share your process and learn alongside other Christian creators.',
  public_resources: 'Free guides and a prompt builder for creative work, church communication and responsible AI habits.',
  public_churches: 'Practical AI learning for church media teams and volunteers. Tell us what your team needs.',
  public_faq: 'Answers to common questions about Christian Creator Lab, including how we handle Scripture and AI.',
  public_contact: 'Contact Christian Creator Lab by WhatsApp or email.',
};

export interface Route { view: AppView; id?: string }

export const isPublicView = (view: AppView) => view.startsWith('public_');

export function pathFor(view: AppView, id?: string | null): string {
  const pattern = ROUTES[view] ?? '/';
  if (!pattern.includes(':id')) return pattern;
  // Without an id the detail screen falls back to its first item, so link to the list.
  if (!id) return view === 'verify_certificate' ? '/app/certificates' : pattern.split('/:id')[0];
  return pattern.replace(':id', encodeURIComponent(id));
}

export function parsePath(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/app/certificates') return { view: 'verify_certificate' };
  for (const [view, pattern] of Object.entries(ROUTES) as [AppView, string][]) {
    const names: string[] = [];
    const regex = new RegExp('^' + pattern.replace(/:id/g, () => { names.push('id'); return '([^/]+)'; }) + '$', 'i');
    const match = clean.match(regex);
    if (match) return { view, id: names.length ? decodeURIComponent(match[1]) : undefined };
  }
  return { view: 'public_home' };
}

export function titleFor(view: AppView, detail?: string): string {
  if (view === 'public_home') return HOME_TITLE;
  const base = detail || TITLES[view];
  return base ? `${base} | ${SITE}` : HOME_TITLE;
}

export const descriptionFor = (view: AppView) => DESCRIPTIONS[view] ?? DESCRIPTIONS.public_home!;
