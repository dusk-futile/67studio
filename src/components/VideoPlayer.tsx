'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Maximize,
  Minimize,
  Sparkles,
  Server,
  ChevronDown,
  Tv,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTmdbTrailerKey } from '../services/mediaService';
import Hls from 'hls.js';

export type ServerType =
  | 'vidsrc'
  | 'vidlink'
  | 'vidsrc_me'
  | 'multiembed'
  | 'twoembed'
  | 'vidsrc_pm'
  | 'trailer';

export interface ServerOption {
  id: ServerType;
  name: string;
  badge: string;
  description: string;
}

const SERVER_OPTIONS: ServerOption[] = [
  {
    id: 'vidsrc',
    name: 'Server 1: VidSrc',
    badge: 'Fast CDN 1080p',
    description: 'High speed, recommended for movies and series',
  },
  {
    id: 'vidlink',
    name: 'Server 2: VidLink',
    badge: 'Ultra HD • Subtitles',
    description: '1080p with multi-language subtitle tracks',
  },
  {
    id: 'vidsrc_me',
    name: 'Server 3: VidSrc.me',
    badge: 'High Compatibility',
    description: 'Alternative high-speed video mirror',
  },
  {
    id: 'multiembed',
    name: 'Server 4: MultiEmbed',
    badge: 'Multi-Source',
    description: 'Aggregated multi-provider stream mirror',
  },
  {
    id: 'twoembed',
    name: 'Server 5: 2Embed',
    badge: 'Global Mirror',
    description: 'Worldwide high-reliability backup stream',
  },
  {
    id: 'vidsrc_pm',
    name: 'Server 6: VidSrc PM',
    badge: 'Cloud Backup',
    description: 'Direct cloud distribution mirror',
  },
  {
    id: 'trailer',
    name: 'Server 7: 4K Trailer',
    badge: 'Cinema 4K',
    description: 'Official theatrical 4K preview',
  },
];

const FALLBACK_CHAIN: ServerType[] = [
  'vidsrc',
  'vidlink',
  'vidsrc_me',
  'multiembed',
  'twoembed',
  'vidsrc_pm',
  'trailer',
];

