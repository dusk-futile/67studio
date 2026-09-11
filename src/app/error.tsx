'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[lana67 Runtime Error]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center select-none">
      <div className="max-w-md w-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="w-16 h-16 bg-red-950/60 border border-netflix-red/30 rounded-full flex items-center justify-center mx-auto text-netflix-red">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Something Went Wrong</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            lana67 encountered an unexpected playback or runtime interruption. Your watchlist and preferences remain safe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-2.5 px-4 bg-netflix-red hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-red-900/30 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="flex-1 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-2 active:scale-95"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Reload lana67</span>
          </button>
        </div>
      </div>
    </div>
  );
}
