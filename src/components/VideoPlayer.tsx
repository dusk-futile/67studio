'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Home,
  Server,
  Tv,
  Maximize,
  Minimize,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTmdbTrailerKey } from '../services/mediaService';
import Hls from 'hls.js';

type ServerType = 'vidlink' | 'vidsrc' | 'server1' | 'server3' | 'vidlove' | 'server4' | 'direct' | 'trailer';

const FALLBACK_CHAIN: ServerType[] = [
  'vidlink',  // 1: VidLink Ultra HD (1080p, Auto-Subtitles, High Bitrate)
  'vidsrc',   // 2: VidSrc 4K (Fast CDN Buffer)
  'server1',  // 3: AutoEmbed Clean
  'server3',  // 4: MultiEmbed
  'vidlove',  // 5: VidLove Dark
  'server4',  // 6: 2Embed
  'direct',   // 7: Direct HLS / MP4 Native
  'trailer',  // 8: Pure Cinema 4K
];

export default function VideoPlayer() {
  const { activePlayingItem, stopMedia, updateWatchProgress } = useApp();
  const [activeServer, setActiveServer] = useState<ServerType>('vidlink');
  const [adShieldMode, setAdShieldMode] = useState<'standard' | 'strict'>('standard');
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [youtubeKey, setYoutubeKey] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingFailoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCleanExitRef = useRef(false);

  const serverOptions: Array<{ id: ServerType; label: string; tag: string }> = [
    { id: 'vidlink', label: 'Server 1: VidLink Ultra HD', tag: '1080p • Auto-Subtitles' },
    { id: 'vidsrc', label: 'Server 2: VidSrc 4K', tag: 'Fast CDN' },
    { id: 'server1', label: 'Server 3: AutoEmbed', tag: 'Multi-Source' },
    { id: 'server3', label: 'Server 4: MultiEmbed', tag: 'Alternative' },
    { id: 'vidlove', label: 'Server 5: VidLove HD', tag: 'Dark Stream' },
    { id: 'server4', label: 'Server 6: 2Embed', tag: 'Backup' },
    { id: 'direct', label: 'Direct HLS / MP4 Stream', tag: '100% Zero Ads Native' },
    { id: 'trailer', label: 'Official 4K Cinema Trailer', tag: 'Ad-Free 4K' },
  ];

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const toggleAdShield = useCallback(() => {
    setAdShieldMode((prev) => {
      const next = prev === 'standard' ? 'strict' : 'standard';
      showToast(
        next === 'strict'
          ? 'Ad-Shield: Strict Sandbox active (blocks popups, may restrict some servers)'
          : 'Ad-Shield: Standard mode active (100% video playback enabled)'
      );
      return next;
    });
  }, [showToast]);

  // Automatic Server Failover Switcher
  const handleNextServer = useCallback((reason?: string) => {
    const currentIndex = FALLBACK_CHAIN.indexOf(activeServer);
    const nextIndex = (currentIndex + 1) % FALLBACK_CHAIN.length;
    const nextSrv = FALLBACK_CHAIN[nextIndex];
    setActiveServer(nextSrv);
    setIsLoading(true);
    showToast(reason || `Auto-switching to ${serverOptions.find((s) => s.id === nextSrv)?.label}...`);
  }, [activeServer, serverOptions, showToast]);

  // Anti-Redirect and Host Window Shield Engine
  useEffect(() => {
    if (!activePlayingItem || typeof window === 'undefined') return;

    isCleanExitRef.current = false;

    // 1. Safely intercept programmatic popup / new-tab window.open attempts on parent window
    let originalOpen: typeof window.open | undefined;
    try {
      originalOpen = window.open;
      window.open = function (...args: any[]) {
        console.warn('[67studio Shield] Neutralized external ad popup attempt:', args);
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

    window.addEventListener('blur', handleBlur);

    return () => {
      try {
        if (originalOpen) {
          window.open = originalOpen;
        }
      } catch (e) {
        // Ignore
      }
      window.removeEventListener('blur', handleBlur);
    };
  }, [activePlayingItem]);

  // Initialize player state when media changes
  useEffect(() => {
    if (!activePlayingItem) return;

    setIsLoading(true);
    setActiveServer('vidlink');
    setSeason(activePlayingItem.selectedSeason || 1);
    setEpisode(activePlayingItem.selectedEpisode || 1);
    setAreControlsVisible(true);
    setShowKeyboardGuide(true);

    const guideTimer = setTimeout(() => {
      setShowKeyboardGuide(false);
    }, 3500);

    if (activePlayingItem.youtubeKey) {
      setYoutubeKey(activePlayingItem.youtubeKey);
    } else if (activePlayingItem.tmdbId) {
      getTmdbTrailerKey(activePlayingItem.tmdbId, activePlayingItem.type).then((key) => {
        if (key) setYoutubeKey(key);
      });
    } else {
      setYoutubeKey(undefined);
    }

    return () => clearTimeout(guideTimer);
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

  // Automatic Timeout Failover: If server is stuck loading for > 8s, auto-failover to next server
  useEffect(() => {
    if (!activePlayingItem || !isLoading || activeServer === 'trailer' || activeServer === 'direct') return;

    if (loadingFailoverTimeoutRef.current) {
      clearTimeout(loadingFailoverTimeoutRef.current);
    }

    loadingFailoverTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        if (adShieldMode === 'strict') {
          setAdShieldMode('standard');
          showToast('Strict sandbox restricted stream. Switched to Standard mode for smooth video.');
        } else {
          handleNextServer('Server taking too long. Auto-switching to backup stream...');
        }
      }
    }, 8500);

    return () => {
      if (loadingFailoverTimeoutRef.current) clearTimeout(loadingFailoverTimeoutRef.current);
    };
  }, [activePlayingItem, isLoading, activeServer, adShieldMode, handleNextServer, showToast]);

  // Minimalist auto-hide: fades out all controls & cursor after 1.5s of mouse idle
  const handleMouseMove = () => {
    setAreControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setAreControlsVisible(false);
      setShowServerMenu(false);
    }, 1600);
  };

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
    setAreControlsVisible(true);
  }, []);

  // Sync browser fullscreen state changes automatically
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);
      setAreControlsVisible(true);
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
          setAreControlsVisible(true);
        } else {
          handleCleanExit();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        handleNextServer('Manually switched server.');
      } else if (e.key === 's' || e.key === 'S') {
        toggleAdShield();
      } else if (e.key === 'ArrowRight' && activePlayingItem.type === 'tv') {
        setEpisode((prev) => prev + 1);
        setIsLoading(true);
        showToast(`Skipped to Episode ${episode + 1}`);
      } else if (e.key === 'ArrowLeft' && activePlayingItem.type === 'tv' && episode > 1) {
        setEpisode((prev) => Math.max(1, prev - 1));
        setIsLoading(true);
        showToast(`Episode ${episode - 1}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingItem, episode, handleNextServer, toggleAdShield, showToast]);

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

  /**
   * Ad-Shield Sandbox Policy:
   * When 'strict', sandboxes the iframe to block all popup tabs.
   * When 'standard', removes sandbox restrictions allowing high-bitrate video streams,
   * DRM/EME decoders, and subtitles to play without "disable sandbox" errors.
   */
  const getSandboxPolicy = (): string | undefined => {
    if (adShieldMode === 'strict') {
      return 'allow-scripts allow-same-origin allow-forms allow-presentation';
    }
    return undefined;
  };

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

  // All React Hooks have executed unconditionally above this line.
  if (!activePlayingItem) return null;

  const currentSeasonObj = activePlayingItem.seasons?.find((s) => s.seasonNumber === season);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden transition-all duration-300 ${
        !areControlsVisible ? 'cursor-none' : 'cursor-default'
      }`}
    >
      {/* Ultra-Minimalist Top Navigation Bar */}
      <div
        className={`absolute top-0 inset-x-0 px-4 sm:px-6 py-3 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between z-40 transition-opacity duration-300 ${
          areControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Left: Prominent Back to Main Page Button & Compact Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCleanExit}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-netflix-red/90 hover:bg-netflix-red text-white border border-red-500/40 shadow-lg shadow-red-950/40 transition-all hover:scale-105 active:scale-95 group cursor-pointer pointer-events-auto"
            aria-label="Back to Main Page"
            title="Return to Main Page to Browse Movies (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-white" />
            <span className="text-xs font-bold tracking-wide">Main Page</span>
          </button>

          <div className="flex items-baseline space-x-2 max-w-xs sm:max-w-sm md:max-w-md truncate">
            <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight truncate">
              {activePlayingItem.title}
            </h2>
            <span className="text-[10px] text-neutral-400 shrink-0 font-medium">
              {isTv ? `S${season} · E${episode}` : `${activePlayingItem.releaseYear}`}
            </span>
          </div>
        </div>

        {/* Right: Ultra-Compact Controls (Season, Episode, Server, Fullscreen) */}
        <div className="flex items-center space-x-2 text-xs">
          {/* TV Season & Episode Selectors */}
          {isTv && (
            <div className="flex items-center space-x-1 bg-black/60 border border-white/15 px-2 py-1 rounded backdrop-blur-sm">
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
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                  ).map((s) => (
                    <option key={s} value={s} className="bg-neutral-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-0.5 ml-1.5">
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

          {/* Minimalist Server Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowServerMenu((prev) => !prev)}
              className="flex items-center space-x-1.5 bg-black/60 hover:bg-neutral-900 text-white font-medium px-2.5 py-1 rounded border border-white/15 shadow-sm transition-colors backdrop-blur-sm text-xs"
              title="Switch Stream Server"
            >
              <Server className="w-3 h-3 text-netflix-red" />
              <span className="hidden sm:inline text-[11px] font-semibold">
                {serverOptions.find((s) => s.id === activeServer)?.label.split(':')[1] || 'Server'}
              </span>
              <span className="sm:hidden text-[11px]">Server</span>
              <ChevronDown className="w-2.5 h-2.5 text-neutral-400 ml-0.5" />
            </button>

            {showServerMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0e0e0e] border border-neutral-800 rounded-lg shadow-2xl py-1 z-50 text-xs divide-y divide-neutral-800/60">
                <div className="px-3 py-1 text-[9px] font-bold text-neutral-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Stream Servers</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Auto-Failover Active</span>
                </div>
                <div className="py-1">
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
                      <span className="text-[11px]">{srv.label}</span>
                      <span className="text-[9px] text-neutral-500 font-mono">{srv.tag}</span>
                    </button>
                  ))}
                </div>
                <div className="px-3 py-1.5 bg-black/40">
                  <button
                    onClick={() => handleNextServer()}
                    className="w-full text-center text-[10px] text-neutral-400 hover:text-white font-medium flex items-center justify-center space-x-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Auto-Switch Server [N]</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ad Shield Mode Toggle */}
          <button
            onClick={toggleAdShield}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border shadow-sm transition-colors backdrop-blur-sm text-xs ${
              adShieldMode === 'strict'
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
                : 'bg-black/60 border-white/15 text-emerald-400 hover:bg-neutral-900'
            }`}
            title={`Toggle Ad Shield Mode (Current: ${adShieldMode === 'strict' ? 'Strict Sandbox' : 'Standard Compatibility'}) [S]`}
          >
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px] font-semibold">
              {adShieldMode === 'strict' ? 'Shield: Strict' : 'Shield: Standard'}
            </span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-white/10 text-white flex items-center justify-center border border-white/15 transition-colors"
            title="Toggle Fullscreen (f)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Top Hover Wake-up Trigger: Hovering near top immediately reveals controls */}
      <div
        onMouseEnter={() => setAreControlsVisible(true)}
        className="absolute top-0 inset-x-0 h-14 z-30 pointer-events-auto"
      />

      {/* Persistent Floating "Main Page" Button (Always visible and accessible even when controls auto-hide) */}
      <div
        className={`absolute top-3 left-4 z-40 transition-opacity duration-300 ${
          areControlsVisible ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100 pointer-events-auto'
        }`}
      >
        <button
          onClick={handleCleanExit}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/85 hover:bg-neutral-900 text-white border border-white/25 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-xs font-bold cursor-pointer"
          title="Return to Main Page to Browse Movies (Esc)"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-netflix-red" />
          <span>Main Page</span>
        </button>
      </div>

      {/* Floating Status Toast (Auto-Failover Alert) */}
      {toastMessage && (
        <div className="absolute top-16 z-50 px-3.5 py-1.5 rounded-full bg-black/90 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-netflix-red animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Ephemeral Keyboard Guide (Fades out automatically) */}
      {showKeyboardGuide && (
        <div className="absolute bottom-6 z-40 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-neutral-300 text-[10px] backdrop-blur-md shadow-lg flex items-center space-x-2 transition-opacity duration-700 pointer-events-none">
          <span className="font-mono text-white">[Esc]</span> Main Page •
          <span className="font-mono text-white">[F]</span> Fullscreen •
          <span className="font-mono text-white">[N]</span> Next Server •
          <span className="font-mono text-white">[S]</span> Shield Mode •
          <span className="font-mono text-white">[←/→]</span> Prev/Next Ep
        </div>
      )}

      {/* Pure Cinema Video Canvas */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 space-y-3">
            <div className="w-8 h-8 border-2 border-netflix-red border-t-transparent rounded-full animate-spin" />
            <p className="text-[11px] text-neutral-400 font-medium">Connecting to cinema stream...</p>
          </div>
        )}

        {/* Embedded Streaming Player with Smart Ad Shield */}
        {isEmbedServer ? (
          <iframe
            key={`${activeServer}-${season}-${episode}-${adShieldMode}`}
            src={streamUrl}
            title={activePlayingItem.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            referrerPolicy="origin"
            sandbox={getSandboxPolicy()}
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
