"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useMediaList } from "@/src/hooks/useMediaList";
import LoadMoreBtn from "@/src/components/button/LoadMoreBtn";
import MediaGrid from "@/src/components/media/MediaGrid";

export default function Home() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") ?? "";

    const [visibleRows, setVisibleRows] = useState(3);
    const [cardsPerRow, setCardsPerRow] = useState(1);

    // Integrate the search custom hook
    const {
        visibleMedias,
        loading,
        error,
        isMoreLoading,
        hasMore,
        handleLoadMore,
    } = useMediaList(cardsPerRow, visibleRows, setVisibleRows);

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
    }, [visibleMedias, loading]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col w-full gap-8">
            {searchQuery && (
                <h1 className="text-2xl font-bold mb-3 ml-3">
                    Search for {searchQuery}...
                </h1>
            )}

            <MediaGrid visibleMedias={visibleMedias} />

            {hasMore && (
                <div className="flex justify-center w-full pb-8">
                    <LoadMoreBtn
                        loading={isMoreLoading}
                        onClick={handleLoadMore}
                    />
                </div>
            )}
        </div>
    );
}
