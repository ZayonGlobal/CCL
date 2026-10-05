export type UserRole =
  | 'student'
  | 'mentor'
  | 'instructor'
  | 'organization_admin'
  | 'administrator'
  | 'super_admin';

export type LearningLevel =
  | 'Explorer'
  | 'Creator'
  | 'Builder'
  | 'Professional'
  | 'Kingdom Leader';

export type MembershipTier =
  | 'free'
  | 'creator'
  | 'builder'
  | 'pro'
  | 'teams';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: UserRole;
  membershipTier: MembershipTier;
  learningLevel: LearningLevel;
  headline: string;
  bio: string;
  country: string;
  location: string;
  organizationName?: string;
  isChurchMediaTeamMember: boolean;
  primaryInterests: string[];
  skillsToLearn: string[];
  streakDays: number;
  longestStreak: number;
  hoursLearned: number;
  isPublicProfile: boolean;
  availableForFreelance: boolean;
  availableForMinistry: boolean;
  availableForCollaboration: boolean;
  portfolioWebsite?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export type LabId =
  | 'ai-foundations'
  | 'design'
  | 'video'
  | 'content'
  | 'web-build'
  | 'automation'
  | 'ministry'
  | 'business'
  | 'creator-growth'
  | 'leadership';

export interface Lab {
  id: LabId;
  name: string;
  shortDesc: string;
  description: string;
  iconName: string;
  courseCount: number;
  studentCount: number;
  topics: string[];
  skillsTaught: string[];
  level: LearningLevel;
  highlightColor: string;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'prompt' | 'link' | 'template' | 'download';
  url?: string;
  content?: string;
  size?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  durationMinutes: number;
  transcript: string;
  notes: string;
  resources: LessonResource[];
  assignment?: {
    title: string;
    brief: string;
    deliverables: string[];
  };
  freePreview?: boolean;
  order: number;
  completed?: boolean;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  thumbnail: string;
  labId: LabId;
  labName: string;
  level: LearningLevel;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  lessonCount: number;
  membershipAccess: MembershipTier;
  learningOutcomes: string[];
  prerequisites: string[];
  published: boolean;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  modules: Module[];
  projectsOverview: string;
  faq: { q: string; a: string }[];
  isEnrolled?: boolean;
  progressPercent?: number;
}

export interface LiveSession {
  id: string;
  title: string;
  cover: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  date: string;
  timeString: string;
  countdownTarget: string; // ISO date
  youtubeVideoId: string;
  isLiveNow: boolean;
  isReplay: boolean;
  description: string;
  objectives: string[];
  resources: LessonResource[];
  discussionCount: number;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  cover: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  creativeBrief: string;
  deliverables: string[];
  rules: string[];
  recommendedTools: string[];
  learningResources: string[];
  startDate: string;
  deadline: string;
  deadlineIso: string;
  submissionRequirements: string[];
  judgingCriteria: string[];
  participantsCount: number;
  status: 'active' | 'upcoming' | 'judging' | 'completed';
  winnerAnnounced?: boolean;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    headline: string;
    level: LearningLevel;
  };
  title: string;
  description: string;
  toolsUsed: string[];
  liveUrl?: string;
  videoUrl?: string;
  images: string[];
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'winner' | 'honorable_mention' | 'approved';
  mentorFeedback?: {
    mentorName: string;
    avatar: string;
    comment: string;
    evaluatedAt: string;
    rating: number;
  };
  reactions: {
    cheer: number;
    fire: number;
    insightful: number;
  };
}

export interface Project {
  id: string;
  title: string;
  cover: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    headline: string;
  };
  type: 'course_project' | 'challenge_submission' | 'personal' | 'mentor_assigned';
  description: string;
  projectBrief: string;
  toolsUsed: string[];
  images: string[];
  videoUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
  status: 'draft' | 'submitted' | 'needs_revision' | 'approved' | 'featured';
  mentorFeedback?: string;
  isPublic: boolean;
  courseId?: string;
  challengeId?: string;
  createdAt: string;
}

export interface CommunitySpace {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  iconName: string;
}

