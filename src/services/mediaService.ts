import { MediaItem, CategoryRow } from '../types/media';
import { BILLBOARD_ITEM, CATEGORY_ROWS, ALL_MEDIA_ITEMS, TANGERINES_ITEM } from './mockData';
import { getScrapedNetflixMedia } from './apifyService';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const IMAGE_BASE_W780 = 'https://image.tmdb.org/t/p/w780';

export const DEFAULT_TMDB_API_KEY = '037d13c7206d0b6cf56e42cf8c42b902';
export const DEFAULT_TMDB_JWT =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzdkMTNjNzIwNmQwYjZjZjU2ZTQyY2Y4YzQyYjkwMiIsIm5iZiI6MTc4OTA5MjgxNy4wNDYwMDAyLCJzdWIiOiI2YWEzNjNkMWU1M2NmNmUzOTY5Zjc2MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Go62YTE7FKoLSJlvk09M89QAf9cNCFHkaTuMpFPKBq0';

const TRAILERS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
];

const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10765: 'Sci-Fi & Fantasy',
};

/**
 * Bulletproof TMDB fetcher with dual-authentication:
 * Works seamlessly whether the environment provides a 32-hex API key or a JWT Read Access Token.
 */
export async function fetchTmdb<T = any>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T | null> {
  try {
    const rawKey = (process.env.NEXT_PUBLIC_TMDB_API_KEY || '').trim();
    const rawJwt = (process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN || '').trim();

    // Detect if the key is actually a JWT token
    const isRawKeyJwt = rawKey.startsWith('eyJ');
    const jwtToken = isRawKeyJwt ? rawKey : (rawJwt.startsWith('eyJ') ? rawJwt : DEFAULT_TMDB_JWT);
    const hexApiKey = !isRawKeyJwt && rawKey.length === 32 ? rawKey : DEFAULT_TMDB_API_KEY;

    const searchParams = new URLSearchParams();
    searchParams.set('api_key', hexApiKey);
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) {
        searchParams.set(k, String(v));
      }
    }

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${TMDB_BASE_URL}${cleanEndpoint}?${searchParams.toString()}`;

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (jwtToken) {
      headers.Authorization = `Bearer ${jwtToken}`;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 300 },
    });

    if (res.ok) {
      return (await res.json()) as T;
    }

    // Direct fallback if header authentication fails
    if (res.status === 401 || res.status === 403) {
      const fallbackUrl = `${TMDB_BASE_URL}${cleanEndpoint}?api_key=${DEFAULT_TMDB_API_KEY}&${new URLSearchParams(
        params as any
      ).toString()}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        return (await fallbackRes.json()) as T;
      }
    }

    console.warn(`TMDB API response not ok for ${endpoint}: HTTP ${res.status}`);
    return null;
  } catch (err) {
    console.warn(`TMDB API network error for ${endpoint}:`, err);
    return null;
  }
}

