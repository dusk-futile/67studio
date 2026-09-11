import { MediaItem, CategoryRow, Season, Episode } from '../types/media';
import { BILLBOARD_ITEM, CATEGORY_ROWS, ALL_MEDIA_ITEMS, TANGERINES_ITEM } from './mockData';

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

const TV_SEASONS_CACHE = new Map<number, Season[]>();

/**
 * Fetches real, live TV series seasons and episodes from TMDB
 */
export async function getTvSeasons(tmdbId: number): Promise<Season[]> {
  if (TV_SEASONS_CACHE.has(tmdbId)) {
    return TV_SEASONS_CACHE.get(tmdbId)!;
  }

  try {
    const show = await fetchTmdb<any>(`/tv/${tmdbId}`);
    if (!show || !show.seasons || !Array.isArray(show.seasons)) return [];

    // Filter out specials (season 0) unless it is the only season
    const validSeasons = show.seasons.filter((s: any) => s.season_number > 0);
    const seasonsToLoad = validSeasons.length > 0 ? validSeasons : show.seasons;

    const seasonPromises = seasonsToLoad.map(async (s: any) => {
      const seasonData = await fetchTmdb<any>(`/tv/${tmdbId}/season/${s.season_number}`);
      const episodes: Episode[] = (seasonData?.episodes || []).map((ep: any) => ({
        id: `ep-${tmdbId}-${s.season_number}-${ep.episode_number}`,
        episodeNumber: ep.episode_number,
        title: ep.name || `Episode ${ep.episode_number}`,
        overview: ep.overview || 'Stream this acclaimed episode in Ultra HD on 67studio.',
        duration: ep.runtime ? `${ep.runtime}m` : '52m',
        thumbnailUrl: ep.still_path
          ? `${IMAGE_BASE_W780}${ep.still_path}`
          : (show.backdrop_path ? `${IMAGE_BASE_ORIGINAL}${show.backdrop_path}` : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85'),
        videoUrl: `https://player.vidlove.cc/embed/tv/${tmdbId}/${s.season_number}/${ep.episode_number}?autoplay=true&primarycolor=e50914&server=Dark`,
        progressPercent: Math.floor(Math.random() * 50) + 20,
      }));

      return {
        seasonNumber: s.season_number,
        title: s.name || `Season ${s.season_number}`,
        episodes,
      };
    });

    const seasons = await Promise.all(seasonPromises);
    TV_SEASONS_CACHE.set(tmdbId, seasons);
    return seasons;
  } catch (err) {
    console.warn(`Failed to fetch seasons for TV show ${tmdbId}:`, err);
    return [];
  }
}

export async function getBillboardMedia(): Promise<MediaItem> {
  try {
    const data = await fetchTmdb<{ results?: any[] }>('/movie/now_playing');
    if (data?.results && data.results.length > 0) {
      const topItem = data.results.find(
        (i: any) => i.backdrop_path && i.poster_path && i.vote_count > 1500 && i.vote_average >= 7.0
      );
      if (topItem) {
        const media = transformTmdbItem(topItem, 0, false);
        media.top10Rank = 1;
        const trailerKey = await getTmdbTrailerKey(topItem.id, 'movie');
        if (trailerKey) {
          media.youtubeKey = trailerKey;
          media.trailerUrl = `https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`;
        }
        return media;
      }
    }
  } catch (error) {
    console.warn('Error fetching live billboard, defaulting to verified viral blockbuster:', error);
  }
  return BILLBOARD_ITEM;
}

/**
 * Returns dynamic category shelves populated with authentic viral blockbusters and Netflix sensations
 */
export async function getContentRows(): Promise<CategoryRow[]> {
  try {
    const [
      trendingData,
      topRatedData,
      popularTvData,
      actionData,
      scifiData,
    ] = await Promise.all([
      fetchTmdb<{ results: any[] }>('/trending/all/week'),
      fetchTmdb<{ results: any[] }>('/movie/top_rated'),
      fetchTmdb<{ results: any[] }>('/tv/popular'),
      fetchTmdb<{ results: any[] }>('/discover/movie', { with_genres: 28, sort_by: 'vote_count.desc' }),
      fetchTmdb<{ results: any[] }>('/discover/movie', { with_genres: 878, sort_by: 'vote_count.desc' }),
    ]);

    const seenIds = new Set<string | number>();
    const seenTitles = new Set<string>();

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

    // Filter to guarantee high quality: require backdrop, poster, and minimum vote count (no slop or unreleased concepts)
    const extractUnique = (rawList: any[] | undefined, isTv: boolean = false, maxItems: number = 10): MediaItem[] => {
      if (!rawList || !Array.isArray(rawList)) return [];
      const out: MediaItem[] = [];
      for (const raw of rawList) {
        const title = raw.title || raw.name || raw.original_title || raw.original_name || '';
        const id = raw.id;
        if (!id || !title || !raw.backdrop_path || !raw.poster_path) continue;
        if (raw.vote_count !== undefined && raw.vote_count < 100) continue;
        if (isSeen(id, title)) continue;
        registerSeen(id, title);
        out.push(transformTmdbItem(raw, out.length, isTv));
        if (out.length >= maxItems) break;
      }
      return out;
    };

    const rows: CategoryRow[] = [];

    // Row 1: Trending on Netflix & Viral Hits
    const baseTrending = CATEGORY_ROWS[0]?.items || [];
    const primeTrending: MediaItem[] = [];
    for (const v of baseTrending) {
      if (!isSeen(v.id, v.title)) {
        registerSeen(v.id, v.title);
        if (v.tmdbId) registerSeen(v.tmdbId, v.title);
        primeTrending.push(v);
      }
    }
    const dynamicTrending = extractUnique(trendingData?.results, false, 8);
    rows.push({
      id: 'trending-now',
      title: 'Trending on Netflix & Viral Hits',
      items: [...primeTrending, ...dynamicTrending],
    });

    // Row 2: Top 10 Movies Today
    const baseTop10 = CATEGORY_ROWS[1]?.items || [];
    for (const v of baseTop10) {
      registerSeen(v.id, v.title);
      if (v.tmdbId) registerSeen(v.tmdbId, v.title);
    }
    rows.push({
      id: 'top-10-movies',
      title: 'Top 10 Movies & Series Today',
      isTop10: true,
      items: baseTop10,
    });

    // Row 3: Netflix Flagship & Global Sensation Series
    const baseSeries = CATEGORY_ROWS[2]?.items || [];
    const primeSeries: MediaItem[] = [];
    for (const v of baseSeries) {
      if (!isSeen(v.id, v.title)) {
        registerSeen(v.id, v.title);
        if (v.tmdbId) registerSeen(v.tmdbId, v.title);
        primeSeries.push(v);
      }
    }
    const dynamicTv = extractUnique(popularTvData?.results, true, 8);
    rows.push({
      id: 'netflix-flagship',
      title: 'Netflix Flagship & Global Sensation Series',
      items: [...primeSeries, ...dynamicTv],
    });

    // Row 4: Action & Sci-Fi Blockbusters
    const baseAction = CATEGORY_ROWS[3]?.items || [];
    const primeAction: MediaItem[] = [];
    for (const v of baseAction) {
      if (!isSeen(v.id, v.title)) {
        registerSeen(v.id, v.title);
        if (v.tmdbId) registerSeen(v.tmdbId, v.title);
        primeAction.push(v);
      }
    }
    const dynamicAction = extractUnique(actionData?.results, false, 6);
    const dynamicScifi = extractUnique(scifiData?.results, false, 6);
    rows.push({
      id: 'action-scifi',
      title: 'Action & Sci-Fi Blockbusters',
      items: [...primeAction, ...dynamicAction, ...dynamicScifi],
    });

    // Row 5: Critically Acclaimed Masterpieces
    const baseAcclaimed = CATEGORY_ROWS[4]?.items || [];
    const primeAcclaimed: MediaItem[] = [];
    for (const v of baseAcclaimed) {
      if (!isSeen(v.id, v.title)) {
        registerSeen(v.id, v.title);
        if (v.tmdbId) registerSeen(v.tmdbId, v.title);
        primeAcclaimed.push(v);
      }
    }
    const dynamicTopRated = extractUnique(topRatedData?.results, false, 8);
    rows.push({
      id: 'critically-acclaimed',
      title: 'Critically Acclaimed Masterpieces',
      items: [...primeAcclaimed, ...dynamicTopRated],
    });

    if (rows.length > 0) return rows;
  } catch (error) {
    console.warn('Error fetching live content rows, falling back to curated blockbusters:', error);
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
