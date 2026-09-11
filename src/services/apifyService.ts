import { MediaItem } from '../types/media';

/**
 * Apify Netflix Scraper Service (easyapi/netflix-search-scraper)
 * 
 * Fetches Netflix catalog datasets scraped via Apify.
 * Requires APIFY_API_TOKEN in .env.local or passed directly.
 */

const APIFY_TOKEN = process.env.NEXT_PUBLIC_APIFY_TOKEN || process.env.APIFY_API_TOKEN || '';

export interface ApifyNetflixItem {
  id?: string;
  title?: string;
  type?: 'movie' | 'show' | 'series';
  summary?: string;
  synopsis?: string;
  overview?: string;
  image?: string;
  poster?: string;
  backdrop?: string;
  releaseYear?: number;
  year?: number;
  duration?: string;
  runtime?: number;
  rating?: string;
  genres?: string[];
}

export function transformApifyItem(item: ApifyNetflixItem, index: number = 0): MediaItem {
  const isSeries = item.type === 'show' || item.type === 'series';
  const title = item.title || 'Netflix Title';
  const overview = item.synopsis || item.summary || item.overview || 'Official Netflix title scraped via Apify.';
  const poster = item.poster || item.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';
  const backdrop = item.backdrop || item.image || poster;

  return {
    id: `apify-${item.id || index}`,
    title,
    overview,
    backdropUrl: backdrop,
    posterUrl: poster,
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    matchScore: 97,
    maturityRating: (item.rating as any) || '16+',
    advisoryTags: ['Netflix Catalog', '4K Ultra HD'],
    releaseYear: item.year || item.releaseYear || 2024,
    duration: item.duration || (isSeries ? '2 Seasons' : '1h 55m'),
    quality: '4K Ultra HD',
    genres: item.genres || ['Netflix', 'Popular'],
    type: isSeries ? 'tv' : 'movie',
    cast: ['Netflix Production'],
    director: 'Acclaimed Director',
    isOriginal: true,
  };
}

/**
 * Fetch items from an existing Apify dataset
 */
export async function fetchApifyDataset(datasetId: string, token: string = APIFY_TOKEN): Promise<MediaItem[]> {
  try {
    const url = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`;
    const res = await fetch(url);
    if (res.ok) {
      const items: ApifyNetflixItem[] = await res.json();
      return items.map((item, idx) => transformApifyItem(item, idx));
    }
  } catch (error) {
    console.error('Error fetching Apify dataset:', error);
  }
  return [];
}

/**
 * Run the easyapi/netflix-search-scraper actor synchronously
 */
export async function runApifyNetflixScraper(query: string = '', token: string = APIFY_TOKEN): Promise<MediaItem[]> {
  if (!token) {
    console.warn('Apify token is required to execute easyapi/netflix-search-scraper');
    return [];
  }

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/easyapi~netflix-search-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }
    );

    if (res.ok) {
      const items: ApifyNetflixItem[] = await res.json();
      return items.map((item, idx) => transformApifyItem(item, idx));
    }
  } catch (error) {
    console.error('Error running Apify Netflix scraper:', error);
  }
  return [];
}
