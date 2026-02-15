import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        toast.success('Welcome back, Alex!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0f0f] via-[#2d1f1f] to-[#1a0f0f] p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-neon border border-white/10">
              <span className="material-icons text-white text-3xl">terminal</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Inno<span className="text-primary">Hacks</span> 3.0
              </h1>
              <p className="text-sm text-slate-400 font-mono">Participant Portal</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 border border-white/5 relative overflow-hidden group">
          {/* Hover Glow Background */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-400">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group/input">
                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-primary transition-colors text-xl">email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field w-full pl-12 glass-card bg-black/20 focus:bg-black/40"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group/input">
                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-primary transition-colors text-xl">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field w-full pl-12 pr-12 glass-card bg-black/20 focus:bg-black/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <span className="material-icons text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary transition-colors cursor-pointer" />
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-hover font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 shadow-neon-hover group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <span className="material-icons group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-500 font-bold uppercase">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary flex items-center justify-center gap-2 py-2.5 hover:text-white hover:border-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 py-2.5 hover:text-white hover:border-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-8 text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-hover font-bold transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
