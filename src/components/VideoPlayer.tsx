'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Maximize, Minimize, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTmdbTrailerKey } from '../services/mediaService';
import Hls from 'hls.js';

type ServerType = 'vidlink' | 'vidsrc' | 'server1' | 'server3' | 'vidlove' | 'server4' | 'direct' | 'trailer';

const FALLBACK_CHAIN: ServerType[] = [
  'vidlink',  // 1: VidLink Ultra HD (1080p, Auto-Subtitles)
  'vidsrc',   // 2: VidSrc 4K (Fast CDN)
  'server1',  // 3: AutoEmbed
  'server3',  // 4: MultiEmbed
  'vidlove',  // 5: VidLove HD
  'server4',  // 6: 2Embed
  'direct',   // 7: Direct HLS / MP4 Native
  'trailer',  // 8: Cinema 4K
];

export default function VideoPlayer() {
  const { activePlayingItem, stopMedia, updateWatchProgress } = useApp();
  const [activeServer, setActiveServer] = useState<ServerType>('vidlink');
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [youtubeKey, setYoutubeKey] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingFailoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCleanExitRef = useRef(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Automatic Server Failover Switcher (100% background automated)
  const handleNextServer = useCallback((reason?: string) => {
    const currentIndex = FALLBACK_CHAIN.indexOf(activeServer);
    const nextIndex = (currentIndex + 1) % FALLBACK_CHAIN.length;
    const nextSrv = FALLBACK_CHAIN[nextIndex];
    setActiveServer(nextSrv);
    setIsLoading(true);
    showToast(reason || 'Auto-switching to fastest backup stream...');
  }, [activeServer, showToast]);

  // Anti-Redirect, Pop-under & Drag-Drop Shield Engine
  useEffect(() => {
    if (!activePlayingItem || typeof window === 'undefined') return;

    isCleanExitRef.current = false;

    // 1. Safely intercept programmatic popup / new-tab window.open attempts
    let originalOpen: typeof window.open | undefined;
    try {
      originalOpen = window.open;
      window.open = function (...args: any[]) {
        console.warn('[lana67 Shield] Neutralized external ad popup attempt:', args);
        return null;
      };
    } catch (e) {
      // Non-writable in certain strict environments; ignore safely
    }

    // 2. Prevent window defocus / popunder tab stealing
    const handleBlur = () => {
      setTimeout(() => {
        if (document.activeElement?.tagName !== 'IFRAME') {
          window.focus();
        }
      }, 80);
    };

    // 3. Stop mouse dragging or dropped links from navigating away from lana67
    const preventDragAndDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleAuxClick = (e: MouseEvent) => {
      if (e.button !== 0) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('dragstart', preventDragAndDrop, true);
    window.addEventListener('dragover', preventDragAndDrop, true);
    window.addEventListener('dragenter', preventDragAndDrop, true);
    window.addEventListener('dragleave', preventDragAndDrop, true);
    window.addEventListener('drop', preventDragAndDrop, true);
    window.addEventListener('auxclick', handleAuxClick, true);

    return () => {
      try {
        if (originalOpen) {
          window.open = originalOpen;
        }
      } catch (e) {
        // Ignore
      }
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('dragstart', preventDragAndDrop, true);
      window.removeEventListener('dragover', preventDragAndDrop, true);
      window.removeEventListener('dragenter', preventDragAndDrop, true);
      window.removeEventListener('dragleave', preventDragAndDrop, true);
      window.removeEventListener('drop', preventDragAndDrop, true);
      window.removeEventListener('auxclick', handleAuxClick, true);
    };
  }, [activePlayingItem]);

  // Initialize player state when media changes
  useEffect(() => {
    if (!activePlayingItem) return;

    setIsLoading(true);
    setActiveServer('vidlink');
    setSeason(activePlayingItem.selectedSeason || 1);
    setEpisode(activePlayingItem.selectedEpisode || 1);

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

  // Track real viewing progress only when user actually watches
  useEffect(() => {
    if (!activePlayingItem) return;

    const itemKey = activePlayingItem.type === 'tv'
      ? `ep-${activePlayingItem.tmdbId || activePlayingItem.id}-${season}-${episode}`
      : activePlayingItem.id;

    // Record initial 15% after 5 seconds of watching
    const timer1 = setTimeout(() => {
      updateWatchProgress(itemKey, 15);
    }, 5000);

    // Record 50% after 30 seconds
    const timer2 = setTimeout(() => {
      updateWatchProgress(itemKey, 50);
    }, 30000);

    // Record 85% after 60 seconds
    const timer3 = setTimeout(() => {
      updateWatchProgress(itemKey, 85);
    }, 60000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activePlayingItem, season, episode, updateWatchProgress]);

  // Automatic Timeout Failover: If server is stuck loading for > 8.5s, auto-failover to next server
  useEffect(() => {
    if (!activePlayingItem || !isLoading || activeServer === 'trailer' || activeServer === 'direct') return;

    if (loadingFailoverTimeoutRef.current) {
      clearTimeout(loadingFailoverTimeoutRef.current);
    }

    loadingFailoverTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        handleNextServer('Stream loading slow. Auto-switching to backup server...');
      }
    }, 8500);

    return () => {
      if (loadingFailoverTimeoutRef.current) clearTimeout(loadingFailoverTimeoutRef.current);
    };
  }, [activePlayingItem, isLoading, activeServer, handleNextServer]);

  // Clean exit helper: exits fullscreen if active and returns directly to the main page
  const handleCleanExit = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    isCleanExitRef.current = true;
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    stopMedia();
  }, [stopMedia]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Sync browser fullscreen state changes automatically
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation & remote control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePlayingItem) return;

      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          handleCleanExit();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingItem, handleCleanExit, toggleFullscreen]);

  const tmdbId = activePlayingItem?.tmdbId;
  const isTv = activePlayingItem?.type === 'tv';

  const getStreamUrl = (): string => {
    if (!activePlayingItem) return '';
    if (!tmdbId) {
      return activePlayingItem.videoUrl || activePlayingItem.trailerUrl || '';
    }

    switch (activeServer) {
      case 'vidlink':
        return isTv
          ? `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}?autoplay=true&primaryColor=e50914&secondaryColor=141414&iconColor=ffffff&title=false&nextbutton=true`
          : `https://vidlink.pro/movie/${tmdbId}?autoplay=true&primaryColor=e50914&secondaryColor=141414&iconColor=ffffff&title=false&nextbutton=true`;

      case 'vidsrc':
        return isTv
          ? `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`
          : `https://vidsrc.to/embed/movie/${tmdbId}`;

      case 'server1':
        return isTv
          ? `https://autoembed.co/tv/tmdb/${tmdbId}/${season}/${episode}`
          : `https://autoembed.co/movie/tmdb/${tmdbId}`;

      case 'server3':
        return isTv
          ? `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`
          : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;

      case 'vidlove':
        return isTv
          ? `https://player.vidlove.cc/embed/tv/${tmdbId}/${season}/${episode}?autoplay=true&primarycolor=e50914&server=Dark`
          : `https://player.vidlove.cc/embed/movie/${tmdbId}?autoplay=true&primarycolor=e50914&server=Dark`;

      case 'server4':
        return isTv
          ? `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`
          : `https://www.2embed.cc/embed/${tmdbId}`;

      case 'trailer':
        if (youtubeKey) {
          return `https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`;
        }
        return activePlayingItem.trailerUrl || '';

      case 'direct':
      default:
        return activePlayingItem.videoUrl || activePlayingItem.trailerUrl || '';
    }
  };

  const streamUrl = getStreamUrl();
  const isEmbedServer =
    activeServer === 'vidlink' ||
    activeServer === 'vidsrc' ||
    activeServer === 'server1' ||
    activeServer === 'server3' ||
    activeServer === 'vidlove' ||
    activeServer === 'server4' ||
    (activeServer === 'trailer' && !!youtubeKey);

  // Direct Native HLS (.m3u8) / MP4 Streaming Engine with Hls.js
  useEffect(() => {
    if (!activePlayingItem || isEmbedServer || !videoRef.current || !streamUrl || typeof window === 'undefined') return;

    if (streamUrl.includes('.m3u8') && Hls && Hls.isSupported()) {
      let hls: Hls | null = null;
      try {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          videoRef.current?.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            handleNextServer('Direct stream error. Switching to backup server...');
          }
        });
      } catch (err) {
        console.warn('HLS initialization error:', err);
      }
      return () => {
        if (hls) {
          try {
            hls.destroy();
          } catch (e) {
            // ignore
          }
        }
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl') && streamUrl.includes('.m3u8')) {
      videoRef.current.src = streamUrl;
    }
  }, [activePlayingItem, isEmbedServer, streamUrl, handleNextServer]);

  if (!activePlayingItem) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* 
        Two-Option Ultra-Clean Header Bar:
        Option 1 (Left): Back to Main Website / Remove movie
        Option 2 (Right): Full Screen / Exit Full Screen
        Always visible & clickable so user NEVER gets stuck!
      */}
      <div className="absolute top-0 inset-x-0 px-4 sm:px-6 py-3.5 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between z-50 pointer-events-none opacity-95 hover:opacity-100 transition-opacity">
        {/* Option 1: Back to Main Website / Remove Movie */}
        <div className="pointer-events-auto flex items-center space-x-3">
          <button
            onClick={handleCleanExit}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-netflix-red hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-xl shadow-red-950/60 border border-red-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Back to Main Website"
            title="Close Movie and Return to Main Website (Esc)"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Back to Main Website</span>
          </button>
        </div>

        {/* Center: Movie Title */}
        <div className="pointer-events-none flex items-baseline space-x-2 max-w-[200px] sm:max-w-md md:max-w-lg truncate">
          <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight truncate drop-shadow-md">
            {activePlayingItem.title}
          </h2>
          {activePlayingItem.releaseYear && (
            <span className="text-[10px] text-neutral-400 shrink-0 font-medium hidden sm:inline">
              ({activePlayingItem.releaseYear})
            </span>
          )}
        </div>

        {/* Option 2: Full Screen Toggle */}
        <div className="pointer-events-auto flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wide shadow-xl border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
            title={isFullscreen ? 'Exit Full Screen (F)' : 'Full Screen (F)'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4 text-netflix-red" />
                <span>Exit Full Screen</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4 text-white" />
                <span>Full Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Status Toast for Auto-Failover */}
      {toastMessage && (
        <div className="absolute top-16 z-50 px-4 py-1.5 rounded-full bg-black/95 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-netflix-red animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Pure Cinema Video Canvas */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 space-y-3">
            <div className="w-8 h-8 border-2 border-netflix-red border-t-transparent rounded-full animate-spin" />
            <p className="text-[11px] text-neutral-400 font-medium">Connecting to stream...</p>
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
            referrerPolicy="origin"
            onLoad={() => setIsLoading(false)}
            onError={() => handleNextServer('Connection interrupted. Auto-switching stream server...')}
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
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.duration > 0) {
                const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                const itemKey = activePlayingItem.type === 'tv'
                  ? `ep-${activePlayingItem.tmdbId || activePlayingItem.id}-${season}-${episode}`
                  : activePlayingItem.id;
                updateWatchProgress(itemKey, pct);
              }
            }}
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
