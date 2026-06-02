export type WatchStatus =
    | "Watched"
    | "Plan to Watch"
    | "Watching"
    | "Not interested";

export interface MediaItem {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    genres: string[];
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    status: WatchStatus;
    userRating?: number;
    notes?: string;
    tags?: string[];
    addedAt: string;
}

export interface TMDBMedia {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    overview: string;
    genre_ids: number[];
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
}
