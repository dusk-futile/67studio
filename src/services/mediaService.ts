import { MediaItem, CategoryRow } from '../types/media';
import { BILLBOARD_ITEM, CATEGORY_ROWS, ALL_MEDIA_ITEMS } from './mockData';
import { getScrapedNetflixMedia } from './apifyService';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '037d13c7206d0b6cf56e42cf8c42b902';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const IMAGE_BASE_W780 = 'https://image.tmdb.org/t/p/w780';

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

  const genres = item.genre_ids && Array.isArray(item.genre_ids) && item.genre_ids.length > 0
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
    const res = await fetch(`${TMDB_BASE_URL}/${type}/${tmdbId}/videos?api_key=${TMDB_API_KEY}`);
    if (res.ok) {
      const data = await res.json();
      const trailer = data.results?.find(
        (v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
      );
      return trailer?.key || data.results?.[0]?.key;
    }
  } catch (e) {
    console.warn('Failed to fetch trailer key from TMDB:', e);
  }
  return undefined;
}

export async function getBillboardMedia(): Promise<MediaItem> {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const topItem = data.results.find((i: any) => i.backdrop_path && i.overview && i.overview.length > 50) || data.results[0];
        const media = transformTmdbItem(topItem, 0, false);
        media.top10Rank = 1;
        media.isOriginal = true;

        const trailerKey = await getTmdbTrailerKey(topItem.id, 'movie');
        if (trailerKey) {
          media.youtubeKey = trailerKey;
        }
        return media;
      }
    }
  } catch (error) {
    console.warn('Error fetching TMDB billboard media, using local fallback:', error);
  }
  return BILLBOARD_ITEM;
}

export async function getContentRows(): Promise<CategoryRow[]> {
  try {
    const [
      trendingRes,
      topRatedRes,
      popularTvRes,
      actionRes,
      scifiRes,
      dramaRes,
      animationRes,
      apifyItems,
    ] = await Promise.all([
      fetch(`${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/discover/movie?with_genres=878&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/discover/tv?with_genres=16&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`),
      getScrapedNetflixMedia(),
    ]);

    const trendingData = trendingRes.ok ? await trendingRes.json() : null;
    const topRatedData = topRatedRes.ok ? await topRatedRes.json() : null;
    const popularTvData = popularTvRes.ok ? await popularTvRes.json() : null;
    const actionData = actionRes.ok ? await actionRes.json() : null;
    const scifiData = scifiRes.ok ? await scifiRes.json() : null;
    const dramaData = dramaRes.ok ? await dramaRes.json() : null;
    const animationData = animationRes.ok ? await animationRes.json() : null;

    const rows: CategoryRow[] = [];

    // Apify Scraped Netflix Originals Shelf
    if (apifyItems && apifyItems.length > 0) {
      rows.push({
        id: 'apify-netflix-originals',
        title: 'Netflix Exclusives (Live Apify Scraper)',
        items: apifyItems,
      });
    }

    if (trendingData?.results?.length) {
      rows.push({
        id: 'trending-now',
        title: 'Trending Now',
        items: trendingData.results.slice(0, 12).map((item: any, idx: number) => transformTmdbItem(item, idx)),
      });
    }

    if (topRatedData?.results?.length) {
      rows.push({
        id: 'top-10-movies',
        title: 'Top 10 in Movies Today',
        isTop10: true,
        items: topRatedData.results.slice(0, 10).map((item: any, idx: number) => {
          const trans = transformTmdbItem(item, idx, false);
          trans.top10Rank = idx + 1;
          return trans;
        }),
      });
    }

    if (popularTvData?.results?.length) {
      rows.push({
        id: 'popular-tv',
        title: 'Popular TV Series',
        items: popularTvData.results.slice(0, 12).map((item: any, idx: number) => transformTmdbItem(item, idx, true)),
      });
    }

    if (actionData?.results?.length) {
      rows.push({
        id: 'action-movies',
        title: 'Action & Adventure Blockbusters',
        items: actionData.results.slice(0, 12).map((item: any, idx: number) => transformTmdbItem(item, idx, false)),
      });
    }

    if (scifiData?.results?.length) {
      rows.push({
        id: 'scifi-movies',
        title: 'Sci-Fi & Cyberpunk',
        items: scifiData.results.slice(0, 12).map((item: any, idx: number) => transformTmdbItem(item, idx, false)),
      });
    }

    if (dramaData?.results?.length) {
      rows.push({
        id: 'acclaimed-dramas',
        title: 'Critically Acclaimed Dramas',
        items: dramaData.results.slice(0, 12).map((item: any, idx: number) => transformTmdbItem(item, idx, false)),
      });
    }

    if (animationData?.results?.length) {
      rows.push({
        id: 'animation-series',
        title: 'Animation & Speculative Series',
        items: animationData.results.slice(0, 12).map((item: any, idx: number) => transformTmdbItem(item, idx, true)),
      });
    }

    if (rows.length > 0) return rows;
  } catch (error) {
    console.warn('Error fetching content rows, using local fallback:', error);
  }

  return CATEGORY_ROWS;
}

export async function searchMedia(query: string): Promise<MediaItem[]> {
  const normalized = query.trim();
  if (!normalized) return [];

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(normalized)}&api_key=${TMDB_API_KEY}&include_adult=false`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results
          .filter((item: any) => item.backdrop_path || item.poster_path)
          .map((item: any, idx: number) => transformTmdbItem(item, idx, item.media_type === 'tv'));
      }
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
      const res = await fetch(`${TMDB_BASE_URL}/movie/${rawId}/similar?api_key=${TMDB_API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return data.results
            .slice(0, 6)
            .map((item: any, idx: number) => transformTmdbItem(item, idx, false));
        }
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
