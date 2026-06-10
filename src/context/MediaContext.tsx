"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

import {
    WatchStatus,
    MediaRecord,
    MediaStorage,
    MediaContextType,
} from "@/src/types";

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const DEFAULT_RECORD: MediaRecord = {
    rating: 0,
    review: "",
    status: "New",
    updatedAt: 0,
};

export function useMediaContext() {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error("useMediaContext must be used within a MediaProvider");
    }
    return context;
}

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
    const [storage, setStorage] = useState<MediaStorage>({});

    // 1. Read LocalStorage
    useEffect(() => {
        const storedRecords = localStorage.getItem("media_tracker_storage");
        if (storedRecords) {
            try {
                setStorage(JSON.parse(storedRecords));
            } catch (e) {
                console.error(
                    "Failed to parse local storage media records:",
                    e,
                );
            }
        }
    }, []);

    const getMediaRecord = (id: number): MediaRecord => {
        return storage[id] ?? DEFAULT_RECORD;
    };

    const updateMediaRecord = (
        mediaId: number,
        status: WatchStatus = "New",
        rating: number = 0,
        review: string = "",
    ) => {
        setStorage((prev) => {
            const updated = {
                ...prev,
                [mediaId]: { status, rating, review, updatedAt: Date.now() },
            };

            localStorage.setItem(
                "media_tracker_storage",
                JSON.stringify(updated),
            );

            return updated;
        });
    };

    const value: MediaContextType = {
        storage,
        getMediaRecord,
        updateMediaRecord,
    };

    return (
        <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
    );
};
