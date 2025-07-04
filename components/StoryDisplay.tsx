import React from 'react';
import { GeneratedStory } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface StoryDisplayProps {
  story: GeneratedStory;
  onReset: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  const { user, saveStory, savedStories, loading } = useAuth();
  
  const isSaved = savedStories.some(s => s.id === story.id);

  const handleSave = async () => {
    if (isSaved) return;
    try {
      await saveStory(story);
    } catch(e) {
      console.error("Failed to save story", e)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl shadow-purple-900/30 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex-shrink-0">
          <img src={story.localImageUrl} alt={story.title} className="w-full h-auto object-cover rounded-xl shadow-lg shadow-black/50"/>
        </div>
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-bold text-gray-100 mb-4 font-title">{story.title}</h1>
          <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed overflow-y-auto max-h-[400px] sm:max-h-[450px]">
            {story.story.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
       <div className="text-center mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onReset}
            className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
          >
            Create Another 9isas
          </button>
          {user && (
            <button
              onClick={handleSave}
              disabled={isSaved || loading}
              className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105"
            >
              {isSaved ? 'Saved to Library' : 'Save to Library'}
            </button>
          )}
      </div>
    </div>
  );
};

export default StoryDisplay;