'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BillboardHero from '../components/BillboardHero';
import ContentRow from '../components/ContentRow';
import MediaDetailModal from '../components/MediaDetailModal';
import VideoPlayer from '../components/VideoPlayer';
import SearchOverlay from '../components/SearchOverlay';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { BILLBOARD_ITEM, CATEGORY_ROWS, ALL_MEDIA_ITEMS } from '../services/mockData';
import { MediaItem } from '../types/media';

export default function Home() {
  const { searchQuery, activeNav, myList } = useApp();
  const [billboardItem, setBillboardItem] = useState<MediaItem>(BILLBOARD_ITEM);

  // Dynamic content filtering based on active nav selection
  const getFilteredRows = () => {
    if (activeNav === 'TV Shows') {
      const tvItems = ALL_MEDIA_ITEMS.filter((i) => i.type === 'tv');
      return [
        { id: 'tv-trending', title: 'Trending TV Series', items: tvItems },
        { id: 'tv-top10', title: 'Top 10 TV Shows Today', isTop10: true, items: tvItems },
        { id: 'tv-dramas', title: 'Binge-Worthy TV Dramas', items: tvItems.slice().reverse() },
      ];
    }

    if (activeNav === 'Movies') {
      const movieItems = ALL_MEDIA_ITEMS.filter((i) => i.type === 'movie');
      return [
        { id: 'movies-trending', title: 'Blockbuster Movies', items: movieItems },
        { id: 'movies-top10', title: 'Top 10 Movies Today', isTop10: true, items: movieItems },
        { id: 'movies-action', title: 'Adrenaline & Action Movies', items: movieItems.slice().reverse() },
      ];
    }

    if (activeNav === 'New & Popular') {
      return [
        { id: 'new-top10', title: 'Top 10 Today', isTop10: true, items: ALL_MEDIA_ITEMS.slice(0, 10) },
        CATEGORY_ROWS[0],
        CATEGORY_ROWS[1],
      ];
    }

    // Default 'Home'
    return CATEGORY_ROWS;
  };

  const currentRows = getFilteredRows();

  return (
    <main className="relative min-h-screen bg-netflix-black overflow-x-hidden selection:bg-netflix-red selection:text-white">
      {/* Global Sticky Scrim Navbar */}
      <Navbar />

      {/* Conditional Rendering: Search Mode vs Feed Mode */}
      {searchQuery.trim() ? (
        <SearchOverlay />
      ) : activeNav === 'My List' ? (
        <div className="pt-28 pb-20 px-4 md:px-12 min-h-[70vh]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">My List</h1>
          {myList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myList.map((item, idx) => (
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
            <div className="text-center py-20 text-neutral-400 space-y-3">
              <p className="text-lg">You haven&apos;t added any titles to your list yet.</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Explore movies and TV shows and click the &ldquo;+&rdquo; button to add them here for quick access.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Billboard Hero Spotlight */}
          <BillboardHero media={billboardItem} />

          {/* Content Shelves / Rows */}
          <div className="relative z-20 -mt-16 sm:-mt-24 md:-mt-36 pb-16 space-y-6">
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
