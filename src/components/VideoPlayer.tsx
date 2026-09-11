'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Server,
  Tv,
  Maximize,
  Minimize,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTmdbTrailerKey } from '../services/mediaService';

type ServerType = 'server1' | 'server2' | 'server3' | 'server4' | 'trailer' | 'direct';

export default function VideoPlayer() {
  const { activePlayingItem, stopMedia } = useApp();
  const [activeServer, setActiveServer] = useState<ServerType>('server1');
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [youtubeKey, setYoutubeKey] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Relentless Automatic Sandbox & Anti-Redirect Engine
  useEffect(() => {
    if (!activePlayingItem) return;

    // 1. Intercept any programmatic window.open / popup attempts on the parent window
    const originalOpen = window.open;
    window.open = function (...args: any[]) {
      console.warn('[67studio Shield] Relentlessly blocked ad popup attempt:', args);
      return null;
    };

    // 2. Prevent window defocus / popunder background tab stealing
    const handleBlur = () => {
      setTimeout(() => {
        if (document.activeElement?.tagName !== 'IFRAME') {
          window.focus();
        }
      }, 100);
    };

    window.addEventListener('blur', handleBlur);

    return () => {
      window.open = originalOpen;
      window.removeEventListener('blur', handleBlur);
    };
  }, [activePlayingItem]);

  // Initialize player state when media changes
  useEffect(() => {
    if (!activePlayingItem) return;

    setIsLoading(true);
    setActiveServer('server1');
    setSeason(1);
    setEpisode(1);
    setAreControlsVisible(true);

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

  // Clean auto-hide: fades out all controls & hides cursor after 2.5s of mouse idle
  const handleMouseMove = () => {
    setAreControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setAreControlsVisible(false);
      setShowServerMenu(false);
    }, 2500);
  };

  // Keyboard navigation
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

  const getStreamUrl = (): string => {
    if (!tmdbId) {
      return activePlayingItem.videoUrl || activePlayingItem.trailerUrl;
    }

    switch (activeServer) {
      case 'server1':
        return isTv
          ? `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}?autoplay=true&primaryColor=e50914&secondaryColor=141414&iconColor=ffffff&title=false&nextbutton=true`
          : `https://vidlink.pro/movie/${tmdbId}?autoplay=true&primaryColor=e50914&secondaryColor=141414&iconColor=ffffff&title=false&nextbutton=true`;

      case 'server2':
        return isTv
          ? `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}/${episode}`
          : `https://vidsrc.xyz/embed/movie/${tmdbId}`;

      case 'server3':
        return isTv
          ? `https://autoembed.co/tv/tmdb/${tmdbId}/${season}/${episode}`
          : `https://autoembed.co/movie/tmdb/${tmdbId}`;

      case 'server4':
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
  const isEmbedServer =
    activeServer === 'server1' ||
    activeServer === 'server2' ||
    activeServer === 'server3' ||
    activeServer === 'server4' ||
    (activeServer === 'trailer' && !!youtubeKey);

  const serverOptions: Array<{ id: ServerType; label: string }> = [
    { id: 'server1', label: 'Server 1 (VidLink HD - Auto Autoplay)' },
    { id: 'server2', label: 'Server 2 (VidSrc Stream)' },
    { id: 'server3', label: 'Server 3 (AutoEmbed)' },
    { id: 'server4', label: 'Server 4 (2Embed)' },
    { id: 'trailer', label: 'Official 4K Trailer' },
    { id: 'direct', label: 'Direct Stream' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden transition-all duration-300 ${
        !areControlsVisible ? 'cursor-none' : 'cursor-default'
      }`}
    >
      {/* Auto-Hiding Top Navigation Bar */}
      <div
        className={`absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between z-40 transition-opacity duration-500 ${
          areControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              stopMedia();
            }}
            className="flex items-center space-x-2 text-white hover:text-netflix-red transition-all px-3 py-1.5 rounded-full hover:bg-white/10 bg-black/60 backdrop-blur-md border border-white/20 shadow-lg group"
            aria-label="Back to Browse"
            title="Back to Browse (Esc)"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Back</span>
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-netflix-red uppercase tracking-wider">
                {isTv ? 'TV Series' : 'Movie'}
              </span>
              <span className="text-xs text-neutral-500">•</span>
              <span className="text-[11px] text-neutral-400">{activePlayingItem.releaseYear}</span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-white uppercase tracking-tight line-clamp-1">
              {activePlayingItem.title}
            </h2>
          </div>
        </div>

        {/* Discreet Toolbar: Sandbox Badge + TV Episode + Server Switcher + Fullscreen */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
          {/* Relentless Sandbox Indicator Badge */}
          <div
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-[11px] font-semibold tracking-wide backdrop-blur-sm shadow-sm select-none"
            title="Relentless Sandbox Active: All popups, ad redirects, and tab hijackers are automatically blocked"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span>Relentless Sandbox</span>
          </div>
          {/* TV Episode Selector */}
          {isTv && (
            <div className="flex items-center space-x-1.5 bg-black/70 border border-white/15 px-2.5 py-1 rounded backdrop-blur-sm">
              <Tv className="w-3.5 h-3.5 text-netflix-red hidden sm:inline" />
              <div className="flex items-center space-x-1">
                <span className="text-neutral-400 font-medium">S:</span>
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
                <span className="text-neutral-400 font-medium">E:</span>
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
              className="flex items-center space-x-1.5 bg-black/70 hover:bg-neutral-900 text-white font-medium px-2.5 py-1 rounded border border-white/20 shadow-md transition-colors backdrop-blur-sm"
              title="Change Streaming Server"
            >
              <Server className="w-3.5 h-3.5 text-netflix-red" />
              <span className="hidden sm:inline">
                {serverOptions.find((s) => s.id === activeServer)?.label}
              </span>
              <span className="sm:hidden">Server</span>
              <ChevronDown className="w-3 h-3 text-neutral-400 ml-0.5" />
            </button>

            {showServerMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0c0c0c] border border-neutral-800 rounded-lg shadow-2xl py-1.5 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-800">
                  Switch Server
                </div>
                {serverOptions.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setActiveServer(srv.id);
                      setShowServerMenu(false);
                      setIsLoading(true);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-neutral-900 transition-colors ${
                      activeServer === srv.id
                        ? 'text-netflix-red font-bold bg-neutral-900/60'
                        : 'text-neutral-300'
                    }`}
                  >
                    <span>{srv.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
            title="Toggle Fullscreen (f)"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Pure Cinema Video Player (Zero Bottom Clutter) */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 space-y-3">
            <div className="w-10 h-10 border-3 border-netflix-red border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-neutral-500 font-medium">Loading cinema stream...</p>
          </div>
        )}

        {/* Embedded Streaming Player */}
        {isEmbedServer ? (
          <iframe
            key={`${activeServer}-${season}-${episode}`}
            src={streamUrl}
            title={activePlayingItem.title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            referrerPolicy="origin"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
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
    </div>
  );
}
