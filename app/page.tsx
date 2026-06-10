"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { getPopularMedia, searchMedia } from "@/src/lib/tmdb";
import { TMDBMedia } from "@/src/types";
import MediaCard from "@/src/components/mediaCard/MediaCard";

import clsx from "clsx";

export default function Home() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") ?? "";

    const [medias, setMedias] = useState<TMDBMedia[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [flippedId, setFlippedId] = useState<number | null>(null);

    const [visibleRows, setVisibleRows] = useState(3);
    const [apiPage, setApiPage] = useState(1);
    const [cardsPerRow, setCardsPerRow] = useState(1);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = searchQuery.trim()
                    ? await searchMedia(searchQuery, 1)
                    : await getPopularMedia();

                setMedias(data);
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
    }, [searchQuery]);

    useEffect(() => {
        const updateCardsPerRow = () => {
            const container = document.getElementById("media-grid-container");
            if (container) {
                const gridStyles = window.getComputedStyle(container);
                const templateColumns = gridStyles.getPropertyValue(
                    "grid-template-columns",
                );
                const columns = templateColumns.trim().split(/\s+/).length;
                setCardsPerRow(columns || 1);
            }
        };

        if (!loading) {
            updateCardsPerRow();
            window.addEventListener("resize", updateCardsPerRow);
        }
        return () => window.removeEventListener("resize", updateCardsPerRow);
    }, [medias, loading]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleCardClick = (id: number) => {
        setFlippedId((prevId) => (prevId === id ? null : id));
    };

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
                    setMedias((prev) => {
                        const combined = [...prev, ...nextData];
                        const uniqueMap = new Map();
                        combined.forEach((item) => {
                            if (!uniqueMap.has(item.id)) {
                                uniqueMap.set(item.id, item);
                            }
                        });
                        return Array.from(uniqueMap.values());
                    });
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
        medias.length % 20 == 0;

    return (
        <div className="flex flex-col w-full gap-8">
            {searchQuery ? (
                <h1 className="text-2xl font-bold mb-3 ml-3">
                    Search for {searchQuery}...
                </h1>
            ) : (
                <></>
            )}
            <div
                id="media-grid-container"
                className={clsx(
                    "grid",
                    "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]",
                    "gap-6",
                    "w-full",
                    "box-border",
                )}
            >
                {visibleMedias.map((media) => (
                    <MediaCard
                        key={media.id}
                        media={media}
                        isFlipped={flippedId === media.id}
                        onFlip={() => handleCardClick(media.id)}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center w-full pb-8">
                    <button
                        onClick={handleLoadMore}
                        disabled={isMoreLoading}
                        className={clsx(
                            "px-6 py-3",
                            "bg-[#dccfb8] text-[#6a5b4d] hover:bg-[#dccfb8]/60",
                            "rounded-lg shadow-md",
                            "font-bold",
                            "transition-colors duration-200",
                        )}
                    >
                        {isMoreLoading ? "Loading..." : "More"}
                    </button>
                </div>
            )}
        </div>
    );
}
