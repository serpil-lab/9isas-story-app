import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import StoryGenerator from './components/StoryGenerator';
import AuthPage from './components/AuthPage';
import LibraryPage from './components/LibraryPage';
import VerificationPendingPage from './components/VerificationPendingPage';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';

export type View = 'landing' | 'auth' | 'generator' | 'library' | 'verify-email';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const navigateTo = (newView: View) => {
    if (!user && (newView === 'generator' || newView === 'library')) {
      setView('auth');
    } else {
      setView(newView);
    }
  };
  
  React.useEffect(() => {
    if (user && view === 'auth') {
        setView('generator');
    }
    if (!user && (view === 'generator' || view === 'library')) {
        setView('landing');
    }
  }, [user, view]);


  if (user && !user.emailVerified) {
    return <VerificationPendingPage />;
  }

  const renderContent = () => {
    switch (view) {
      case 'auth':
        return <AuthPage onAuthSuccess={() => navigateTo('generator')} />;
      case 'generator':
        return <StoryGenerator onNavigate={navigateTo} />;
      case 'library':
        return <LibraryPage onNavigate={navigateTo} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return renderContent();
};

export default App;