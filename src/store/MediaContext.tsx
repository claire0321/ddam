"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

import { WatchStatus, UserMediaRecord, MediaContextType } from "../types";

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMediaContext = (): MediaContextType => {
    const context = useContext(MediaContext);

    if (!context) {
        throw new Error("useMediaContext must be used within a MediaProvider");
    }

    return context;
};

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
    const [records, setRecords] = useState<UserMediaRecord[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Read LocalStorage
    useEffect(() => {
        const storedRecords = localStorage.getItem("user_media_records");
        if (storedRecords) {
            setRecords(JSON.parse(storedRecords));
        }
        setIsLoaded(true);
    }, []);

    // 2. Update LocalStorage when status change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("user_media_records", JSON.stringify(records));
        }
    }, [records, isLoaded]);

    const updateMediaRecord = (
        mediaId: number,
        status: WatchStatus,
        rating: number = 0,
        review: string = "",
    ) => {
        setRecords((prev) => {
            const exists = prev.some((item) => item.id === mediaId);
            const timestamp = new Date().toISOString();

            if (exists) {
                return prev.map((item) =>
                    item.id === mediaId
                        ? {
                              ...item,
                              status,
                              rating,
                              review,
                              updatedAt: timestamp,
                          }
                        : item,
                );
            } else {
                return [
                    ...prev,
                    {
                        id: mediaId,
                        status,
                        rating,
                        review,
                        updatedAt: timestamp,
                    },
                ];
            }
        });
    };

    const getMediaRecord = (mediaId: number): UserMediaRecord => {
        const found = records.find((item) => item.id === mediaId);
        return (
            found || {
                id: mediaId,
                status: "New", // Default
                rating: 0,
                review: "",
                updatedAt: "",
            }
        );
    };

    const removeMediaRecord = (mediaId: number) => {
        setRecords((prev) => prev.filter((item) => item.id !== mediaId));
    };

    const value: MediaContextType = {
        records,
        updateMediaRecord,
        getMediaRecord,
        removeMediaRecord,
    };

    return (
        <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
    );
};
