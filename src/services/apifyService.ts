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

  // Support synopsis, summary, and critics_consensus from Rotten Tomatoes / Apify scrapers
  let overview = item.synopsis || item.summary || '';
  if (!overview && item.critics_consensus) {
    overview = item.critics_consensus
      .replace(/^Critics Consensus\s*/i, '')
      .replace(/Read Critics Reviews\s*$/i, '')
      .trim();
  }
  if (!overview) overview = 'Acclaimed feature film available in Ultra HD on lana67.';
  overview = decodeHtml(overview);

  const image = item.image || item.img || item.poster || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';

  // TMDB ID and YouTube key resolution (including Tangerines)
  let tmdbId: number | undefined = item.tmdbId || item.tmdb_id;
  let youtubeKey: string | undefined = item.youtubeKey;
  let backdrop = image;

  if (title.toLowerCase().includes('tangerines') || item.id === 238628) {
    tmdbId = 238628;
    youtubeKey = 'WdHwowSRRcs';
    backdrop = 'https://image.tmdb.org/t/p/original/6nPbmf5ctz3xFDWEMNokV4vUpyt.jpg';
  }

  const match = item.tomatometer_score
    ? Math.min(99, Math.max(75, parseInt(item.tomatometer_score, 10)))
    : item.audience_score
    ? Math.min(99, Math.max(75, parseInt(item.audience_score, 10)))
    : item.avgrating
    ? Math.min(99, Math.max(80, Math.round(Number(item.avgrating) * 20)))
    : 96;

  const duration = isSeries ? '2 Seasons' : (item.runtime ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m` : (tmdbId === 238628 ? '1h 27m' : '1h 48m'));

  return {
    id: `apify-${item.nfid || item.id || tmdbId || index}`,
    tmdbId,
    youtubeKey,
    title,
    overview,
    backdropUrl: backdrop,
    posterUrl: image,
    trailerUrl: youtubeKey
      ? `https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`
      : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    matchScore: match,
    maturityRating: '16+',
    advisoryTags: ['Critically Acclaimed', 'Ultra HD 4K'],
    releaseYear: item.year || (tmdbId === 238628 ? 2013 : 2024),
    duration,
    quality: '4K Ultra HD',
    genres: ['Featured', isSeries ? 'TV Series' : 'Movie', 'Drama'],
    type: isSeries ? 'tv' : 'movie',
    cast: tmdbId === 238628 ? ['Lembit Ulfsak', 'Elmo Nüganen', 'Giorgi Nakhashidze'] : ['Acclaimed Cast'],
    director: tmdbId === 238628 ? 'Zaza Urushadze' : 'Acclaimed Director',
    audioChannels: 'Dolby Atmos 5.1',
    subtitles: ['English [CC]', 'Spanish', 'French', 'Italian'],
    isOriginal: false,
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
