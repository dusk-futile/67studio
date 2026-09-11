export type MaturityRating = 'G' | 'PG' | 'PG-13' | '16+' | '18+' | 'TV-MA' | 'R';
export type VideoQuality = 'HD' | '4K Ultra HD' | 'HDR' | 'Spatial Audio';

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  overview: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  progressPercent?: number;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface MediaItem {
  id: string;
  tmdbId?: number;
  title: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  trailerUrl: string;
  videoUrl: string;
  youtubeKey?: string;
  matchScore: number;
  maturityRating: MaturityRating;
  advisoryTags?: string[];
  releaseYear: number;
  duration: string;
  quality: VideoQuality;
  genres: string[];
  type: 'movie' | 'tv';
  top10Rank?: number;
  cast: string[];
  director: string;
  creator?: string;
  audioChannels?: string;
  subtitles?: string[];
  seasons?: Season[];
  isOriginal?: boolean;
  selectedSeason?: number;
  selectedEpisode?: number;
}

export interface CategoryRow {
  id: string;
  title: string;
  items: MediaItem[];
  isTop10?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  isKids?: boolean;
}
