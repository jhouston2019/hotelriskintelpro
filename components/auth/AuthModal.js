/**
 * Authentication modal for Hotel Risk Pro
 * Handles sign up and sign in
 */

import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onSuccess, mode = 'signup' }) {
  const [authMode, setAuthMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Call actual auth API when backend is ready
      // const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/signin'
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name })
      // })
      // const data = await response.json()
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      const mockUser = { id: 'user_123', email, name };
      
      onSuccess?.(mockUser);
      onClose?.();
      
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-hrip-navy to-hrip-blue px-8 py-6">
          <h2 className="text-2xl font-bold text-white">
            {authMode === 'signup' ? 'Create Your Account' : 'Sign In'}
          </h2>
          <p className="text-sm text-blue-100 mt-1">
            {authMode === 'signup' 
              ? 'Save your analysis and enable monitoring' 
              : 'Access your saved hotels and reports'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-sm text-red-800">
              {error}
            </div>
          )}

          {authMode === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
                placeholder="Your name"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-hrip-navy px-6 py-3 text-base font-semibold text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Please wait...' : authMode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
              className="text-sm text-hrip-navy hover:underline"
            >
              {authMode === 'signup' 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
