'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Server,
  Film,
  Tv,
  Maximize,
  Minimize,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTmdbTrailerKey } from '../services/mediaService';

type ServerType = 'server1' | 'server2' | 'server3' | 'trailer' | 'direct';

export default function VideoPlayer() {
  const { activePlayingItem, stopMedia } = useApp();
  const [activeServer, setActiveServer] = useState<ServerType>('server1');
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [youtubeKey, setYoutubeKey] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize player state when media changes
  useEffect(() => {
    if (!activePlayingItem) return;

    setIsLoading(true);
    setActiveServer('server1');
    setSeason(1);
    setEpisode(1);

    if (activePlayingItem.youtubeKey) {
      setYoutubeKey(activePlayingItem.youtubeKey);
    } else if (activePlayingItem.tmdbId) {
      getTmdbTrailerKey(activePlayingItem.tmdbId, activePlayingItem.type).then((key) => {
        if (key) setYoutubeKey(key);
      });
    } else {
      setYoutubeKey(undefined);
    }
  }, [activePlayingItem]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePlayingItem) return;
      if (e.key === 'Escape') {
        stopMedia();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingItem]);

  if (!activePlayingItem) return null;

  const tmdbId = activePlayingItem.tmdbId;
  const isTv = activePlayingItem.type === 'tv';

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Determine streaming URL based on active server
  const getStreamUrl = (): string => {
    if (!tmdbId) {
      return activePlayingItem.videoUrl || activePlayingItem.trailerUrl;
    }

    switch (activeServer) {
      case 'server1':
        // VidLink Pro (Fast HD Streaming)
        return isTv
          ? `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`
          : `https://vidlink.pro/movie/${tmdbId}`;

      case 'server2':
        // AutoEmbed (Multi-Source High Definition)
        return isTv
          ? `https://autoembed.co/tv/tmdb/${tmdbId}/${season}/${episode}`
          : `https://autoembed.co/movie/tmdb/${tmdbId}`;

      case 'server3':
        // 2Embed (Alternative Global CDN)
        return isTv
          ? `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`
          : `https://www.2embed.cc/embed/${tmdbId}`;

      case 'trailer':
        if (youtubeKey) {
          return `https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`;
        }
        return activePlayingItem.trailerUrl;

      case 'direct':
      default:
        return activePlayingItem.videoUrl || activePlayingItem.trailerUrl;
    }
  };

  const streamUrl = getStreamUrl();
  const isEmbedServer = activeServer === 'server1' || activeServer === 'server2' || activeServer === 'server3' || (activeServer === 'trailer' && !!youtubeKey);

  const serverOptions: Array<{ id: ServerType; label: string; tag: string }> = [
    { id: 'server1', label: 'Server 1 (VidLink HD)', tag: 'Ultra HD' },
    { id: 'server2', label: 'Server 2 (AutoEmbed)', tag: 'Multi-Source' },
    { id: 'server3', label: 'Server 3 (2Embed)', tag: 'Global CDN' },
    { id: 'trailer', label: 'Official 4K Trailer', tag: 'YouTube' },
    { id: 'direct', label: 'Direct Cinema Stream', tag: '67studio' },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 p-4 md:p-6 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between z-40">
        <div className="flex items-center space-x-4">
          <button
            onClick={stopMedia}
            className="text-white hover:text-netflix-red transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Back to Browse"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-netflix-red uppercase tracking-wider">
                {isTv ? 'TV Series' : 'Movie'}
              </span>
              <span className="text-xs text-neutral-500">•</span>
              <span className="text-xs text-neutral-400">{activePlayingItem.releaseYear}</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tight line-clamp-1">
              {activePlayingItem.title}
            </h2>
          </div>
        </div>

        {/* Server & Episode Selector Toolbar */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
          {/* Episode Browser (If TV Show) */}
          {isTv && (
            <div className="flex items-center space-x-1.5 bg-neutral-900/90 border border-white/15 px-2.5 py-1 rounded">
              <Tv className="w-3.5 h-3.5 text-netflix-red hidden sm:inline" />
              <div className="flex items-center space-x-1">
                <span className="text-neutral-400 font-semibold">S:</span>
                <select
                  value={season}
                  onChange={(e) => {
                    setSeason(Number(e.target.value));
                    setIsLoading(true);
                  }}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <option key={s} value={s} className="bg-neutral-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-1 ml-2">
                <span className="text-neutral-400 font-semibold">E:</span>
                <select
                  value={episode}
                  onChange={(e) => {
                    setEpisode(Number(e.target.value));
                    setIsLoading(true);
                  }}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ep) => (
                    <option key={ep} value={ep} className="bg-neutral-900 text-white">
                      {ep}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Server Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowServerMenu((prev) => !prev)}
              className="flex items-center space-x-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold px-3 py-1.5 rounded border border-white/20 shadow-md transition-colors"
            >
              <Server className="w-3.5 h-3.5 text-netflix-red" />
              <span className="hidden sm:inline">
                {serverOptions.find((s) => s.id === activeServer)?.label}
              </span>
              <span className="sm:hidden">Server</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 ml-0.5" />
            </button>

            {showServerMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0c0c0c] border border-neutral-800 rounded-lg shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-800">
                  Select Stream Server
                </div>
                {serverOptions.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setActiveServer(srv.id);
                      setShowServerMenu(false);
                      setIsLoading(true);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-900 transition-colors ${
                      activeServer === srv.id
                        ? 'text-netflix-red font-bold bg-neutral-900/60'
                        : 'text-neutral-300'
                    }`}
                  >
                    <span>{srv.label}</span>
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                      {srv.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
            title="Toggle Fullscreen (f)"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 space-y-3">
            <div className="w-10 h-10 border-3 border-netflix-red border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-neutral-400 font-medium">
              Connecting to {serverOptions.find((s) => s.id === activeServer)?.label}...
            </p>
          </div>
        )}

        {/* Embedded Streaming Player */}
        {isEmbedServer ? (
          <iframe
            key={`${activeServer}-${season}-${episode}`}
            src={streamUrl}
            title={activePlayingItem.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          /* Direct HTML5 Video Stream Fallback */
          <video
            ref={videoRef}
            src={streamUrl}
            autoPlay
            controls
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onCanPlay={() => {
              setIsLoading(false);
              if (videoRef.current) {
                videoRef.current.play().catch(() => {
                  if (videoRef.current) videoRef.current.muted = true;
                  videoRef.current?.play().catch(() => {});
                });
              }
            }}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Bottom Stream Info & Fallback Banner */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 to-transparent flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-400 pointer-events-auto z-30">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <span className="w-2 h-2 rounded-full bg-netflix-match animate-pulse" />
          <span>
            Playing via <strong className="text-white">{serverOptions.find((s) => s.id === activeServer)?.label}</strong>
          </span>
          {isTv && (
            <span className="text-neutral-500 hidden sm:inline">
              (Season {season}, Episode {episode})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span>Having buffering or playback issues?</span>
          <button
            onClick={() => {
              const nextServer: ServerType =
                activeServer === 'server1'
                  ? 'server2'
                  : activeServer === 'server2'
                  ? 'server3'
                  : 'server1';
              setActiveServer(nextServer);
              setIsLoading(true);
            }}
            className="text-netflix-red hover:underline font-bold flex items-center space-x-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Switch Server</span>
          </button>
        </div>
      </div>
    </div>
  );
}
