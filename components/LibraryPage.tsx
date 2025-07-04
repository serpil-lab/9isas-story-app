import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SavedStory } from '../types';

interface LibraryPageProps {
  onNavigate: (view: 'landing' | 'generator') => void;
}

const StoryCard: React.FC<{ story: SavedStory }> = ({ story }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-slate-800 transform transition-transform duration-300 hover:-translate-y-2">
    <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
      <p className="text-xs text-gray-400">
        Created on: {new Date(story.createdAt?.toDate()).toLocaleDateString()}
      </p>
    </div>
  </div>
);

const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate }) => {
  const { savedStories, userProfile } = useAuth();

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-200">
      <header className="p-4 sm:p-6 flex justify-between items-center container mx-auto">
        <h1 className="text-3xl font-bold text-white font-title cursor-pointer" onClick={() => onNavigate('landing')}>9isas</h1>
        <div>
          <button
            onClick={() => onNavigate('generator')}
            className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
          >
            Create New Story
          </button>
        </div>
      </header>
      <main className="p-4 sm:p-8 container mx-auto">
        <div className="mb-12">
            <h2 className="text-4xl font-bold text-white font-title">
                {userProfile?.name || 'Your'}'s Library
            </h2>
            <p className="text-lg text-gray-400 mt-2">All your magical creations in one place.</p>
        </div>

        {savedStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/60 rounded-2xl">
            <h3 className="text-2xl font-semibold text-white">Your library is empty.</h3>
            <p className="text-gray-400 mt-2 mb-6">Let's create your first magical tale!</p>
            <button
                onClick={() => onNavigate('generator')}
                className="px-8 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
                Start Creating
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LibraryPage;