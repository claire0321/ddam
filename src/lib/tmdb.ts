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
    return data.results;
}

// Search by Keywords
export async function searchMedia(query: string) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
        throw new Error("Failed to search medias...");
    }
    const data = await response.json();
    return data.results;
}

export async function getMediaDetails(type: "movie" | "tv", id: number) {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR`,
    );
    return await response.json();
}