export function transformTmdbItem(item: any, index: number = 0, isTv: boolean = false): MediaItem {
  const isSeries = isTv || item.media_type === 'tv' || !!item.first_air_date;
  const title = item.title || item.name || item.original_title || item.original_name || 'Untitled';
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? parseInt(releaseDate.substring(0, 4), 10) : 2025;

  const backdrop = item.backdrop_path
    ? `${IMAGE_BASE_ORIGINAL}${item.backdrop_path}`
    : item.poster_path
    ? `${IMAGE_BASE_W780}${item.poster_path}`
    : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85';

  const poster = item.poster_path
    ? `${IMAGE_BASE_W780}${item.poster_path}`
    : item.backdrop_path
    ? `${IMAGE_BASE_W780}${item.backdrop_path}`
    : 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';

  const matchScore = item.vote_average
    ? Math.min(99, Math.max(75, Math.round(item.vote_average * 10)))
    : 95;

  const genres =
    item.genre_ids && Array.isArray(item.genre_ids) && item.genre_ids.length > 0
      ? item.genre_ids.map((id: number) => GENRE_MAP[id] || 'Featured').slice(0, 3)
      : ['Trending', isSeries ? 'TV Series' : 'Blockbuster'];

  const maturityRatings: Array<'G' | 'PG' | 'PG-13' | '16+' | '18+' | 'TV-MA' | 'R'> = [
    'PG-13',
    '16+',
    '18+',
    'TV-MA',
  ];
  const maturityRating = maturityRatings[index % maturityRatings.length];
  const trailer = TRAILERS[index % TRAILERS.length];

  return {
    id: `tmdb-${item.id}`,
    tmdbId: item.id,
    title,
    overview: item.overview || 'Stream this acclaimed title in high-definition 4K HDR on 67studio.',
    backdropUrl: backdrop,
    posterUrl: poster,
    trailerUrl: trailer,
    videoUrl: trailer,
    matchScore,
    maturityRating,
    advisoryTags: ['High Definition', 'Dolby Atmos', 'Spatial Audio'],
    releaseYear: year,
    duration: isSeries ? '2 Seasons' : '2h 14m',
    quality: '4K Ultra HD',
    genres,
    type: isSeries ? 'tv' : 'movie',
    cast: ['International Cast', 'Critically Acclaimed'],
    director: 'Acclaimed Director',
    audioChannels: 'Dolby Atmos 7.1',
    subtitles: ['English [CC]', 'Spanish', 'French', 'Japanese', 'Arabic'],
    isOriginal: index % 3 === 0,
    seasons: isSeries
      ? [
          {
            seasonNumber: 1,
            title: 'Season 1',
            episodes: [
              {
                id: `ep-${item.id}-1`,
                episodeNumber: 1,
                title: 'Pilot Episode',
                overview: item.overview || 'The journey begins as fateful events set unprecedented stakes in motion.',
                duration: '54m',
                thumbnailUrl: backdrop,
                videoUrl: trailer,
                progressPercent: 40,
              },
              {
                id: `ep-${item.id}-2`,
                episodeNumber: 2,
                title: 'Convergence',
                overview: 'Confronting mounting revelations, unforeseen alliances are tested under intense pressure.',
                duration: '48m',
                thumbnailUrl: poster,
                videoUrl: trailer,
              },
            ],
          },
        ]
      : undefined,
  };
}

