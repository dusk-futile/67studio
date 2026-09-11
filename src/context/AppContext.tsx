'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MediaItem, UserProfile } from '../types/media';
import { USER_PROFILES } from '../services/mockData';

interface AppContextType {
  activeModalItem: MediaItem | null;
  openDetailModal: (item: MediaItem) => void;
  closeDetailModal: () => void;

  activePlayingItem: MediaItem | null;
  playMedia: (item: MediaItem) => void;
  stopMedia: () => void;

  myList: MediaItem[];
  toggleMyList: (item: MediaItem) => void;
  isInMyList: (id: string) => boolean;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  activeProfile: UserProfile;
  setActiveProfile: (profile: UserProfile) => void;

  activeNav: string;
  setActiveNav: (nav: string) => void;

  isGlobalMuted: boolean;
  toggleGlobalMute: () => void;

  isApiModalOpen: boolean;
  setIsApiModalOpen: (open: boolean) => void;

  apifyDatasetId: string;
  setApifyDatasetId: (id: string) => void;

  isWhitelisted: boolean;
  isAuthChecking: boolean;
  verifyPassword: (password: string) => boolean;
  lockStudio: () => void;

  watchProgress: Record<string, number>;
  updateWatchProgress: (key: string, percent: number) => void;
  getWatchProgress: (key: string) => number;
  clearWatchHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeModalItem, setActiveModalItem] = useState<MediaItem | null>(null);
  const [activePlayingItem, setActivePlayingItem] = useState<MediaItem | null>(null);
  const [myList, setMyList] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProfile, setActiveProfile] = useState<UserProfile>(USER_PROFILES[0]);
  const [activeNav, setActiveNav] = useState('Home');
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apifyDatasetId, setApifyDatasetId] = useState('ArI5EJKtMHM9AavEd');
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const WHITELIST_PASSWORD = 'sus6767';

  // Hydrate Whitelist Auth status from localStorage / cookie
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('lana67_whitelist_key') || localStorage.getItem('67studio_whitelist_key');
      const hasCookie = typeof document !== 'undefined' && (
        document.cookie.includes('lana67_auth=sus6767') || document.cookie.includes('67studio_auth=sus6767')
      );
      if (storedKey === WHITELIST_PASSWORD || hasCookie) {
        setIsWhitelisted(true);
      }
    } catch (e) {
      console.warn('Failed to read whitelist auth:', e);
    } finally {
      setIsAuthChecking(false);
    }
  }, []);

  const verifyPassword = (password: string): boolean => {
    if (password.trim() === WHITELIST_PASSWORD) {
      setIsWhitelisted(true);
      try {
        localStorage.setItem('lana67_whitelist_key', WHITELIST_PASSWORD);
        localStorage.setItem('67studio_whitelist_key', WHITELIST_PASSWORD);
        if (typeof document !== 'undefined') {
          document.cookie = `lana67_auth=${WHITELIST_PASSWORD}; path=/; max-age=31536000; SameSite=Lax`;
          document.cookie = `67studio_auth=${WHITELIST_PASSWORD}; path=/; max-age=31536000; SameSite=Lax`;
        }
      } catch (e) {
        console.warn('Failed to save whitelist key:', e);
      }
      return true;
    }
    return false;
  };

  const lockStudio = () => {
    setIsWhitelisted(false);
    try {
      localStorage.removeItem('lana67_whitelist_key');
      localStorage.removeItem('67studio_whitelist_key');
      if (typeof document !== 'undefined') {
        document.cookie = 'lana67_auth=; path=/; max-age=0; SameSite=Lax';
        document.cookie = '67studio_auth=; path=/; max-age=0; SameSite=Lax';
      }
    } catch (e) {
      console.warn('Failed to clear whitelist key:', e);
    }
  };

  const [watchProgress, setWatchProgress] = useState<Record<string, number>>({});

  // Hydrate real watch progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lana67_watch_progress') || localStorage.getItem('67studio_watch_progress');
      if (saved) {
        setWatchProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load watch progress:', e);
    }
  }, []);

  const updateWatchProgress = (key: string, percent: number) => {
    setWatchProgress((prev) => {
      const clamped = Math.min(100, Math.max(0, Math.round(percent)));
      const next = { ...prev, [key]: clamped };
      try {
        localStorage.setItem('lana67_watch_progress', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save watch progress:', e);
      }
      return next;
    });
  };

  const getWatchProgress = (key: string): number => {
    return watchProgress[key] || 0;
  };

  const clearWatchHistory = () => {
    setWatchProgress({});
    try {
      localStorage.removeItem('lana67_watch_progress');
      localStorage.removeItem('67studio_watch_progress');
    } catch (e) {
      console.warn('Failed to clear watch progress:', e);
    }
  };

  // Hydrate My List from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lana67_my_list') || localStorage.getItem('67studio_my_list');
      if (saved) {
        setMyList(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load My List from localStorage:', e);
    }
  }, []);

  // Save My List to localStorage
  const saveMyList = (items: MediaItem[]) => {
    setMyList(items);
    try {
      localStorage.setItem('lana67_my_list', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save My List to localStorage:', e);
    }
  };

  const openDetailModal = (item: MediaItem) => {
    setActiveModalItem(item);
  };

  const closeDetailModal = () => {
    setActiveModalItem(null);
  };

  const playMedia = (item: MediaItem) => {
    setActivePlayingItem(item);
  };

  const stopMedia = () => {
    setActivePlayingItem(null);
  };

  const toggleMyList = (item: MediaItem) => {
    const exists = myList.some((m) => m.id === item.id);
    if (exists) {
      saveMyList(myList.filter((m) => m.id !== item.id));
    } else {
      saveMyList([...myList, item]);
    }
  };

  const isInMyList = (id: string) => {
    return myList.some((m) => m.id === id);
  };

  const toggleGlobalMute = () => {
    setIsGlobalMuted((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        activeModalItem,
        openDetailModal,
        closeDetailModal,
        activePlayingItem,
        playMedia,
        stopMedia,
        myList,
        toggleMyList,
        isInMyList,
        searchQuery,
        setSearchQuery,
        activeProfile,
        setActiveProfile,
        activeNav,
        setActiveNav,
        isGlobalMuted,
        toggleGlobalMute,
        isApiModalOpen,
        setIsApiModalOpen,
        apifyDatasetId,
        setApifyDatasetId,
        isWhitelisted,
        isAuthChecking,
        verifyPassword,
        lockStudio,
        watchProgress,
        updateWatchProgress,
        getWatchProgress,
        clearWatchHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
