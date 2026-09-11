'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BillboardHero from '../components/BillboardHero';
import ContentRow from '../components/ContentRow';
import MediaDetailModal from '../components/MediaDetailModal';
import VideoPlayer from '../components/VideoPlayer';
import SearchOverlay from '../components/SearchOverlay';
import Footer from '../components/Footer';
import PasswordGate from '../components/PasswordGate';
import { useApp } from '../context/AppContext';
import { getBillboardMedia, getContentRows } from '../services/mediaService';
import { BILLBOARD_ITEM, CATEGORY_ROWS } from '../services/mockData';
import { MediaItem, CategoryRow } from '../types/media';

export default function Home() {
  const {
    searchQuery,
    activeNav,
    myList,
    isWhitelisted,
    isAuthChecking,
  } = useApp();
  const [billboardItem, setBillboardItem] = useState<MediaItem>(BILLBOARD_ITEM);
  const [contentRows, setContentRows] = useState<CategoryRow[]>(CATEGORY_ROWS);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [billboard, rows] = await Promise.all([
        getBillboardMedia(),
        getContentRows(),
      ]);
      setBillboardItem(billboard);
      setContentRows(rows);
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to load live TMDB rows, using fallback:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isWhitelisted) {
      loadData();
    }
  }, [isWhitelisted]);


  // Filter rows based on active nav selection
  const getFilteredRows = () => {
    if (activeNav === 'TV Shows') {
      return contentRows.filter((r) =>
        r.id.includes('tv') || r.title.toLowerCase().includes('tv') || r.title.toLowerCase().includes('series')
      );
    }

    if (activeNav === 'Movies') {
      return contentRows.filter((r) =>
        !r.id.includes('tv') && !r.title.toLowerCase().includes('series')
      );
    }

    if (activeNav === 'New & Popular') {
      return contentRows.filter((r) => r.isTop10 || r.id === 'trending-now');
    }

    return contentRows;
  };

  // 1. Initial hydration splash (prevents flash of content)
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-black text-3xl tracking-tighter text-netflix-red drop-shadow-[0_2px_12px_rgba(229,9,20,0.8)] font-sans">
            LANA
          </span>
          <span className="text-sm font-black tracking-[0.22em] text-white uppercase border-b-2 border-netflix-red pb-0.5">
            67
          </span>
        </div>
        <div className="w-8 h-8 border-2 border-netflix-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Whitelist Gatekeeper: Blocks access until password 'sus6767' is entered
  if (!isWhitelisted) {
    return <PasswordGate />;
  }

  const currentRows = getFilteredRows();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-netflix-red selection:text-white">
      {/* Global Sticky Scrim Navbar */}
      <Navbar />

      {/* Conditional Rendering: Search Mode vs Feed Mode */}
      {searchQuery.trim() ? (
        <SearchOverlay />
      ) : activeNav === 'My List' ? (
        <div className="pt-28 pb-20 px-4 md:px-12 min-h-[70vh] bg-black">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">My List</h1>
          {myList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myList.map((item) => (
                <div key={item.id} className="relative group">
                  <ContentRow
                    id={`my-list-single-${item.id}`}
                    title=""
                    items={[item]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-neutral-400 space-y-3">
              <p className="text-lg text-white">You haven&apos;t added any titles to your list yet.</p>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Explore movies and TV series and click the &ldquo;+&rdquo; icon to save them here for instant access.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Billboard Hero Spotlight */}
          <BillboardHero media={billboardItem} />

          {/* Content Shelves / Rows */}
          <div className="relative z-20 -mt-16 sm:-mt-24 md:-mt-36 pb-16 space-y-6 bg-gradient-to-b from-transparent via-black to-black">
            {/* Display persistent user "My List" row if items exist */}
            {myList.length > 0 && (
              <ContentRow
                id="my-list-shelf"
                title="My List"
                items={myList}
              />
            )}

            {/* Standard Category Rows */}
            {currentRows.map((row) => (
              <ContentRow
                key={row.id}
                id={row.id}
                title={row.title}
                items={row.items}
                isTop10={row.isTop10}
              />
            ))}
          </div>
        </>
      )}

      {/* Global Interactive Overlays */}
      <MediaDetailModal />
      <VideoPlayer />

      {/* Netflix Authentic Footer */}
      <Footer />
    </main>
  );
}
