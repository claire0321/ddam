import { MediaType } from "@/src/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function getPopularMedia(page: number = 1) {
    const response = await fetch(
        `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${page}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch TMDB Data.");
    }

    const data = await response.json();
    return (data.results || []).filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv",
    );
}

// Search by Keywords
export async function searchMedia(query: string, page: number = 1) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    );
    if (!response.ok) {
        throw new Error("Failed to search medias...");
    }
    const data = await response.json();
    return (data.results || []).filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv",
    );
}

export async function getMediaDetails(type: MediaType, id: number) {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`,
    );
    return await response.json();
}

export async function getMediaCredits(type: MediaType, id: number) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`;
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`,
    );

    if (!res.ok) {
        const error = await res.text();

        console.error("Status:", res.status);
        console.error("Response:", error);
        console.error("URL:", url);

        throw new Error(`TMDB Error ${res.status}`);
    }

    return res.json();
}
