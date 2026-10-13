const MentorDashboardView = React.lazy(() => import('./views/mentor/MentorDashboardView').then(m => ({ default: m.MentorDashboardView })));
import { LoadingSymbol } from './components/LoadingSymbol';
import { ChannelPopup } from './components/ChannelPopup';
import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MemberTopBar } from './components/MemberTopBar';
import { AppSidebar } from './components/AppSidebar';
import { AppBottomNav } from './components/AppBottomNav';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AssistantDrawer } from './components/AssistantDrawer';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';

// Public views
const PublicHome = React.lazy(() => import('./views/public/PublicHome').then(m => ({ default: m.PublicHome })));
const PublicAbout = React.lazy(() => import('./views/public/PublicAbout').then(m => ({ default: m.PublicAbout })));
const PublicLabs = React.lazy(() => import('./views/public/PublicLabs').then(m => ({ default: m.PublicLabs })));
const PublicCourses = React.lazy(() => import('./views/public/PublicCourses').then(m => ({ default: m.PublicCourses })));
const PublicMembership = React.lazy(() => import('./views/public/PublicMembership').then(m => ({ default: m.PublicMembership })));
const PublicChurches = React.lazy(() => import('./views/public/PublicChurches').then(m => ({ default: m.PublicChurches })));
const PublicFAQ = React.lazy(() => import('./views/public/PublicFAQ').then(m => ({ default: m.PublicFAQ })));
const PublicContact = React.lazy(() => import('./views/public/PublicFAQ').then(m => ({ default: m.PublicContact })));

const PublicCommunity = React.lazy(() => import('./views/public/PublicCommunity').then(m => ({ default: m.PublicCommunity })));
const PublicResources = React.lazy(() => import('./views/public/PublicResources').then(m => ({ default: m.PublicResources })));

// Member views
const DashboardView = React.lazy(() => import('./views/member/DashboardView').then(m => ({ default: m.DashboardView })));
const LearnView = React.lazy(() => import('./views/member/LearnView').then(m => ({ default: m.LearnView })));
const LabsView = React.lazy(() => import('./views/member/LabsView').then(m => ({ default: m.LabsView })));
const CourseDetailView = React.lazy(() => import('./views/member/CourseDetailView').then(m => ({ default: m.CourseDetailView })));
const CoursePlayerView = React.lazy(() => import('./views/member/CoursePlayerView').then(m => ({ default: m.CoursePlayerView })));
const LiveView = React.lazy(() => import('./views/member/LiveView').then(m => ({ default: m.LiveView })));
const ChallengesView = React.lazy(() => import('./views/member/ChallengesView').then(m => ({ default: m.ChallengesView })));
const ChallengeDetailView = React.lazy(() => import('./views/member/ChallengeDetailView').then(m => ({ default: m.ChallengeDetailView })));
const ProjectsView = React.lazy(() => import('./views/member/ProjectsView').then(m => ({ default: m.ProjectsView })));
const CommunityView = React.lazy(() => import('./views/member/CommunityView').then(m => ({ default: m.CommunityView })));
const ResourcesView = React.lazy(() => import('./views/member/ResourcesView').then(m => ({ default: m.ResourcesView })));
const PromptLibraryView = React.lazy(() => import('./views/member/PromptLibraryView').then(m => ({ default: m.PromptLibraryView })));
const AIToolsView = React.lazy(() => import('./views/member/AIToolsView').then(m => ({ default: m.AIToolsView })));
const OpportunitiesView = React.lazy(() => import('./views/member/OpportunitiesView').then(m => ({ default: m.OpportunitiesView })));
const MyGrowthView = React.lazy(() => import('./views/member/MyGrowthView').then(m => ({ default: m.MyGrowthView })));
const CreatorProfileView = React.lazy(() => import('./views/member/CreatorProfileView').then(m => ({ default: m.CreatorProfileView })));
const TeamsView = React.lazy(() => import('./views/member/TeamsView').then(m => ({ default: m.TeamsView })));
const CertificateVerifyView = React.lazy(() => import('./views/member/CertificateVerifyView').then(m => ({ default: m.CertificateVerifyView })));

