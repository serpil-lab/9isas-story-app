import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-900/30 animate-fade-in">
        <h1 className="text-4xl font-bold text-center text-white font-title mb-2">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <p className="text-center text-gray-400 mb-8">to start creating your 9isas</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-gray-200 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-gray-200 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-12 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-purple-400 hover:text-purple-300 ml-2">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
