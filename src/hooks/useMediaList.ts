"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getPopularMedia, searchMedia } from "@/src/lib/tmdb";
import { TMDBMedia } from "@/src/types";

export function useMediaList(
    cardsPerRow: number,
    visibleRows: number,
    setVisibleRows: React.Dispatch<React.SetStateAction<number>>,
) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") ?? "";

    const [medias, setMedias] = useState<TMDBMedia[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiPage, setApiPage] = useState(1);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    // Helper function to remove duplicates using a Map
    const mergeUniqueMedias = (prev: TMDBMedia[], next: TMDBMedia[]) => {
        const map = new Map<number, TMDBMedia>();
        prev.forEach((item) => map.set(item.id, item));
        next.forEach((item) => map.set(item.id, item));
        return Array.from(map.values());
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = searchQuery.trim()
                    ? await searchMedia(searchQuery, 1)
                    : await getPopularMedia();

                // Safe deduplication for initial load
                const uniqueData = mergeUniqueMedias([], data || []);
                setMedias(uniqueData);
                setApiPage(1);
                setVisibleRows(3);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch media");
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchData, 400);
        return () => clearTimeout(debounce);
    }, [searchQuery, setVisibleRows]);

    const handleLoadMore = async () => {
        const nextRows = visibleRows + 3;
        const requiredCount = cardsPerRow * nextRows;

        if (medias.length <= requiredCount) {
            setIsMoreLoading(true);
            try {
                const nextPage = apiPage + 1;
                const nextData = searchQuery.trim()
                    ? await searchMedia(searchQuery, nextPage)
                    : await getPopularMedia(nextPage);

                if (nextData && nextData.length > 0) {
                    setMedias((prev) => mergeUniqueMedias(prev, nextData));
                    setApiPage(nextPage);
                }
            } catch (err) {
                console.error("Failed to load subsequent api page:", err);
            } finally {
                setIsMoreLoading(false);
            }
        }
        setVisibleRows(nextRows);
    };

    const maxVisibleCount = cardsPerRow * visibleRows;
    const visibleMedias = medias.slice(0, maxVisibleCount);
    const hasMore =
        isMoreLoading ||
        medias.length > visibleMedias.length ||
        medias.length % 20 === 0;

    return {
        visibleMedias,
        loading,
        error,
        isMoreLoading,
        hasMore,
        handleLoadMore,
    };
}
