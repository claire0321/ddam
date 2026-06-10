"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

import { TMDBMedia, MediaRecord } from "@/src/types";
import { useMediaContext } from "@/src/context/MediaContext";
import MediaCard from "@/src/components/mediaCard/MediaCard";
import { searchMedia, getPopularMedia } from "@/src/lib/tmdb";

import BackBtn from "@/src/components/button/BackBtn";

export default function MyPage() {
    const { storage } = useMediaContext();

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") ?? "";

    const [medias, setMedias] = useState<TMDBMedia[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [flippedId, setFlippedId] = useState<number | null>(null);

    const recordMap = useMemo((): Map<number, MediaRecord> => {
        const map = new Map<number, MediaRecord>();
        if (!storage) return map;

        Object.entries(storage).forEach(([key, value]) => {
            const numericId = Number(key);
            if (!isNaN(numericId)) {
                map.set(numericId, value as MediaRecord);
            }
        });
        return map;
    }, [storage]);

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

    const handleCardClick = (id: number) => {
        setFlippedId((prevId) => (prevId === id ? null : id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const recordedMedias = medias.filter((media) => {
        const record = recordMap.get(media.id);
        // Exclude default or unrecorded "New" baseline placeholders safely
        return record && record.status !== "New";
    });

    if (recordedMedias.length === 0) {
        return (
            <div>
                <BackBtn />
                <div className="flex flex-col items-start p-8 font-mono text-[#6a5b4d]">
                    <h2 className="text-xl font-bold uppercase mb-2">
                        No Media Records
                    </h2>
                    <p className="text-xs text-[#6a5b4d]/60 italic">
                        Start recording medias to your page and they will appear
                        here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <BackBtn />
            <div
                className={clsx(
                    "grid",
                    "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]",
                    "gap-6",
                    "w-full",
                    "box-border",
                )}
            >
                {recordedMedias.map((media) => (
                    <MediaCard
                        key={media.id}
                        media={media}
                        isFlipped={flippedId === media.id}
                        onFlip={() => handleCardClick(media.id)}
                    />
                ))}
            </div>
        </div>
    );
}
