import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(username, password);
    } else {
      register(username, password);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-white/80">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline font-semibold"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};