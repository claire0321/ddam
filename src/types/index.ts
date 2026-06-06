export type MediaType = "movie" | "tv";

export interface TMDBMedia {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    overview: string;
    genres: TMDBGenre[];
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    media_type: MediaType;
}

export interface TMDBMediaProps {
    media: TMDBMedia;
}

export type TMDBGenre = {
    id: number;
    name: string;
};

// -----------------------------------------------------
// -----------------------------------------------------

export type WatchStatus =
    | "Watched" // ✓
    | "Plan to Watch" // 📌
    | "Watching" // ▶
    | "Not interested" // ✕
    | "New";

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

export interface UserMediaRecord {
    id: number;
    status: WatchStatus;
    rating: number; // 0.0 ~ 5.0
    review: string;
    updatedAt: string;
}

export interface MediaContextType {
    records: UserMediaRecord[];
    updateMediaRecord: (
        mediaId: number,
        status: WatchStatus,
        rating?: number,
        review?: string,
    ) => void;
    getMediaRecord: (mediaId: number) => UserMediaRecord;
    removeMediaRecord: (mediaId: number) => void;
}
