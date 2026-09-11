import { MediaItem, CategoryRow } from '../types/media';
import { BILLBOARD_ITEM, CATEGORY_ROWS, ALL_MEDIA_ITEMS } from './mockData';

const API_BASE_URL = 'https://imdb.iamidiotareyoutoo.com';

const TRAILERS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
];

/**
 * Transforms external JustWatch/IMDb API responses into 67studio MediaItems
 */
function transformApiItem(item: any, index: number): MediaItem {
  const poster = item.photo_url?.[0] || item.backdrops?.[0] || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80';
  const backdrop = item.backdrops?.[0] || item.photo_url?.[0] || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80';
  const trailer = TRAILERS[index % TRAILERS.length];

  const hours = item.runtime ? Math.floor(item.runtime / 60) : 1;
  const mins = item.runtime ? item.runtime % 60 : 45;
  const duration = item.type === 'SHOW' ? '1 Season' : `${hours}h ${mins}m`;

  const match = item.jwRating ? Math.min(99, Math.round(item.jwRating * 100)) : 95;

  return {
    id: item.id || `api-${item.imdbId || index}`,
    title: item.title || 'Untitled Feature',
    overview: item.tomatoMeter
      ? `Rated ${item.tomatoMeter}% on Rotten Tomatoes. Stream this acclaimed title in high-definition 4K on 67studio.`
      : `High-definition streaming title from Free Movie DB & JustWatch catalog. Now streaming on 67studio.`,
    backdropUrl: backdrop,
    posterUrl: poster,
    trailerUrl: trailer,
    videoUrl: trailer,
    matchScore: match,
    maturityRating: item.type === 'SHOW' ? 'TV-MA' : '16+',
    advisoryTags: ['High Definition', 'Dolby Audio'],
    releaseYear: item.year || 2024,
    duration: duration,
    quality: '4K Ultra HD',
    genres: ['Featured', item.type === 'SHOW' ? 'TV Series' : 'Blockbuster', 'Streaming'],
    type: item.type === 'SHOW' ? 'tv' : 'movie',
    cast: ['Official Cast', 'Global Production'],
    director: 'Acclaimed Director',
    audioChannels: 'Spatial Audio 5.1',
    subtitles: ['English [CC]', 'Spanish', 'French'],
  };
}

export async function getBillboardMedia(): Promise<MediaItem> {
  return BILLBOARD_ITEM;
}

export async function getContentRows(): Promise<CategoryRow[]> {
  return CATEGORY_ROWS;
}

export async function getMediaById(id: string): Promise<MediaItem | undefined> {
  const found = ALL_MEDIA_ITEMS.find((item) => item.id === id);
  if (found) return found;

  return undefined;
}

/**
 * Live Search powered by Free Movie DB (JustWatch API) with seamless fallback
 */
export async function searchMedia(query: string): Promise<MediaItem[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/justwatch?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.description) && data.description.length > 0) {
        return data.description.map((item: any, idx: number) => transformApiItem(item, idx));
      }
    }
  } catch (error) {
    console.warn('Free Movie DB API search fell back to internal catalog:', error);
  }

  // Fallback to local catalog
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

  const similar = ALL_MEDIA_ITEMS.filter(
    (item) => item.id !== currentId && item.genres.some((g) => current.genres.includes(g))
  );

  return similar.length >= 3 ? similar.slice(0, 6) : ALL_MEDIA_ITEMS.filter((i) => i.id !== currentId).slice(0, 6);
}
