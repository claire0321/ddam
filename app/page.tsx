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
    // const [currentPage, setCurrentPage] = useState(1);

    const [flippedId, setFlippedId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = searchQuery.trim()
                    ? await searchMedia(searchQuery)
                    : await getPopularMedia();

                setMedias(data);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleCardClick = (id: number) => {
        setFlippedId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div
            className={clsx(
                "grid",
                "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]",
                "gap-6",
                "w-full",
                "box-border",
            )}
        >
            {medias.map((media) => (
                <MediaCard
                    key={media.id}
                    media={media}
                    isFlipped={flippedId === media.id}
                    onFlip={() => handleCardClick(media.id)}
                />
            ))}
        </div>
    );
}
