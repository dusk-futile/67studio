import { MediaItem, CategoryRow } from '../types/media';
import { BILLBOARD_ITEM, CATEGORY_ROWS, ALL_MEDIA_ITEMS } from './mockData';

/**
 * 67studio Media Service Layer
 * 
 * Architecture Note:
 * This service layer abstracts all data fetching. By default it serves high-fidelity
 * mock streaming media (4K video trailers, episode lists, cast metadata).
 * 
 * When your backend API or TMDB API key is ready:
 * 1. Set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_API_KEY in .env.local
 * 2. Swap these mock resolvers with fetch(`${API_URL}/...`) calls.
 * No UI components will need modification!
 */

export async function getBillboardMedia(): Promise<MediaItem> {
  // If remote API is enabled in future:
  // if (process.env.NEXT_PUBLIC_API_URL) { ... }
  return BILLBOARD_ITEM;
}

export async function getContentRows(): Promise<CategoryRow[]> {
  return CATEGORY_ROWS;
}

export async function getMediaById(id: string): Promise<MediaItem | undefined> {
  return ALL_MEDIA_ITEMS.find((item) => item.id === id);
}

export async function searchMedia(query: string): Promise<MediaItem[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return ALL_MEDIA_ITEMS.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(normalized);
    const genreMatch = item.genres.some((g) => g.toLowerCase().includes(normalized));
    const castMatch = item.cast.some((c) => c.toLowerCase().includes(normalized));
    const directorMatch = item.director.toLowerCase().includes(normalized);
    const overviewMatch = item.overview.toLowerCase().includes(normalized);

    return titleMatch || genreMatch || castMatch || directorMatch || overviewMatch;
  });
}

export async function getSimilarMedia(currentId: string): Promise<MediaItem[]> {
  const current = ALL_MEDIA_ITEMS.find((i) => i.id === currentId);
  if (!current) return ALL_MEDIA_ITEMS.slice(0, 6);

  // Return items sharing genres or type
  const similar = ALL_MEDIA_ITEMS.filter(
    (item) => item.id !== currentId && item.genres.some((g) => current.genres.includes(g))
  );

  return similar.length >= 3 ? similar.slice(0, 6) : ALL_MEDIA_ITEMS.filter((i) => i.id !== currentId).slice(0, 6);
}
