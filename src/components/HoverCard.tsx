'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, Check, ThumbsUp, ChevronDown } from 'lucide-react';
import { MediaItem } from '../types/media';
import { useApp } from '../context/AppContext';

interface HoverCardProps {
  media: MediaItem;
  index: number;
  totalInView?: number;
}

export default function HoverCard({ media, index, totalInView = 5 }: HoverCardProps) {
  const { openDetailModal, playMedia, toggleMyList, isInMyList } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [hasVideoStarted, setHasVideoStarted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const inList = isInMyList(media.id);

  // Netflix origin calculation to prevent card overflowing off-screen
  const getOriginClass = () => {
    if (index % totalInView === 0) return 'origin-left';
    if ((index + 1) % totalInView === 0) return 'origin-right';
    return 'origin-center';
  };

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 280); // 280ms intentional Netflix hover threshold
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setIsHovered(false);
    setHasVideoStarted(false);
  };

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setHasVideoStarted(true))
          .catch(() => setHasVideoStarted(false));
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex-shrink-0 w-48 sm:w-60 md:w-72 aspect-video rounded-sm transition-all duration-300 ease-out cursor-pointer select-none ${
        isHovered
          ? `z-50 scale-[1.38] shadow-[0_20px_40px_rgba(0,0,0,0.98)] ${getOriginClass()}`
          : 'z-10'
      }`}
    >
      {/* Base Card Poster */}
      <div
        onClick={() => openDetailModal(media)}
        className="w-full h-full rounded-sm overflow-hidden bg-[#0d0d0d] border border-white/10 relative"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.backdropUrl || media.posterUrl}
          alt={media.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Title overlay in base state */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/50 to-transparent">
          <p className="text-white text-xs sm:text-sm font-bold truncate drop-shadow-md">
            {media.title}
          </p>
        </div>

        {/* Hover State: Auto-Playing Preview Video */}
        {isHovered && (
          <div className="absolute inset-0 w-full h-full bg-black z-20">
            <video
              ref={videoRef}
              src={media.trailerUrl}
              muted
              playsInline
              loop
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                hasVideoStarted ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}
      </div>

      {/* Expanded Hover Detail Drawer */}
      {isHovered && (
        <div className="bg-[#111111] border-x border-b border-white/15 rounded-b-sm p-3 shadow-2xl space-y-2.5 text-white animate-in fade-in duration-200">
          {/* Quick Actions Line */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Play Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playMedia(media);
                }}
                title="Play Full Movie / Episode"
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>

              {/* Add to My List */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyList(media);
                }}
                title={inList ? 'Remove from My List' : 'Add to My List'}
                className="w-8 h-8 rounded-full border-2 border-neutral-400 hover:border-white text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-black/50"
              >
                {inList ? (
                  <Check className="w-4 h-4 text-netflix-red font-bold" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>

              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked((prev) => !prev);
                }}
                title="I like this"
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${
                  isLiked ? 'border-white bg-white/20 text-white' : 'border-neutral-400 hover:border-white text-white bg-black/50'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expand Details Chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openDetailModal(media);
              }}
              title="More Info"
              className="w-8 h-8 rounded-full border-2 border-neutral-400 hover:border-white text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-black/50"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Metadata Line */}
          <div className="flex items-center space-x-2 text-[11px] font-semibold">
            <span className="text-netflix-match font-bold">
              {media.matchScore}% Match
            </span>
            <span className="border border-neutral-600 px-1 py-0.5 rounded text-[10px] text-neutral-300">
              {media.maturityRating}
            </span>
            <span className="text-neutral-300">{media.duration}</span>
            <span className="border border-neutral-700 px-1 py-0.5 rounded text-[9px] text-neutral-400 font-bold">
              {media.quality}
            </span>
          </div>

          {/* Genre Bullet Pills */}
          <div className="flex items-center flex-wrap gap-1 text-[10px] text-neutral-300 font-medium">
            {media.genres.slice(0, 3).map((genre, i) => (
              <span key={genre} className="flex items-center">
                {genre}
                {i < Math.min(media.genres.length - 1, 2) && (
                  <span className="mx-1 text-neutral-600">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
