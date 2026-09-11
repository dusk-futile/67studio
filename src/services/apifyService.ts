import { MediaItem } from '../types/media';

const APIFY_TOKEN = process.env.NEXT_PUBLIC_APIFY_TOKEN || process.env.APIFY_API_TOKEN || '';

// Known active Apify datasets on user account
export const PRIMARY_DATASET_ID = 'ArI5EJKtMHM9AavEd';

function decodeHtml(html: string) {
  if (!html) return '';
  return html
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function transformApifyItem(item: any, index: number = 0): MediaItem {
  const isSeries = item.vtype === 'series' || item.type === 'show';
  const title = decodeHtml(item.title || 'Netflix Feature');
  const overview = decodeHtml(item.synopsis || item.summary || 'Official title from the Netflix global catalog.');
  const image = item.img || item.poster || item.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';

  const match = item.avgrating
    ? Math.min(99, Math.max(80, Math.round(Number(item.avgrating) * 20)))
    : 96;

  const duration = isSeries ? '2 Seasons' : (item.runtime ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m` : '1h 48m');

  return {
    id: `apify-${item.nfid || item.id || index}`,
    title,
    overview,
    backdropUrl: image,
    posterUrl: image,
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    matchScore: match,
    maturityRating: '16+',
    advisoryTags: ['Netflix Global Catalog', 'Ultra HD 4K'],
    releaseYear: item.year || 2024,
    duration,
    quality: '4K Ultra HD',
    genres: ['Netflix Original', isSeries ? 'TV Series' : 'Movie', 'Featured'],
    type: isSeries ? 'tv' : 'movie',
    cast: ['Netflix Cast', 'Original Production'],
    director: 'Acclaimed Director',
    audioChannels: 'Dolby Atmos 5.1',
    subtitles: ['English [CC]', 'Spanish', 'French', 'Italian'],
    isOriginal: true,
  };
}

/**
 * Fetches scraped Netflix items from the active Apify dataset
 */
export async function getScrapedNetflixMedia(datasetId: string = PRIMARY_DATASET_ID): Promise<MediaItem[]> {
  try {
    const token = APIFY_TOKEN;
    if (!token) return [];
    const url = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&clean=true`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        return items.map((item, idx) => transformApifyItem(item, idx));
      }
    }
  } catch (error) {
    console.warn('Could not fetch Apify Netflix dataset, continuing with primary catalog:', error);
  }
  return [];
}
