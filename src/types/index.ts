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

export interface MediaInfoProps {
    media: TMDBMedia;
    rating: number;
    review: string;
}

export interface InfoEditProps {
    media: TMDBMedia;
    rating: number;
    review: string;
    onRatingChange: (rating: number) => void;
    onReviewChange: (rating: string) => void;
}

// -----------------------------------------------------
// -----------------------------------------------------

export interface MediaRecord {
    status: WatchStatus;
    rating: number;
    review: string;
    updatedAt: number;
}

export interface MediaStorage {
    [mediaId: number]: MediaRecord;
}

export interface MediaContextType {
    storage: MediaStorage;
    getMediaRecord: (id: number) => MediaRecord;
    updateMediaRecord: (
        id: number,
        status: WatchStatus,
        rating: number,
        review: string,
    ) => void;
}
