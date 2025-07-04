import React, { useState, useCallback, useEffect } from 'react';
import { StoryParams, GeneratedStory } from '../types';
import { generateStoryAndImage } from '../services/geminiService';
import StoryForm from './StoryForm';
import StoryDisplay from './StoryDisplay';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { View } from '../App';

const initialParams: StoryParams = {
  name: '',
  age: '',
  character: null,
  setting: null,
  moral: null,
  plot: '',
};

interface StoryGeneratorProps {
    onNavigate: (view: View) => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ onNavigate }) => {
  const [params, setParams] = useState<StoryParams>(initialParams);
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, logOut } = useAuth();
  
  useEffect(() => {
    return () => {
        if (story?.localImageUrl) {
            URL.revokeObjectURL(story.localImageUrl);
        }
    }
  }, [story]);


  const handleGenerateStory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStory(null);
    try {
      const result = await generateStoryAndImage(params);
      const localImageUrl = URL.createObjectURL(result.imageBlob);
      setStory({
        id: result.id,
        title: result.title,
        story: result.story,
        imageBlob: result.imageBlob,
        localImageUrl,
      });
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  const handleReset = () => {
    if (story?.localImageUrl) {
        URL.revokeObjectURL(story.localImageUrl);
    }
    setParams(initialParams);
    setStory(null);
    setError(null);
  };
  
  const handleLogout = async () => {
    await logOut();
    onNavigate('landing');
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return (
        <div className="text-center bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl relative animate-fade-in" role="alert">
          <strong className="font-bold">Oh no! Something went wrong.</strong>
          <span className="block sm:inline ml-2">{error}</span>
           <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    if (story) {
      return <StoryDisplay story={story} onReset={handleReset} />;
    }
    return <StoryForm params={params} setParams={setParams} onSubmit={handleGenerateStory} isLoading={isLoading}/>;
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-200">
        <header className="p-4 sm:p-6 flex justify-between items-center container mx-auto">
             <h1 className="text-3xl font-bold text-white font-title cursor-pointer" onClick={() => onNavigate('landing')}>9isas Dashboard</h1>
             <div className="flex items-center gap-4">
                 <button
                    onClick={() => onNavigate('library')}
                    className="px-4 py-2 font-semibold text-gray-300 bg-slate-800/60 rounded-lg hover:bg-slate-700 transition-colors"
                 >
                    My Library
                </button>
                 <button
                    onClick={handleLogout}
                    className="px-4 py-2 font-semibold text-gray-300 bg-red-600/80 rounded-lg hover:bg-red-600 transition-colors"
                 >
                    Logout
                </button>
             </div>
        </header>
        <main className="p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full">
                {renderContent()}
            </div>
        </main>
    </div>
  );
};

export default StoryGenerator;