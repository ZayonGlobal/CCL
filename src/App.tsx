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
import { PublicHome } from './views/public/PublicHome';
import { PublicAbout } from './views/public/PublicAbout';
import { PublicLabs } from './views/public/PublicLabs';
import { PublicCourses } from './views/public/PublicCourses';
import { PublicMembership } from './views/public/PublicMembership';
import { PublicChurches } from './views/public/PublicChurches';
import { PublicFAQ, PublicContact } from './views/public/PublicFAQ';

// Member views
import { DashboardView } from './views/member/DashboardView';
import { LearnView } from './views/member/LearnView';
import { LabsView } from './views/member/LabsView';
import { CourseDetailView } from './views/member/CourseDetailView';
import { CoursePlayerView } from './views/member/CoursePlayerView';
import { LiveView } from './views/member/LiveView';
import { ChallengesView } from './views/member/ChallengesView';
import { ChallengeDetailView } from './views/member/ChallengeDetailView';
import { ProjectsView } from './views/member/ProjectsView';
import { CommunityView } from './views/member/CommunityView';
import { ResourcesView } from './views/member/ResourcesView';
import { PromptLibraryView } from './views/member/PromptLibraryView';
import { AIToolsView } from './views/member/AIToolsView';
import { OpportunitiesView } from './views/member/OpportunitiesView';
import { MyGrowthView } from './views/member/MyGrowthView';
import { CreatorProfileView } from './views/member/CreatorProfileView';
import { TeamsView } from './views/member/TeamsView';
import { CertificateVerifyView } from './views/member/CertificateVerifyView';

// Admin views
import { InstructorDashboardView } from './views/instructor/InstructorDashboardView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';

export const AppContent: React.FC = () => {
  const { currentView, isAuthenticated, theme, authLoading, dataLoading, dataError, setDataError, courses, challenges, currentUser, selectedCourseId } = useApp();

  const isPublicPage = currentView.startsWith('public_') || !isAuthenticated;
  if (authLoading || (!isPublicPage && dataLoading)) return <div role="status" className="min-h-screen flex items-center justify-center bg-white text-zinc-700">Loading your Creator Lab…</div>;

  const renderView = () => {
    if (!isPublicPage && !isAuthenticated) return <PublicHome />;
    if (['course_detail', 'course_player'].includes(currentView) && !courses.length)
      return <div className="bg-white border rounded-3xl p-8"><h1 className="text-2xl font-serif-ccl">Courses are coming soon</h1><p className="mt-2 text-sm">Published courses will appear here.</p></div>;
    const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
    if (currentView === 'course_player' && !selectedCourse?.modules.some(m => m.lessons.length))
      return <div className="bg-white border rounded-3xl p-8"><h1 className="text-2xl font-serif-ccl">Lessons are coming soon</h1><p className="mt-2 text-sm">This course has no published lessons yet.</p></div>;
    if (currentView === 'challenge_detail' && !challenges.length)
      return <div className="bg-white border rounded-3xl p-8">No challenges are open yet.</div>;
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
      case 'public_membership':
        return <PublicMembership />;
      case 'public_churches':
        return <PublicChurches />;
      case 'public_faq':
        return <PublicFAQ />;
      case 'public_contact':
        return <PublicContact />;

      // Member Pages
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
            {renderView()}
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
              {renderView()}
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
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