// Admin views
const InstructorDashboardView = React.lazy(() => import('./views/instructor/InstructorDashboardView').then(m => ({ default: m.InstructorDashboardView })));
const AdminDashboardView = React.lazy(() => import('./views/admin/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));

export const AppContent: React.FC = () => {
  const { currentView, isAuthenticated, theme, authLoading, dataLoading, dataError, setDataError, courses, challenges, currentUser, selectedCourseId } = useApp();

  const isPublicPage = currentView.startsWith('public_') || !isAuthenticated;
  if (authLoading || (!isPublicPage && dataLoading)) return <div role="status" className="min-h-screen flex items-center justify-center bg-white text-zinc-700"><LoadingSymbol label="Loading your Creator Lab…" /></div>;

  const renderView = () => {
    if (!isPublicPage && !isAuthenticated) return <PublicHome />;
    if (['course_detail', 'course_player'].includes(currentView) && !courses.length)
      return <div className="bg-white border rounded-3xl p-8"><h1 className="text-2xl font-serif-ccl">Courses are coming soon</h1><p className="mt-2 text-sm">Published courses will appear here.</p></div>;
    const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
    if (currentView === 'course_player' && !selectedCourse?.modules.some(m => m.lessons.length))
      return <div className="bg-white border rounded-3xl p-8"><h1 className="text-2xl font-serif-ccl">Lessons are coming soon</h1><p className="mt-2 text-sm">This course has no published lessons yet.</p></div>;
    if (currentView === 'challenge_detail' && !challenges.length)
      return <div className="bg-white border rounded-3xl p-8">No challenges are open yet.</div>;
    if (currentView === 'mentor' && !['mentor','administrator','super_admin'].includes(currentUser.role)) return <div>Mentor access is required.</div>;
    if (currentView === 'instructor' && !['instructor','administrator','super_admin'].includes(currentUser.role)) return <div>Instructor access is required.</div>;
    if (currentView === 'admin' && !['administrator','super_admin'].includes(currentUser.role))
      return <div className="bg-white border rounded-3xl p-8">Administrator access is required.</div>;
    switch (currentView) {
      // Public Pages
      case 'public_home':
        return <PublicHome />;
      case 'public_about':
        return <PublicAbout />;
      case 'public_labs':
        return <PublicLabs />;
      case 'public_courses':
        return <PublicCourses />;
      case 'public_community':
        return <PublicCommunity />;
      case 'public_resources':
        return <PublicResources />;
      case 'public_membership':
        return <PublicMembership />;
      case 'public_churches':
        return <PublicChurches />;
      case 'public_faq':
        return <PublicFAQ />;
      case 'public_contact':
        return <PublicContact />;

      // Member Pages
      case 'mentor':
        return <MentorDashboardView />;
      case 'dashboard':
        return <DashboardView />;
      case 'learn':
        return <LearnView />;
      case 'labs':
        return <LabsView />;
      case 'course_detail':
        return <CourseDetailView />;
      case 'course_player':
        return <CoursePlayerView />;
      case 'live':
        return <LiveView />;
      case 'challenges':
        return <ChallengesView />;
      case 'challenge_detail':
        return <ChallengeDetailView />;
      case 'projects':
        return <ProjectsView />;
      case 'community':
        return <CommunityView />;
      case 'resources':
        return <ResourcesView />;
      case 'prompts':
        return <PromptLibraryView />;
      case 'tools':
        return <AIToolsView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'growth':
        return <MyGrowthView />;
      case 'profile':
        return <CreatorProfileView />;
      case 'teams':
        return <TeamsView />;
      case 'verify_certificate':
        return <CertificateVerifyView />;

      // Admin Pages
      case 'instructor':
        return <InstructorDashboardView />;
      case 'admin':
        return <AdminDashboardView />;

      default:
        return <PublicHome />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'dark bg-[#090a0f] text-[#f8fafc]' : 'bg-[#fcfcfd] text-zinc-900'
      } flex flex-col font-sans selection:bg-black selection:text-white transition-colors duration-200`}
    >
      {dataError && <div role="alert" className="fixed top-4 left-4 right-4 z-[70] max-w-xl mx-auto rounded-2xl bg-white border border-rose-200 p-4 shadow-lg text-sm text-rose-800 flex justify-between gap-4"><span>{dataError}</span><button aria-label="Dismiss message" onClick={() => setDataError('')}>×</button></div>}
      {isPublicPage ? (
        // Public Layout
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <React.Suspense fallback={<div className="flex justify-center py-20"><LoadingSymbol label="Opening your Creator Lab…"/></div>}>{renderView()}</React.Suspense>
          </main>
          <Footer />
        </div>
      ) : (
        // Member Layout with responsive Sidebar & Bottom Nav matching screenshot
        <div className="flex min-h-screen w-full bg-[#f7f8fa] dark:bg-[#090a0f]">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0 bg-[#f7f8fa] dark:bg-[#090a0f] text-zinc-900 dark:text-[#f8fafc]">
            <MemberTopBar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              <React.Suspense fallback={<div className="flex justify-center py-20"><LoadingSymbol label="Opening your Creator Lab…"/></div>}>{renderView()}</React.Suspense>
            </main>
          </div>
          <AppBottomNav />
        </div>
      )}

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <AssistantDrawer />
      <AuthModal />
      <OnboardingModal />
      <ChannelPopup />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}

