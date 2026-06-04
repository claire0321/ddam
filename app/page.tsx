"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getPopularMedia, searchMedia } from "@/src/lib/tmdb";
import { TMDBMedia } from "@/src/types";
import MediaCard from "@/src/components/MediaCard/MediaCard";
import Searchbar from "@/src/components/Searchbar";

import clsx from "clsx";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [medias, setMedias] = useState<TMDBMedia[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const [flippedId, setFlippedId] = useState<number | null>(null);

    useEffect(() => {
        if (!searchQuery.trim()) {
            const loadPopularMedia = async () => {
                try {
                    const data = await getPopularMedia(currentPage);
                    setMedias(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            loadPopularMedia();
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const searchResults = await searchMedia(searchQuery);
                setMedias(searchResults);
                setError(null);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleCardClick = (id: number) => {
        setFlippedId((prevId) => {
            if (prevId === id) return null;
            return id;
        });
    };

    return (
        <div className="py-16 px-8">
            <h1 className="px-5 py-10 text-6xl font-black">🎬 D.Dam</h1>

            <Searchbar value={searchQuery} onChange={setSearchQuery} />

            {error && <div className="error-message">{error}</div>}
            <div className="py-5 px-10">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div
                        className={clsx(
                            "grid",
                            "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
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
                )}
            </div>
        </div>
    );
}
