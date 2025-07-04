import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { View } from '../App';

interface LandingPageProps {
  onNavigate: (view: View) => void;
}

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
      >
        <span className="font-semibold text-lg text-gray-200">{question}</span>
        <svg
          className={`w-5 h-5 text-purple-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 pr-4 text-gray-400">
          {children}
        </div>
      )}
    </div>
  );
};


const sampleStories = [
  {
    imgSrc: "https://images.unsplash.com/photo-1502901358999-9831a26b2a3c?q=80&w=800&auto=format&fit=crop",
    title: 'The Pajama Knight',
    chapters: 5,
    age: '3-6 years',
    tags: ['Audio', 'Free']
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1549558549-415fe4c37b6b?q=80&w=800&auto=format&fit=crop",
    title: "The Reindeer Who Couldn't Fly",
    chapters: 7,
    age: '6-9 years',
    tags: ['Audio', 'Free']
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1604351371900-a50d7a4582e0?q=80&w=800&auto=format&fit=crop",
    title: 'The Fairy Who Lost Her Sparkles',
    chapters: 8,
    age: '3-6 years',
    tags: ['Audio', 'Free']
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=800&auto=format&fit=crop",
    title: 'Midnight on the Brooklyn Bridge',
    chapters: 5,
    age: '9-12 years',
    tags: ['Audio', 'Free']
  }
];

const StoryCard: React.FC<typeof sampleStories[0]> = ({ imgSrc, title, chapters, age, tags }) => (
  <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-slate-800 transform transition-transform duration-300 hover:-translate-y-2">
    <img src={imgSrc} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    
    <div className="absolute top-4 left-4 flex gap-2">
      {tags.includes('Audio') && 
        <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>
          Audio
        </div>
      }
    </div>
    <div className="absolute top-4 right-4">
      {tags.includes('Free') && <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Free</div>}
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex items-center text-xs text-gray-300 gap-4 mb-4">
        <span>{chapters} Chapters</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <span>en</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <span>{age}</span>
      </div>
      <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg text-sm group-hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center gap-2">
        Read Story <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
      </button>
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Text Tales');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const tabs = ['Text Tales', 'Audio Tales', 'Video Tales'];

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-200">
      <Header onNavigate={onNavigate} />

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-0"></div>
           <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white font-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Create Magical Bedtime Stories with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Turn your child's dreams into beautifully illustrated tales in seconds. Personalized, imaginative, and unforgettable.
            </p>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => onNavigate('auth')}
                      className="px-8 py-3 w-full sm:w-auto font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
                    >
                        Try for Free
                    </button>
                    <a 
                      href="#how-it-works" 
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 font-semibold text-white bg-white/10 border border-slate-600 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        Watch Tutorial
                    </a>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span>No credit card required to get started</span>
                </div>
            </div>
          </div>
          {/* Testimonials Section - Moved here */}
          <div id="testimonials" className="container mx-auto text-center mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <h2 className="text-2xl font-bold text-center text-white/90 font-title mb-10 uppercase tracking-[0.2em]">
                    Loved & trusted by 5,000+ happy members
                </h2>
                <div className="relative max-w-3xl mx-auto">
                    <div className="bg-[#1A193B] p-8 md:p-12 rounded-2xl shadow-2xl shadow-black/50 border border-purple-900/40">
                        <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop"
                            alt="Claire Chambers" 
                            className="w-24 h-24 rounded-full mx-auto mb-6 ring-4 ring-purple-600/50 shadow-lg shadow-purple-500/30 object-cover"
                        />
                        <div className="relative">
                            <span className="absolute -top-6 -left-4 text-8xl font-serif text-purple-500/30 select-none z-0">“</span>
                            <p className="relative text-xl text-gray-200 italic leading-relaxed z-10">
                                Finally found a solution to our bedtime story struggles! Creating personalized stories that match my children's interests has made bedtime our favorite family moment.
                            </p>
                        </div>
                        <p className="mt-8 font-semibold text-lg text-purple-400 tracking-wider">
                            Claire Chambers
                        </p>
                    </div>
                </div>
            </div>
        </section>


        {/* Features Section */}
        <section id="features" className="py-20 px-4 container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white font-title mb-12">Why You'll Love 9isas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card */}
            <div className="bg-slate-800/60 p-6 rounded-2xl text-center shadow-lg hover:shadow-purple-900/30 transition-shadow duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Personalized Tales</h3>
              <p className="text-gray-400">Add your child's name and age for a story that's truly their own.</p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl text-center shadow-lg hover:shadow-purple-900/30 transition-shadow duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Stunning Illustrations</h3>
              <p className="text-gray-400">Each story comes to life with a unique, AI-generated image.</p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl text-center shadow-lg hover:shadow-purple-900/30 transition-shadow duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Valuable Morals</h3>
              <p className="text-gray-400">Choose a lesson like courage or kindness to embed in the narrative.</p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl text-center shadow-lg hover:shadow-purple-900/30 transition-shadow duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Endless Creativity</h3>
              <p className="text-gray-400">With countless combinations, you'll never run out of new adventures.</p>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-slate-900/50">
          <h2 className="text-4xl font-bold text-center text-white font-title mb-12">Create a Story in 3 Simple Steps</h2>
          <div className="container mx-auto grid md:grid-cols-3 gap-12 text-center">
             <div>
                <div className="text-5xl font-bold text-purple-400 font-title mb-4">1</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Choose Elements</h3>
                <p className="text-gray-400">Pick a hero, a magical setting, and a meaningful moral for your story.</p>
             </div>
             <div>
                <div className="text-5xl font-bold text-purple-400 font-title mb-4">2</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Add a Plot</h3>
                <p className="text-gray-400">Describe a simple idea for the adventure you want to create.</p>
             </div>
             <div>
                <div className="text-5xl font-bold text-purple-400 font-title mb-4">3</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Watch the Magic</h3>
                <p className="text-gray-400">Our AI storyteller weaves your choices into a unique tale and illustration.</p>
             </div>
          </div>
        </section>
        
        {/* Explore Section */}
        <section id="explore" className="py-20 px-4 container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-white font-title mb-4">Explore What You Can Create</h2>
                <p className="text-gray-400 mb-8">Discover our examples collection of magical stories in different formats. Choose from traditional text stories, immersive audio tales, or engaging video stories.</p>
                <div className="inline-flex items-center bg-slate-800/60 p-1.5 rounded-xl mb-6">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab;
                        const icons = {
                            'Text Tales': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10.392C2.057 15.71 3.245 16 4.5 16h1.054c.254.162.52.298.796.402A3.996 3.996 0 009 17.5a3.996 3.996 0 002.65-1.098c.276-.104.542-.24.796-.402H13.5c1.255 0 2.443-.29 3.5-.804V4.804C15.943 4.29 14.755 4 13.5 4h-1.054a3.996 3.996 0 00-2.65-1.098 3.996 3.996 0 00-2.65 1.098H5.5c-1.255 0-2.443.29-3.5.804zM3 6.392c.93-.453 2.02-.705 3.167-.705 1.147 0 2.237.252 3.167.705V13.6c-1-.448-2.122-.697-3.333-.697-1.211 0-2.333.249-3.333.697V6.392z" /></svg>,
                            'Audio Tales': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 000 2v1.586l-1.707-1.707A1 1 0 004.88 6.293L6.293 7.707 4.88 9.121a1 1 0 001.414 1.414L7.707 9.12l1.414 1.415a1 1 0 001.414-1.414L9.12 7.707l1.414-1.414a1 1 0 00-1.414-1.414L7.707 6.293 6.293 4.88A1 1 0 004.88 3.464L4.18 3H8zm-3 8a1 1 0 011-1h5a1 1 0 110 2H6a1 1 0 01-1-1z" /><path d="M12 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" /></svg>,
                            'Video Tales': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2-2H4a2 2 0 01-2-2V6zm14.553 1.394a.5.5 0 00-.806-.401l-3.5 2.5a.5.5 0 000 .802l3.5 2.5a.5.5 0 00.806-.401V7.394z" /></svg>
                        }
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2 ${isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
                            >
                                {icons[tab as keyof typeof icons]}
                                {tab}
                            </button>
                        )
                    })}
                </div>
                <p className="text-gray-400 text-sm">Interactive stories you can read anytime, beautifully illustrated and perfect for sharing.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sampleStories.map((story, index) => <StoryCard key={index} {...story} />)}
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white font-title mb-4">Choose Your Plan</h2>

          <div className="flex justify-center items-center gap-4 mb-12 animate-fade-in">
              <span className={`font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-purple-400' : 'text-gray-400'}`}>
                  Monthly
              </span>
              <button
                  onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors bg-slate-700`}
                  aria-label="Toggle billing cycle"
              >
                  <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`}
                  />
              </button>
              <span className={`font-semibold transition-colors ${billingCycle === 'yearly' ? 'text-purple-400' : 'text-gray-400'}`}>
                  Yearly
              </span>
              <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
                  2 Months Free
              </span>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
             <div className="border-2 border-slate-700 rounded-2xl p-8 text-center flex flex-col">
                <h3 className="text-2xl font-bold text-white font-title mb-2">Free Spark</h3>
                <p className="text-5xl font-bold text-white mb-4">$0</p>
                <ul className="space-y-2 text-gray-400 mb-8 flex-grow">
                    <li>3 stories per month</li>
                    <li>Standard characters & settings</li>
                    <li>Includes illustrations</li>
                </ul>
                <button className="mt-auto w-full px-6 py-3 font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">Current Plan</button>
             </div>
             <div className="border-2 border-purple-500 rounded-2xl p-8 text-center flex flex-col ring-2 ring-purple-500 shadow-xl shadow-purple-900/40">
                <h3 className="text-2xl font-bold text-white font-title mb-2">Dream Weaver</h3>
                {billingCycle === 'monthly' ? (
                  <p className="text-5xl font-bold text-white mb-4">$9<span className="text-lg text-gray-400">/mo</span></p>
                ) : (
                  <p className="text-5xl font-bold text-white mb-4">$90<span className="text-lg text-gray-400">/yr</span></p>
                )}
                 <ul className="space-y-2 text-gray-400 mb-8 flex-grow">
                    <li>Unlimited stories</li>
                    <li>Premium characters & settings</li>
                    <li>Save stories to your library</li>
                    <li>Priority support</li>
                </ul>
                <button className="mt-auto w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:scale-105 transform transition-transform">Upgrade Now</button>
             </div>
             <div className="border-2 border-slate-700 rounded-2xl p-8 text-center flex flex-col">
                <h3 className="text-2xl font-bold text-white font-title mb-2">Institute Edition</h3>
                 <p className="text-5xl font-bold text-white mb-4">$90<span className="text-lg text-gray-400">/mo</span></p>
                <ul className="space-y-2 text-gray-400 mb-8 flex-grow">
                    <li>Unlimited classes & students</li>
                    <li>Custom branding options</li>
                    <li>Dedicated account manager</li>
                    <li>All Dream Weaver features</li>
                </ul>
                <button className="mt-auto w-full px-6 py-3 font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">Contact Sales</button>
             </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <div className="bg-slate-800/60 p-6 rounded-2xl flex items-start gap-4">
                  <div className="flex-shrink-0 bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                      <h4 className="font-bold text-white mb-1">Change or Cancel Anytime</h4>
                      <p className="text-sm text-gray-400">No long-term contracts or commitments required</p>
                  </div>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl flex items-start gap-4">
                  <div className="flex-shrink-0 bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                      <h4 className="font-bold text-white mb-1">Secure Payment</h4>
                      <p className="text-sm text-gray-400">Your data is protected with 256-bit SSL encryption.</p>
                  </div>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl flex items-start gap-4">
                  <div className="flex-shrink-0 bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                      <h4 className="font-bold text-white mb-1">24/7 Support</h4>
                      <p className="text-sm text-gray-400">Our support team is here to help anytime</p>
                  </div>
              </div>
          </div>

          <div className="mt-8 text-center">
              <a href="#faq" className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-purple-300 bg-purple-500/10 rounded-full hover:bg-purple-500/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Have questions? <span className="font-bold text-purple-200">View our FAQ</span>
              </a>
          </div>

        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white font-title mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
              <FaqItem question="What is 9isas?">
                  <p>9isas is an AI-powered platform that generates personalized, illustrated children's stories. You provide the creative ingredients, and our AI brings a unique tale to life for your child.</p>
              </FaqItem>
              <FaqItem question="How are the stories and images created?">
                  <p>We use advanced generative AI models from Google. The story is crafted by a large language model based on your prompts, and the illustration is created by an image generation model to match the story's theme.</p>
              </FaqItem>
              <FaqItem question="Are the stories safe for children?">
                  <p>Absolutely. Our AI is specifically instructed to create content that is positive, age-appropriate, and family-friendly. We have multiple safeguards in place to ensure a safe and magical experience.</p>
              </FaqItem>
              <FaqItem question="Can I save or share the stories?">
                  <p>Yes! Once you create an account, you can save all your favorite stories to a personal library and access them anytime.</p>
              </FaqItem>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;