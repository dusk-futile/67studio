'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MediaItem } from '../types/media';
import { searchMedia } from '../services/mediaService';
import HoverCard from './HoverCard';
import { Search } from 'lucide-react';

export default function SearchOverlay() {
  const { searchQuery, setSearchQuery } = useApp();
  const [results, setResults] = useState<MediaItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Movies' | 'TV Shows'>('All');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      searchMedia(searchQuery).then((res) => {
        setResults(res);
        setIsLoading(false);
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!searchQuery.trim()) return null;

  const filteredResults = results.filter((item) => {
    if (activeFilter === 'Movies') return item.type === 'movie';
    if (activeFilter === 'TV Shows') return item.type === 'tv';
    return true;
  });

  return (
    <div className="pt-24 pb-20 px-4 md:px-12 min-h-screen bg-black text-white">
      {/* Header & Filter Row */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-netflix-red" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Results for <span className="text-netflix-red">&ldquo;{searchQuery}&rdquo;</span>
            </h1>
            <span className="text-xs text-neutral-400 font-medium">
              ({filteredResults.length} {filteredResults.length === 1 ? 'title' : 'titles'})
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2">
            {(['All', 'Movies', 'TV Shows'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-28 text-neutral-500 text-sm">
          <div className="w-6 h-6 border-2 border-netflix-red border-t-transparent rounded-full animate-spin mr-3" />
          Searching TMDB & lana67 catalog...
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredResults.map((item, idx) => (
            <div key={item.id} className="relative group">
              <HoverCard media={item} index={idx} totalInView={4} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 max-w-md mx-auto space-y-3">
          <p className="text-neutral-300 text-base">
            Your search for &ldquo;{searchQuery}&rdquo; did not match any titles.
          </p>
          <p className="text-xs text-neutral-500">
            Try searching for blockbuster films like &ldquo;Inception&rdquo;, &ldquo;Avatar&rdquo;, &ldquo;Batman&rdquo;, or &ldquo;Spider-Man&rdquo;.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-5 py-2 bg-netflix-red hover:bg-netflix-redHover text-white text-xs font-bold rounded transition-colors shadow-lg"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