export async function getTmdbTrailerKey(tmdbId: number, type: 'movie' | 'tv'): Promise<string | undefined> {
  try {
    const data = await fetchTmdb<{ results?: any[] }>(`/${type}/${tmdbId}/videos`);
    if (data?.results && data.results.length > 0) {
      const trailer = data.results.find(
        (v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
      );
      return trailer?.key || data.results[0]?.key;
    }
  } catch (e) {
    console.warn('Failed to fetch trailer key from TMDB:', e);
  }
  return undefined;
}

export async function getBillboardMedia(): Promise<MediaItem> {
  try {
    const data = await fetchTmdb<{ results?: any[] }>('/trending/movie/week');
    if (data?.results && data.results.length > 0) {
      const topItem =
        data.results.find((i: any) => i.backdrop_path && i.overview && i.overview.length > 50) ||
        data.results[0];
      const media = transformTmdbItem(topItem, 0, false);
      media.top10Rank = 1;
      media.isOriginal = true;

      const trailerKey = await getTmdbTrailerKey(topItem.id, 'movie');
      if (trailerKey) {
        media.youtubeKey = trailerKey;
      }
      return media;
    }
  } catch (error) {
    console.warn('Error fetching TMDB billboard media, using local fallback:', error);
  }
  return BILLBOARD_ITEM;
}

/**
 * Returns dynamic category shelves with:
 * 1. Live Apify Scraper Exclusives
 * 2. Strict cross-row deduplication so NO movie title is ever repeated across rows
 * 3. Prominent feature of user-curated titles like Tangerines
 */
export async function getContentRows(customApifyDatasetId?: string): Promise<CategoryRow[]> {
  try {
    const [
      trendingData,
      topRatedData,
      popularTvData,
      actionData,
      scifiData,
      dramaData,
      animationData,
      apifyItems,
    ] = await Promise.all([
      fetchTmdb<{ results: any[] }>('/trending/all/week'),
      fetchTmdb<{ results: any[] }>('/movie/top_rated'),
      fetchTmdb<{ results: any[] }>('/tv/popular'),
      fetchTmdb<{ results: any[] }>('/discover/movie', { with_genres: 28, sort_by: 'popularity.desc' }),
      fetchTmdb<{ results: any[] }>('/discover/movie', { with_genres: 878, sort_by: 'popularity.desc' }),
      fetchTmdb<{ results: any[] }>('/discover/movie', { with_genres: 18, sort_by: 'popularity.desc' }),
      fetchTmdb<{ results: any[] }>('/discover/tv', { with_genres: 16, sort_by: 'popularity.desc' }),
      getScrapedNetflixMedia(customApifyDatasetId),
    ]);

    const seenIds = new Set<string | number>();
    const seenTitles = new Set<string>();

    const rows: CategoryRow[] = [];

    const registerSeen = (id: string | number, title: string) => {
      seenIds.add(id);
      const norm = title.trim().toLowerCase();
      if (norm) seenTitles.add(norm);
    };

    const isSeen = (id: string | number, title: string) => {
      if (seenIds.has(id)) return true;
      const norm = title.trim().toLowerCase();
      return !!norm && seenTitles.has(norm);
    };

    // 1. Apify Live Scraper Shelf
    if (apifyItems && apifyItems.length > 0) {
      const uniqueApify: MediaItem[] = [];
      for (const item of apifyItems) {
        if (!isSeen(item.id, item.title)) {
          registerSeen(item.id, item.title);
          if (item.tmdbId) registerSeen(item.tmdbId, item.title);
          uniqueApify.push(item);
        }
      }

      if (uniqueApify.length > 0) {
        rows.push({
          id: 'apify-netflix-originals',
          title: 'Live Scraped Exclusives (Apify Engine)',
          items: uniqueApify,
        });
      }
    }

    // Helper to extract unique items for each TMDB row with cross-shelf deduplication
    const extractUnique = (rawList: any[] | undefined, isTv: boolean = false, maxItems: number = 12): MediaItem[] => {
      if (!rawList || !Array.isArray(rawList)) return [];
      const out: MediaItem[] = [];
      for (const raw of rawList) {
        const title = raw.title || raw.name || raw.original_title || raw.original_name || '';
        const id = raw.id;
        if (!id || !title || isSeen(id, title)) continue;
        registerSeen(id, title);
        out.push(transformTmdbItem(raw, out.length, isTv));
        if (out.length >= maxItems) break;
      }
      return out;
    };

    // 2. Trending Now
    if (trendingData?.results?.length) {
      const items = extractUnique(trendingData.results, false, 12);
      if (items.length > 0) {
        rows.push({
          id: 'trending-now',
          title: 'Trending Now',
          items,
        });
      }
    }

    // 3. Top 10 in Movies Today
    if (topRatedData?.results?.length) {
      const items = extractUnique(topRatedData.results, false, 10);
      if (items.length > 0) {
        items.forEach((item, idx) => {
          item.top10Rank = idx + 1;
        });
        rows.push({
          id: 'top-10-movies',
          title: 'Top 10 in Movies Today',
          isTop10: true,
          items,
        });
      }
    }

    // 4. Popular TV Series
    if (popularTvData?.results?.length) {
      const items = extractUnique(popularTvData.results, true, 12);
      if (items.length > 0) {
        rows.push({
          id: 'popular-tv',
          title: 'Popular TV Series',
          items,
        });
      }
    }

    // 5. Action & Adventure Blockbusters
    if (actionData?.results?.length) {
      const items = extractUnique(actionData.results, false, 12);
      if (items.length > 0) {
        rows.push({
          id: 'action-movies',
          title: 'Action & Adventure Blockbusters',
          items,
        });
      }
    }

    // 6. Sci-Fi & Cyberpunk
    if (scifiData?.results?.length) {
      const items = extractUnique(scifiData.results, false, 12);
      if (items.length > 0) {
        rows.push({
          id: 'scifi-movies',
          title: 'Sci-Fi & Cyberpunk',
          items,
        });
      }
    }

    // 7. Critically Acclaimed Dramas (featuring Tangerines!)
    if (dramaData?.results?.length) {
      const items = extractUnique(dramaData.results, false, 12);
      // Ensure Tangerines is included in drama row if not already seen
      if (!isSeen(TANGERINES_ITEM.id, TANGERINES_ITEM.title) && (!TANGERINES_ITEM.tmdbId || !isSeen(TANGERINES_ITEM.tmdbId, TANGERINES_ITEM.title))) {
        registerSeen(TANGERINES_ITEM.id, TANGERINES_ITEM.title);
        if (TANGERINES_ITEM.tmdbId) registerSeen(TANGERINES_ITEM.tmdbId, TANGERINES_ITEM.title);
        items.unshift(TANGERINES_ITEM);
      }
      if (items.length > 0) {
        rows.push({
          id: 'acclaimed-dramas',
          title: 'Critically Acclaimed Dramas',
          items,
        });
      }
    }

    // 8. Animation & Speculative Series
    if (animationData?.results?.length) {
      const items = extractUnique(animationData.results, true, 12);
      if (items.length > 0) {
        rows.push({
          id: 'animation-series',
          title: 'Animation & Speculative Series',
          items,
        });
      }
    }

    if (rows.length > 0) return rows;
  } catch (error) {
    console.warn('Error fetching live content rows, falling back to local dataset:', error);
  }

  return CATEGORY_ROWS;
}

export async function searchMedia(query: string): Promise<MediaItem[]> {
  const normalized = query.trim();
  if (!normalized) return [];

  try {
    const data = await fetchTmdb<{ results?: any[] }>('/search/multi', {
      query: normalized,
      include_adult: 'false',
    });
    if (data?.results && data.results.length > 0) {
      return data.results
        .filter((item: any) => item.backdrop_path || item.poster_path)
        .map((item: any, idx: number) => transformTmdbItem(item, idx, item.media_type === 'tv'));
    }
  } catch (error) {
    console.warn('TMDB search error, falling back to local search:', error);
  }

  return ALL_MEDIA_ITEMS.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(normalized.toLowerCase());
    const genreMatch = item.genres.some((g) => g.toLowerCase().includes(normalized.toLowerCase()));
    const overviewMatch = item.overview.toLowerCase().includes(normalized.toLowerCase());
    return titleMatch || genreMatch || overviewMatch;
  });
}

export async function getSimilarMedia(currentId: string): Promise<MediaItem[]> {
  if (currentId.startsWith('tmdb-')) {
    const rawId = currentId.replace('tmdb-', '');
    try {
      const data = await fetchTmdb<{ results?: any[] }>(`/movie/${rawId}/similar`);
      if (data?.results && data.results.length > 0) {
        return data.results.slice(0, 6).map((item: any, idx: number) => transformTmdbItem(item, idx, false));
      }
    } catch (e) {
      console.warn('Could not fetch similar from TMDB:', e);
    }
  }

  const current = ALL_MEDIA_ITEMS.find((i) => i.id === currentId);
  if (!current) return ALL_MEDIA_ITEMS.slice(0, 6);

  const similar = ALL_MEDIA_ITEMS.filter(
    (item) => item.id !== currentId && item.genres.some((g) => current.genres.includes(g))
  );

  return similar.length >= 3 ? similar.slice(0, 6) : ALL_MEDIA_ITEMS.filter((i) => i.id !== currentId).slice(0, 6);
}
