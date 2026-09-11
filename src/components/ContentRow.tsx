'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types/media';
import HoverCard from './HoverCard';
import { useApp } from '../context/AppContext';

interface ContentRowProps {
  id: string;
  title: string;
  items: MediaItem[];
  isTop10?: boolean;
}

export default function ContentRow({ id, title, items, isTop10 = false }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const { openDetailModal } = useApp();

  const handleScroll = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      const target = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: target,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2 md:space-y-3 my-6 md:my-10 px-4 md:px-12 group/row relative">
      {/* Category Row Header */}
      <div className="flex items-center space-x-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight cursor-pointer hover:text-netflix-red transition-colors flex items-center group/title">
          <span>{title}</span>
          <span className="text-xs font-semibold text-netflix-red opacity-0 group-hover/title:opacity-100 transition-opacity ml-2 hidden sm:inline">
            Explore All &gt;
          </span>
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow Handle */}
        <button
          onClick={() => handleScroll('left')}
          aria-label="Scroll Left"
          className={`absolute left-0 top-0 bottom-0 z-30 w-10 md:w-14 bg-black/60 hover:bg-black/90 flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-xs ${
            !isMoved ? 'hidden' : 'flex'
          }`}
        >
          <ChevronLeft className="w-8 h-8 transition-transform group-hover/row:scale-125" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          className="flex items-center space-x-2 sm:space-x-4 overflow-x-scroll no-scrollbar py-6 -my-6 px-1 scroll-smooth"
        >
          {items.map((item, index) => {
            if (isTop10) {
              return (
                <div
                  key={item.id}
                  onClick={() => openDetailModal(item)}
                  className="flex-shrink-0 flex items-center cursor-pointer group/top10 transition-transform duration-300 hover:scale-105 select-none"
                >
                  {/* Big Stylized Outline Rank Number 1-10 */}
                  <div className="top10-number text-7xl sm:text-8xl md:text-9xl font-black select-none -mr-4 sm:-mr-6 z-10">
                    {index + 1}
                  </div>

                  {/* Vertical Poster Card */}
                  <div className="w-28 sm:w-36 md:w-44 aspect-[2/3] rounded-sm overflow-hidden bg-[#0d0d0d] relative shadow-2xl border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover/top10:brightness-110 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/95 to-transparent">
                      <p className="text-[11px] font-semibold text-white truncate text-center">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <HoverCard
                key={item.id}
                media={item}
                index={index}
                totalInView={5}
              />
            );
          })}
        </div>

        {/* Right Arrow Handle */}
        <button
          onClick={() => handleScroll('right')}
          aria-label="Scroll Right"
          className="absolute right-0 top-0 bottom-0 z-30 w-10 md:w-14 bg-black/60 hover:bg-black/90 flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-xs"
        >
          <ChevronRight className="w-8 h-8 transition-transform group-hover/row:scale-125" />
        </button>
      </div>
    </div>
  );
}
