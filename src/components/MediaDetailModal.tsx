'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Plus,
  Check,
  ThumbsUp,
  Volume2,
  VolumeX,
  ChevronDown,
} from 'lucide-react';
import { MediaItem, Season } from '../types/media';
import { useApp } from '../context/AppContext';
import { getSimilarMedia } from '../services/mediaService';

export default function MediaDetailModal() {
  const {
    activeModalItem,
    closeDetailModal,
    playMedia,
    toggleMyList,
    isInMyList,
  } = useApp();

  const [similarItems, setSimilarItems] = useState<MediaItem[]>([]);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (activeModalItem) {
      getSimilarMedia(activeModalItem.id).then(setSimilarItems);
      setSelectedSeasonIndex(0);
    }
  }, [activeModalItem]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalItem]);

  if (!activeModalItem) return null;

  const inList = isInMyList(activeModalItem.id);
  const seasons: Season[] = activeModalItem.seasons || [];
  const currentSeason = seasons[selectedSeasonIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-0 sm:p-4 md:p-8 animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div
        onClick={closeDetailModal}
        className="fixed inset-0 z-0"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl bg-netflix-card rounded-md shadow-2xl overflow-hidden my-auto border border-neutral-800 animate-in zoom-in-95 duration-200 text-white">
        {/* Top Media Banner */}
        <div className="relative aspect-video sm:h-[450px] w-full bg-black">
          {/* Video or Backdrop */}
          <video
            ref={videoRef}
            src={activeModalItem.trailerUrl}
            poster={activeModalItem.backdropUrl}
            muted={isMuted}
            autoPlay
            playsInline
            loop
            className="w-full h-full object-cover"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-card via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={closeDetailModal}
            aria-label="Close"
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner Details & CTAs */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="space-y-3 max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                {activeModalItem.title}
              </h2>

              <div className="flex items-center space-x-3">
                {/* Play CTA */}
                <button
                  onClick={() => {
                    closeDetailModal();
                    playMedia(activeModalItem);
                  }}
                  className="flex items-center space-x-2 bg-white hover:bg-neutral-200 text-black font-bold px-6 py-2 rounded transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                  <span>Play</span>
                </button>

                {/* Add to List */}
                <button
                  onClick={() => toggleMyList(activeModalItem)}
                  className="w-10 h-10 rounded-full border-2 border-neutral-400 hover:border-white text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-black/40 backdrop-blur-sm"
                >
                  {inList ? (
                    <Check className="w-5 h-5 text-netflix-red font-bold" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>

                {/* Like */}
                <button
                  onClick={() => setIsLiked((prev) => !prev)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm ${
                    isLiked
                      ? 'border-white bg-white/20 text-white'
                      : 'border-neutral-400 hover:border-white text-white bg-black/40'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="w-10 h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Metadata & Two-Column Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column (Overview & Badges) */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
                <span className="text-netflix-match font-bold">
                  {activeModalItem.matchScore}% Match
                </span>
                <span className="text-neutral-400">{activeModalItem.releaseYear}</span>
                <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[11px] text-neutral-300">
                  {activeModalItem.maturityRating}
                </span>
                <span className="text-neutral-300">{activeModalItem.duration}</span>
                <span className="border border-neutral-700 px-1.5 py-0.5 rounded text-[10px] text-neutral-400">
                  {activeModalItem.quality}
                </span>
                {activeModalItem.audioChannels && (
                  <span className="border border-neutral-700 px-1.5 py-0.5 rounded text-[10px] text-neutral-400">
                    {activeModalItem.audioChannels}
                  </span>
                )}
              </div>

              {activeModalItem.advisoryTags && activeModalItem.advisoryTags.length > 0 && (
                <div className="text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-300">Content Advisory: </span>
                  {activeModalItem.advisoryTags.join(', ')}
                </div>
              )}

              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                {activeModalItem.overview}
              </p>
            </div>

            {/* Right Column (Cast, Genres, Creators) */}
            <div className="space-y-3 text-xs sm:text-sm text-neutral-400 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-neutral-500 block text-xs">Cast:</span>
                <span className="text-neutral-200 font-medium">{activeModalItem.cast.join(', ')}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-xs">Genres:</span>
                <span className="text-neutral-200 font-medium">{activeModalItem.genres.join(', ')}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-xs">Director:</span>
                <span className="text-neutral-200 font-medium">{activeModalItem.director}</span>
              </div>
              {activeModalItem.subtitles && (
                <div>
                  <span className="text-neutral-500 block text-xs">Subtitles:</span>
                  <span className="text-neutral-300">{activeModalItem.subtitles.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Episode Browser (If TV Show) */}
          {seasons.length > 0 && currentSeason && (
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Episodes</h3>
                {seasons.length > 1 && (
                  <div className="relative">
                    <select
                      value={selectedSeasonIndex}
                      onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
                      className="bg-neutral-800 text-white text-xs font-semibold py-1.5 px-3 pr-8 rounded border border-neutral-700 focus:outline-none focus:border-white appearance-none cursor-pointer"
                    >
                      {seasons.map((season, idx) => (
                        <option key={season.seasonNumber} value={idx}>
                          {season.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Episode List */}
              <div className="divide-y divide-neutral-800">
                {currentSeason.episodes.map((episode) => (
                  <div
                    key={episode.id}
                    onClick={() => {
                      closeDetailModal();
                      playMedia({
                        ...activeModalItem,
                        title: `${activeModalItem.title}: ${episode.title}`,
                        videoUrl: episode.videoUrl,
                        overview: episode.overview,
                      });
                    }}
                    className="py-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 hover:bg-neutral-800/60 rounded cursor-pointer transition-colors group"
                  >
                    <span className="text-base font-bold text-neutral-400 w-6">
                      {episode.episodeNumber}
                    </span>

                    {/* Thumbnail with play hover */}
                    <div className="relative w-36 sm:w-44 aspect-video rounded overflow-hidden bg-neutral-900 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={episode.thumbnailUrl}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                      {episode.progressPercent && (
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-neutral-700">
                          <div
                            className="h-full bg-netflix-red"
                            style={{ width: `${episode.progressPercent}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Episode details */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-netflix-red transition-colors">
                          {episode.title}
                        </h4>
                        <span className="text-xs text-neutral-400">{episode.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2">
                        {episode.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* "More Like This" Section */}
          {similarItems.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <h3 className="text-xl font-bold text-white">More Like This</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {similarItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      closeDetailModal();
                      setTimeout(() => {
                        useApp().openDetailModal(item);
                      }, 100);
                    }}
                    className="bg-netflix-cardElevated rounded overflow-hidden border border-neutral-800/80 cursor-pointer group hover:border-neutral-700 transition-colors"
                  >
                    <div className="relative aspect-video bg-neutral-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.backdropUrl || item.posterUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-neutral-900/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                        {item.duration}
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-netflix-match">
                          {item.matchScore}% Match
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMyList(item);
                          }}
                          className="w-7 h-7 rounded-full border border-neutral-500 hover:border-white flex items-center justify-center text-white"
                        >
                          {isInMyList(item.id) ? (
                            <Check className="w-3.5 h-3.5 text-netflix-red" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-3 leading-relaxed">
                        {item.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Section Footer */}
          <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-400 space-y-1">
            <h4 className="text-sm font-bold text-white">About 67studio</h4>
            <p>
              Audio: {activeModalItem.audioChannels || 'Dolby Atmos, 5.1 Surround, Stereo'}.
              Subtitles available in English, Spanish, French, Japanese, German, and Arabic.
            </p>
            <p className="text-neutral-500">
              © 2026 67studio Entertainment, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