export default function VideoPlayer() {
  const { activePlayingItem, stopMedia, updateWatchProgress } = useApp();
  const [activeServer, setActiveServer] = useState<ServerType>('vidsrc');
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [youtubeKey, setYoutubeKey] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const serverMenuRef = useRef<HTMLDivElement>(null);
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

  // Close server dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serverMenuRef.current && !serverMenuRef.current.contains(e.target as Node)) {
        setShowServerMenu(false);
      }
    };
    if (showServerMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showServerMenu]);

  // Automatic Server Failover Switcher
  const handleNextServer = useCallback((reason?: string) => {
    const currentIndex = FALLBACK_CHAIN.indexOf(activeServer);
    const nextIndex = (currentIndex + 1) % FALLBACK_CHAIN.length;
    const nextSrv = FALLBACK_CHAIN[nextIndex];
    setActiveServer(nextSrv);
    setIsLoading(true);
    showToast(reason || `Switched to ${SERVER_OPTIONS.find((s) => s.id === nextSrv)?.name}`);
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
    if (!activePlayingItem || !isLoading || activeServer === 'trailer') return;

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
      case 'vidsrc':
        return isTv
          ? `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`
          : `https://vidsrc.to/embed/movie/${tmdbId}`;

      case 'vidlink':
        return isTv
          ? `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}?autoplay=true&primaryColor=e50914&secondaryColor=141414&iconColor=ffffff`
          : `https://vidlink.pro/movie/${tmdbId}?autoplay=true&primaryColor=e50914&secondaryColor=141414&iconColor=ffffff`;

      case 'vidsrc_me':
        return isTv
          ? `https://vidsrcme.ru/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`
          : `https://vidsrcme.ru/embed/movie?tmdb=${tmdbId}`;

      case 'multiembed':
        return isTv
          ? `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`
          : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;

      case 'twoembed':
        return isTv
          ? `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`
          : `https://www.2embed.cc/embed/${tmdbId}`;

      case 'vidsrc_pm':
        return isTv
          ? `https://vidsrc.pm/embed/tv/${tmdbId}/${season}/${episode}`
          : `https://vidsrc.pm/embed/movie/${tmdbId}`;

      case 'trailer':
        if (youtubeKey) {
          return `https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`;
        }
        return activePlayingItem.trailerUrl || '';

      default:
        return activePlayingItem.videoUrl || activePlayingItem.trailerUrl || '';
    }
  };

  const streamUrl = getStreamUrl();
  const isEmbedServer =
    activeServer === 'vidsrc' ||
    activeServer === 'vidlink' ||
    activeServer === 'vidsrc_me' ||
    activeServer === 'multiembed' ||
    activeServer === 'twoembed' ||
    activeServer === 'vidsrc_pm' ||
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

  const currentSeasonObj = activePlayingItem.seasons?.find((s) => s.seasonNumber === season);
  const activeServerObj = SERVER_OPTIONS.find((s) => s.id === activeServer);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* 
        Top Navigation Bar:
        - Left: Back to Main Website (effortless clean exit)
        - Center: Movie Title + Year
        - Right: TV Episode Picker + Server Selector Dropdown + Full Screen
      */}
      <div className="absolute top-0 inset-x-0 px-3 sm:px-6 py-3.5 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between z-50 pointer-events-none opacity-95 hover:opacity-100 transition-opacity">
        {/* Left: Back to Main Website */}
        <div className="pointer-events-auto flex items-center space-x-3">
          <button
            onClick={handleCleanExit}
            className="flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-full bg-netflix-red hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-xl shadow-red-950/60 border border-red-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Back to Main Website"
            title="Close Movie and Return to Main Website (Esc)"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span className="hidden xs:inline">Back to Main Website</span>
            <span className="xs:hidden">Back</span>
          </button>
        </div>

        {/* Center: Movie Title */}
        <div className="pointer-events-none hidden md:flex items-baseline space-x-2 max-w-sm lg:max-w-md truncate">
          <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight truncate drop-shadow-md">
            {activePlayingItem.title}
          </h2>
          {activePlayingItem.releaseYear && (
            <span className="text-[10px] text-neutral-400 shrink-0 font-medium">
              ({activePlayingItem.releaseYear})
            </span>
          )}
        </div>

        {/* Right Controls: TV S/E + Server Selector + Fullscreen */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* TV Season & Episode Selectors */}
          {isTv && (
            <div className="flex items-center space-x-1 bg-neutral-900/90 border border-white/20 px-2 py-1 rounded-full shadow-lg backdrop-blur-md text-xs">
              <Tv className="w-3 h-3 text-netflix-red" />
              <div className="flex items-center space-x-0.5">
                <span className="text-[10px] text-neutral-400 font-medium">S:</span>
                <select
                  value={season}
                  onChange={(e) => {
                    setSeason(Number(e.target.value));
                    setEpisode(1);
                    setIsLoading(true);
                  }}
                  className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
                >
                  {(activePlayingItem.seasons && activePlayingItem.seasons.length > 0
                    ? activePlayingItem.seasons.map((s) => s.seasonNumber)
                    : [1, 2, 3, 4, 5, 6, 7, 8]
                  ).map((s) => (
                    <option key={s} value={s} className="bg-neutral-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-0.5 ml-1 border-l border-neutral-700 pl-1">
                <span className="text-[10px] text-neutral-400 font-medium">E:</span>
                <select
                  value={episode}
                  onChange={(e) => {
                    setEpisode(Number(e.target.value));
                    setIsLoading(true);
                  }}
                  className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
                >
                  {(
                    currentSeasonObj?.episodes.map((ep) => ep.episodeNumber) ||
                    Array.from({ length: 24 }, (_, i) => i + 1)
                  ).map((ep) => (
                    <option key={ep} value={ep} className="bg-neutral-900 text-white">
                      {ep}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Server Selector Dropdown */}
          <div ref={serverMenuRef} className="relative">
            <button
              onClick={() => setShowServerMenu((prev) => !prev)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-xs border border-white/20 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              title="Choose Stream Server"
            >
              <Server className="w-3.5 h-3.5 text-netflix-red" />
              <span className="hidden sm:inline text-neutral-300">Server:</span>
              <span className="font-bold text-white max-w-[90px] sm:max-w-none truncate">
                {activeServerObj?.name.replace('Server ', 'S').split(':')[1]?.trim() || activeServer}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {showServerMenu && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-[#0d0d0d]/95 border border-neutral-700 rounded-xl shadow-2xl py-2 z-50 text-xs backdrop-blur-xl divide-y divide-neutral-800/80 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Choose Streaming Server</span>
                  <span className="text-emerald-400 font-mono text-[9px]">Multi-Server Active</span>
                </div>
                <div className="py-1 max-h-72 overflow-y-auto space-y-0.5">
                  {SERVER_OPTIONS.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        setActiveServer(srv.id);
                        setShowServerMenu(false);
                        setIsLoading(true);
                        showToast(`Switched to ${srv.name}`);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-neutral-800/80 transition-colors ${
                        activeServer === srv.id
                          ? 'text-netflix-red font-bold bg-neutral-900/90'
                          : 'text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        {activeServer === srv.id ? (
                          <Check className="w-3.5 h-3.5 text-netflix-red flex-shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        <div className="flex flex-col truncate">
                          <span className="font-semibold text-xs text-white truncate">{srv.name}</span>
                          <span className="text-[10px] text-neutral-500 truncate">{srv.description}</span>
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono shrink-0 ml-2">
                        {srv.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full Screen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wide shadow-xl border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
            title={isFullscreen ? 'Exit Full Screen (F)' : 'Full Screen (F)'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4 text-netflix-red" />
                <span className="hidden sm:inline">Exit Full Screen</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Status Toast for Server Switch or Notification */}
      {toastMessage && (
        <div className="absolute top-16 z-50 px-4 py-1.5 rounded-full bg-black/95 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-netflix-red animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Pure Cinema Video Canvas */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {/* Interactive Loading Screen with Quick Server Switch Pills */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 space-y-4 px-4 text-center">
            <div className="w-10 h-10 border-2 border-netflix-red border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                Loading {activeServerObj?.name}...
              </p>
              <p className="text-xs text-neutral-400">
                If the movie does not start in a few seconds, click another server:
              </p>
            </div>

            {/* Quick Server Switch Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl pt-2">
              {SERVER_OPTIONS.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => {
                    setActiveServer(srv.id);
                    setIsLoading(true);
                    showToast(`Switched to ${srv.name}`);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeServer === srv.id
                      ? 'bg-netflix-red border-red-500 text-white shadow-lg shadow-red-950/60'
                      : 'bg-neutral-900/90 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-500 hover:text-white'
                  }`}
                >
                  {srv.name.split(':')[0]} ({srv.badge.split('•')[0].trim()})
                </button>
              ))}
            </div>
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
            referrerPolicy="no-referrer"
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
