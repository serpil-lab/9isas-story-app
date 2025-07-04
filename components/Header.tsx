import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { View } from '../App';

interface HeaderProps {
  onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logOut } = useAuth();
  
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Explore', href: '#explore' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'F.A.Q.', href: '#faq' },
  ];

  const handleLogout = async () => {
    await logOut();
    onNavigate('landing');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900/50 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => onNavigate('landing')} className="text-3xl font-bold text-white font-title">
          9isas
        </button>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button 
                onClick={() => onNavigate('library')}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                My Library
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold bg-red-600/80 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('auth')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('auth')}
                className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;