export type PostCategory =
  | 'Question'
  | 'Feedback'
  | 'Showcase'
  | 'Resource'
  | 'Discussion'
  | 'Opportunity'
  | 'Testimony'
  | 'Collaboration';

export interface Post {
  id: string;
  spaceId: string;
  spaceName: string;
  category: PostCategory;
  author: {
    id: string;
    name: string;
    avatar: string;
    headline: string;
    role: UserRole;
    isMentor?: boolean;
    isInstructor?: boolean;
  };
  title: string;
  content: string;
  images?: string[];
  projectUrl?: string;
  resourceUrl?: string;
  createdAt: string;
  isPinned?: boolean;
  commentsCount: number;
  reactions: {
    helpful: number;
    pray: number;
    inspired: number;
    celebrate: number;
  };
  bookmarked?: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    headline: string;
    isMentor?: boolean;
  };
  content: string;
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category:
    | 'Prompts'
    | 'Templates'
    | 'AI Tools'
    | 'Workflows'
    | 'Checklists'
    | 'Downloads'
    | 'Guides'
    | 'Church Media'
    | 'Business'
    | 'Design'
    | 'Video'
    | 'Web'
    | 'Automation';
  tags: string[];
  author: string;
  accessLevel: MembershipTier;
  linkUrl?: string;
  downloadName?: string;
  contentPreview?: string;
  isBookmarked?: boolean;
}

export interface PromptItem {
  id: string;
  title: string;
  category:
    | 'Design'
    | 'Image generation'
    | 'Video'
    | 'Writing'
    | 'Ministry'
    | 'Business'
    | 'Branding'
    | 'Web development'
    | 'Research'
    | 'Social media'
    | 'Productivity'
    | 'Church communication';
  purpose: string;
  toolRecommendation: string;
  promptText: string;
  usageGuide: string;
  exampleOutput: string;
  tags: string[];
  saved?: boolean;
  approvedByMentor?: string;
}

export interface AITool {
  id: string;
  name: string;
  logo: string;
  category:
    | 'Design'
    | 'Video'
    | 'Writing'
    | 'Development'
    | 'Audio'
    | 'Productivity'
    | 'Automation';
  description: string;
  useCase: string;
  website: string;
  pricingType: 'Free' | 'Freemium' | 'Paid';
  freeTier: boolean;
  platform: string;
  recommendedFor: string;
  cclRating: number; // e.g. 4.9
  tutorialAvailable: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type:
    | 'freelance'
    | 'full-time'
    | 'contract'
    | 'internship'
    | 'volunteer'
    | 'church_media'
    | 'ministry'
    | 'collaboration'
    | 'competition'
    | 'ccl_project';
  location: string;
  remoteStatus: 'Remote' | 'Hybrid' | 'On-site';
  description: string;
  skills: string[];
  compensation: string;
  deadline: string;
  applicationUrl: string;
  verifiedStatus: boolean;
}

export interface Certificate {
  id: string;
  certificateId: string;
  recipientName: string;
  recipientEmail: string;
  recipientAvatar?: string;
  courseOrPathTitle: string;
  certificationType:
    | 'CCL AI Foundations Certificate'
    | 'CCL AI Creator Certificate'
    | 'CCL Church Media AI Specialist'
    | 'CCL AI Builder'
    | 'CCL Certified Creator';
  issueDate: string;
  verificationUrl: string;
  skillsVerified: string[];
  mentorSignature: string;
}

export interface UserSkill {
  name: string;
  category: string;
  level: 'beginner' | 'developing' | 'proficient' | 'advanced';
  percentage: number;
  completedProjectsCount: number;
  hoursPracticed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  earnedAt?: string;
  category: 'learning' | 'challenge' | 'community' | 'project';
}

export interface OrganizationTeam {
  id: string;
  name: string;
  denominationOrTag: string;
  leadPastorOrDirector: string;
  logo: string;
  plan: 'Teams';
  seatsAllocated: number;
  seatsUsed: number;
  completionRate: number;
  assignedLabs: LabId[];
  members: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    coursesCompleted: number;
    hoursLearned: number;
    status: 'Active' | 'Invited';
  }[];
}
