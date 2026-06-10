"use client";

import React, { useState } from "react";
import clsx from "clsx";

import MediaCard from "@/src/components/media/mediaCard/MediaCard";
import { TMDBMedia } from "@/src/types";

interface MediaGridProps {
    visibleMedias: TMDBMedia[];
}

export default function MediaGrid({ visibleMedias }: MediaGridProps) {
    const [flippedId, setFlippedId] = useState<number | null>(null);

    const handleCardClick = (id: number) => {
        setFlippedId((prevId) => (prevId === id ? null : id));
    };

    return (
        <>
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
        </>
    );
}
