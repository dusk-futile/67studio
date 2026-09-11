'use client';

import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PasswordGate() {
  const { verifyPassword } = useApp();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the access password.');
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    const isValid = verifyPassword(password.trim());

    if (isValid) {
      setError('');
      setIsSuccess(true);
    } else {
      setError('Access Denied: Invalid access password. Please try again.');
      triggerShake();
      setIsSubmitting(false);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center px-4 overflow-hidden selection:bg-netflix-red selection:text-white">
      {/* Ambient Cinema Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.18)_0%,rgba(0,0,0,0.95)_70%,#000000_100%)] pointer-events-none" />
      
      {/* Decorative Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Main Whitelist Access Modal */}
      <div 
        className={`relative max-w-md w-full bg-[#0a0a0a]/95 border border-neutral-800/80 rounded-2xl p-7 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 ${
          isShaking ? 'animate-shake border-red-600/70 shadow-red-950/50' : ''
        } ${isSuccess ? 'scale-[1.02] border-emerald-500/50' : ''}`}
      >
        {/* Glowing Top Accent Line */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-netflix-red to-transparent opacity-80" />

        <div className="flex flex-col items-center text-center">
          {/* lana67 Iconic Logo */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-black text-4xl sm:text-5xl tracking-tighter text-netflix-red drop-shadow-[0_2px_18px_rgba(229,9,20,0.95)] font-sans">
              LANA
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white uppercase border-b-2 border-netflix-red pb-1">
              67
            </span>
          </div>

          {/* Security Status Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-red-500/25 text-neutral-300 text-[11px] font-semibold tracking-wider uppercase mb-5 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-netflix-red animate-pulse" />
            <span>Whitelist Network Access</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
            Restricted Studio Access
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-xs leading-relaxed">
            This streaming network is strictly private. Enter the whitelist access password to unlock the studio catalog.
          </p>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative text-left">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                disabled={isSuccess}
                autoFocus
                placeholder="Enter access password..."
                className={`w-full bg-neutral-950/90 border ${
                  error
                    ? 'border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                    : 'border-neutral-800 focus:border-netflix-red focus:ring-1 focus:ring-netflix-red'
                } text-white placeholder-neutral-500 text-sm rounded-lg pl-10 pr-11 py-3 transition-all outline-none font-mono tracking-wide`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 focus:outline-none transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-xs font-medium bg-red-950/40 border border-red-900/60 rounded-lg p-2.5 text-left animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Unlock Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-[0.98] ${
                isSuccess
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-netflix-red hover:bg-red-700 text-white shadow-red-950/40 hover:shadow-red-900/60'
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>Access Granted • Entering Studio...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock lana67</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="mt-6 pt-5 border-t border-neutral-800/80 w-full flex items-center justify-between text-[10px] text-neutral-500">
            <span>lana67 Guard System</span>
            <span className="font-mono text-neutral-400">Encrypted Whitelist</span>
          </div>
        </div>
      </div>
    </div>
  );
}
