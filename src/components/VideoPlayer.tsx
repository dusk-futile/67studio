'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  MessageSquare,
  FastForward,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function VideoPlayer() {
  const { activePlayingItem, stopMedia } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState('English [Original] (5.1)');
  const [selectedSubtitle, setSelectedSubtitle] = useState('English [CC]');

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls on mouse idle
  const handleMouseMove = () => {
    setAreControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setAreControlsVisible(false);
        setShowSpeedMenu(false);
        setShowAudioMenu(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePlayingItem) return;
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'Escape') {
        stopMedia();
      } else if (e.key === 'f') {
        toggleFullscreen();
      } else if (e.key === 'm') {
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        handleSeekForward();
      } else if (e.key === 'ArrowLeft') {
        handleSeekBackward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingItem, isPlaying, isMuted, volume]);

  if (!activePlayingItem) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const handleSeekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleSeekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMute = !isMuted;
    videoRef.current.muted = newMute;
    setIsMuted(newMute);
    if (!newMute && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden cursor-auto"
      style={{ cursor: areControlsVisible ? 'default' : 'none' }}
    >
      {/* HTML5 Video Source */}
      <video
        ref={videoRef}
        src={activePlayingItem.videoUrl || activePlayingItem.trailerUrl}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />

      {/* Top Bar (Back Button + Title) */}
      <div
        className={`absolute top-0 inset-x-0 p-6 md:p-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center space-x-4 transition-opacity duration-300 z-40 ${
          areControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={stopMedia}
          className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Back to Browse"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
            {activePlayingItem.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            {activePlayingItem.quality} • {activePlayingItem.audioChannels || 'Dolby Atmos'}
          </p>
        </div>
      </div>

      {/* Center Big Play/Pause Ripple on Click */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 z-30 cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full bg-netflix-red/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <Play className="w-10 h-10 fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Bottom Controls HUD */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 sm:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent space-y-3 transition-opacity duration-300 z-40 ${
          areControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Bar */}
        <div className="relative group/scrubber flex items-center cursor-pointer">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-neutral-700/80 rounded-lg appearance-none cursor-pointer accent-netflix-red group-hover/scrubber:h-2.5 transition-all"
            style={{
              background: `linear-gradient(to right, #E50914 ${progressPercentage}%, rgba(255,255,255,0.2) ${progressPercentage}%)`,
            }}
          />
        </div>

        {/* Action Controls Line */}
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="hover:text-netflix-red transition-colors focus:outline-none"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            {/* Rewind 10s */}
            <button
              onClick={handleSeekBackward}
              title="Back 10s"
              className="hover:text-gray-300 transition-colors focus:outline-none hidden sm:block"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Forward 10s */}
            <button
              onClick={handleSeekForward}
              title="Forward 10s"
              className="hover:text-gray-300 transition-colors focus:outline-none hidden sm:block"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 group/volume">
              <button
                onClick={toggleMute}
                className="hover:text-gray-300 transition-colors focus:outline-none"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24 h-1 bg-neutral-600 rounded appearance-none accent-white cursor-pointer"
              />
            </div>

            {/* Time Stamp */}
            <div className="text-xs sm:text-sm text-neutral-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-neutral-500">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4 sm:space-x-5 relative">
            {/* Playback Speed */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu((prev) => !prev)}
                className="text-xs sm:text-sm font-semibold hover:text-netflix-red px-2 py-1 rounded bg-neutral-800/80 border border-neutral-700 transition-colors"
              >
                {playbackSpeed}x
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 bg-neutral-900 border border-neutral-800 rounded shadow-xl py-1 text-xs w-24 z-50">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => changeSpeed(s)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-neutral-800 ${
                        playbackSpeed === s ? 'text-netflix-red font-bold' : 'text-neutral-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Audio & Subtitles Dialog */}
            <div className="relative">
              <button
                onClick={() => setShowAudioMenu((prev) => !prev)}
                title="Audio & Subtitles"
                className="hover:text-netflix-red transition-colors focus:outline-none"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              {showAudioMenu && (
                <div className="absolute bottom-10 right-0 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-4 text-xs w-64 sm:w-72 z-50 space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2 pb-1 border-b border-neutral-800">Audio</h4>
                    <div className="space-y-1">
                      {['English [Original] (5.1)', 'Spanish (5.1)', 'French (Stereo)', 'Japanese (Atmos)'].map((a) => (
                        <button
                          key={a}
                          onClick={() => setSelectedAudio(a)}
                          className={`w-full text-left py-1 hover:text-white ${
                            selectedAudio === a ? 'text-netflix-red font-bold' : 'text-neutral-400'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2 pb-1 border-b border-neutral-800">Subtitles</h4>
                    <div className="space-y-1">
                      {['Off', 'English [CC]', 'Spanish', 'French', 'Japanese', 'Arabic'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubtitle(sub)}
                          className={`w-full text-left py-1 hover:text-white ${
                            selectedSubtitle === sub ? 'text-netflix-red font-bold' : 'text-neutral-400'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="hover:text-netflix-red transition-colors focus:outline-none"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
