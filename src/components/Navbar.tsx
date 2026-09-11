'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, X, Check, Film, Tv, Sparkles, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { USER_PROFILES } from '../services/mockData';

export default function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
    activeProfile,
    setActiveProfile,
    activeNav,
    setActiveNav,
    setIsApiModalOpen,
    lockStudio,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 150);
      } else {
        setSearchQuery('');
      }
      return next;
    });
  };

  const navLinks = [
    { label: 'Home', value: 'Home' },
    { label: 'TV Shows', value: 'TV Shows' },
    { label: 'Movies', value: 'Movies' },
    { label: 'New & Popular', value: 'New & Popular' },
    { label: 'My List', value: 'My List' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-400 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between ${
        isScrolled
          ? 'bg-black/95 shadow-2xl border-b border-white/5 backdrop-blur-md'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      {/* Left section: Logo & Nav Links */}
      <div className="flex items-center space-x-6 md:space-x-10">
        {/* 67studio Iconic Curved Logo */}
        <button
          onClick={() => {
            setActiveNav('Home');
            setSearchQuery('');
          }}
          className="flex items-center space-x-1.5 focus:outline-none group text-left"
        >
          <div className="relative flex items-center">
            <span className="font-black text-2xl md:text-3xl tracking-tighter text-netflix-red drop-shadow-[0_2px_12px_rgba(229,9,20,0.8)] font-sans group-hover:scale-105 transition-transform duration-200">
              67
            </span>
            <span className="ml-1 text-sm md:text-base font-black tracking-[0.22em] text-white uppercase border-b-2 border-netflix-red pb-0.5">
              STUDIO
            </span>
          </div>
        </button>

        {/* Primary Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-5 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.value}>
              <button
                onClick={() => {
                  setActiveNav(link.value);
                  if (searchQuery) setSearchQuery('');
                }}
                className={`transition-colors duration-200 hover:text-white ${
                  activeNav === link.value
                    ? 'text-white font-bold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section: API Engine, Search, Notifications, Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 text-white text-sm">
        {/* API Engine Quality Switcher Button */}
        <button
          onClick={() => setIsApiModalOpen(true)}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-200 hover:text-white text-xs transition-all shadow-sm group"
          title="Configure & Test API Engines (TMDB + Apify)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-[11px] tracking-wide uppercase">API Engine</span>
        </button>

        {/* Animated Search Bar */}
        <div className="relative flex items-center">
          <div
            className={`flex items-center transition-all duration-300 ${
              isSearchOpen
                ? 'w-48 sm:w-64 bg-black/90 border border-white/40 px-2.5 py-1 rounded-sm shadow-lg'
                : 'w-8 bg-transparent border-transparent'
            }`}
          >
            <button
              onClick={handleSearchToggle}
              aria-label="Search"
              className="text-white hover:text-gray-300 focus:outline-none transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Titles, genres, actors..."
              className={`bg-transparent text-white text-xs sm:text-sm pl-2.5 focus:outline-none placeholder:text-neutral-400 w-full transition-opacity duration-200 ${
                isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {isSearchOpen && searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-neutral-400 hover:text-white ml-1 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications Tray */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative text-white hover:text-gray-300 focus:outline-none"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-netflix-red text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center text-white ring-2 ring-black">
              3
            </span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#0c0c0c] border border-neutral-800 rounded shadow-2xl p-3 z-50 animate-in fade-in duration-200">
              <div className="text-xs font-semibold text-neutral-400 pb-2 border-b border-neutral-800 mb-2 uppercase tracking-wider">
                Notifications
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-2 hover:bg-neutral-900 rounded cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                    <Film className="w-5 h-5 text-netflix-red" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">Trending on 67studio</p>
                    <p className="text-neutral-400 line-clamp-1">New 4K blockbuster movies added to your library.</p>
                    <span className="text-[10px] text-neutral-500">Just now</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2 hover:bg-neutral-900 rounded cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                    <Tv className="w-5 h-5 text-netflix-red" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">Top Rated Series</p>
                    <p className="text-neutral-400 line-clamp-1">Explore award-winning series streaming today.</p>
                    <span className="text-[10px] text-neutral-500">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center space-x-1.5 focus:outline-none group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeProfile.avatarUrl}
              alt={activeProfile.name}
              className="w-8 h-8 rounded object-cover border border-transparent group-hover:border-white transition-colors"
            />
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#0c0c0c] border border-neutral-800 rounded shadow-2xl py-2 z-50 text-xs animate-in fade-in duration-200">
              <div className="px-4 py-2 border-b border-neutral-800">
                <span className="text-neutral-400 block text-[11px]">Active Profile</span>
                <span className="font-bold text-white text-sm">{activeProfile.name}</span>
              </div>

              <div className="py-2 border-b border-neutral-800 space-y-1">
                {USER_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setActiveProfile(profile);
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-1.5 hover:bg-neutral-900 text-left transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-neutral-200">{profile.name}</span>
                    </div>
                    {activeProfile.id === profile.id && (
                      <Check className="w-3.5 h-3.5 text-netflix-red" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 text-neutral-300">
                <button className="w-full text-left px-4 py-1.5 hover:bg-neutral-900 hover:text-white transition-colors">
                  Account
                </button>
                <button className="w-full text-left px-4 py-1.5 hover:bg-neutral-900 hover:text-white transition-colors">
                  Help Center
                </button>
                <div className="border-t border-neutral-800 my-1"></div>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    lockStudio();
                  }}
                  className="w-full text-left px-4 py-1.5 hover:bg-neutral-900 text-netflix-red font-medium transition-colors flex items-center space-x-2"
                >
                  <Lock className="w-3.5 h-3.5 text-netflix-red" />
                  <span>Lock Studio & Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
