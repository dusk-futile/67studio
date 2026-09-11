'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { MediaItem } from '../types/media';
import { useApp } from '../context/AppContext';

interface BillboardHeroProps {
  media: MediaItem;
}

export default function BillboardHero({ media }: BillboardHeroProps) {
  const { openDetailModal, playMedia, isGlobalMuted, toggleGlobalMute } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasVideoLoaded, setHasVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isGlobalMuted;
    }
  }, [isGlobalMuted]);

  const handleVideoCanPlay = () => {
    setHasVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => setIsVideoPlaying(false));
    }
  };

  return (
    <div className="relative w-full h-[78vh] md:h-[88vh] bg-netflix-deep overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback & Poster Backdrop Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.backdropUrl}
          alt={media.title}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Dynamic Video Trailer */}
        <video
          ref={videoRef}
          src={media.trailerUrl}
          poster={media.backdropUrl}
          muted={isGlobalMuted}
          autoPlay
          playsInline
          loop
          onCanPlay={handleVideoCanPlay}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 3-Way Vignette Gradients */}
        {/* Left readable scrim */}
        <div className="absolute inset-0 hero-vignette-left w-full md:w-3/4 z-10" />

        {/* Top subtle navbar shadow */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />

        {/* Bottom shelf fade blending into content rows */}
        <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 hero-vignette-bottom z-10" />
      </div>

      {/* Foreground Billboard Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 md:pb-24 px-4 md:px-12 max-w-2xl lg:max-w-3xl">
        {/* 67studio Original Series Badge */}
        {media.isOriginal && (
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-black text-xs text-netflix-red tracking-wider">67</span>
            <span className="text-[11px] font-bold text-white/90 tracking-[0.25em] uppercase">
              STUDIO ORIGINAL
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] uppercase mb-3">
          {media.title}
        </h1>

        {/* Top 10 Ribbon */}
        {media.top10Rank && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-netflix-red text-white text-[11px] font-black px-1.5 py-0.5 rounded-sm">
              TOP 10
            </div>
            <span className="text-sm font-bold text-white drop-shadow-md">
              #{media.top10Rank} in Movies Today
            </span>
          </div>
        )}

        {/* Synopsis Clamp */}
        <p className="text-sm sm:text-base text-gray-200 line-clamp-3 md:line-clamp-4 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-6 font-normal">
          {media.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Play Button */}
          <button
            onClick={() => playMedia(media)}
            className="flex items-center space-x-2 bg-white hover:bg-white/85 text-black font-bold text-sm sm:text-base px-6 py-2.5 rounded transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play</span>
          </button>

          {/* More Info Button */}
          <button
            onClick={() => openDetailModal(media)}
            className="flex items-center space-x-2 bg-neutral-600/75 hover:bg-neutral-600/50 text-white font-bold text-sm sm:text-base px-6 py-2.5 rounded backdrop-blur-md transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
          >
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Right Edge: Mute Toggle & Maturity Rating Pill */}
      <div className="absolute right-0 bottom-24 md:bottom-32 z-20 flex items-center space-x-3">
        <button
          onClick={toggleGlobalMute}
          aria-label={isGlobalMuted ? 'Unmute trailer' : 'Mute trailer'}
          className="w-10 h-10 rounded-full border border-white/40 bg-black/40 hover:bg-black/70 flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200"
        >
          {isGlobalMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <div className="bg-neutral-900/80 border-l-4 border-netflix-red text-white text-xs font-semibold py-1 px-3.5 pr-6 tracking-wide shadow-md">
          {media.maturityRating}
        </div>
      </div>
    </div>
  );
}
