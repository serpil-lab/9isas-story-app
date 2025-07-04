import React from 'react';
import { StoryParams } from '../types';
import { CHARACTERS, SETTINGS, MORALS } from '../constants';
import OptionCard from './OptionCard';

interface StoryFormProps {
  params: StoryParams;
  setParams: React.Dispatch<React.SetStateAction<StoryParams>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const StoryForm: React.FC<StoryFormProps> = ({ params, setParams, onSubmit, isLoading }) => {
  
  const handleOptionSelect = <T extends keyof StoryParams,>(field: T, option: StoryParams[T]) => {
    setParams(prev => ({ ...prev, [field]: option }));
  };

  const isFormValid = params.character && params.setting && params.moral && params.plot;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 animate-fade-in">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-100 font-title">Create Your 9isas</h1>
        <p className="mt-3 text-xl text-gray-300">Weave a magical tale for your little one.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-purple-900/20">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Child's Name (Optional)</label>
          <input
            type="text"
            id="name"
            value={params.name}
            onChange={(e) => setParams(p => ({...p, name: e.target.value}))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-gray-200 placeholder-gray-400"
            placeholder="e.g., Lily"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">Child's Age (Optional)</label>
          <input
            type="number"
            id="age"
            value={params.age}
            onChange={(e) => setParams(p => ({...p, age: e.target.value}))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-gray-200 placeholder-gray-400"
            placeholder="e.g., 5"
          />
        </div>
      </div>
      
      <Section title="1. Choose a Character">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHARACTERS.map(opt => (
            <OptionCard key={opt.id} option={opt} isSelected={params.character?.id === opt.id} onClick={() => handleOptionSelect('character', opt)} />
          ))}
        </div>
      </Section>
      
      <Section title="2. Pick a Setting">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SETTINGS.map(opt => (
            <OptionCard key={opt.id} option={opt} isSelected={params.setting?.id === opt.id} onClick={() => handleOptionSelect('setting', opt)} />
          ))}
        </div>
      </Section>

      <Section title="3. Select a Moral">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MORALS.map(opt => (
            <OptionCard key={opt.id} option={opt} isSelected={params.moral?.id === opt.id} onClick={() => handleOptionSelect('moral', opt)} />
          ))}
        </div>
      </Section>
      
      <Section title="4. What should the story be about?">
        <textarea
          value={params.plot}
          onChange={(e) => setParams(p => ({...p, plot: e.target.value}))}
          className="w-full h-24 px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-gray-200 placeholder-gray-400"
          placeholder="e.g., A lost puppy who needs to find its way home."
        />
      </Section>

      <div className="text-center pt-4">
        <button
          onClick={onSubmit}
          disabled={!isFormValid || isLoading}
          className="px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Creating...' : 'Create My 9isas!'}
        </button>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="space-y-4 bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-purple-900/20">
        <h2 className="text-3xl font-bold text-gray-200 font-title">{title}</h2>
        {children}
    </div>
);

export default StoryForm;