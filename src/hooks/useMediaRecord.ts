"use client";

import { useMediaContext } from "@/src/context/MediaContext";
import { WatchStatus } from "@/src/types";

export function useMediaRecord(mediaId: number) {
    const { getMediaRecord, updateMediaRecord } = useMediaContext();

    const currentRecord = getMediaRecord(mediaId);

    const updateStatus = (newStatus: WatchStatus) => {
        updateMediaRecord(
            mediaId,
            newStatus,
            currentRecord.rating,
            currentRecord.review,
        );
    };

    const updateRating = (newRating: number) => {
        updateMediaRecord(
            mediaId,
            currentRecord.status,
            newRating,
            currentRecord.review,
        );
    };

    const updateReview = (newReview: string) => {
        updateMediaRecord(
            mediaId,
            currentRecord.status,
            currentRecord.rating,
            newReview,
        );
    };

    const updateAll = (status: WatchStatus, rating: number, review: string) => {
        updateMediaRecord(mediaId, status, rating, review);
    };

    return {
        status: currentRecord.status,
        myRating: currentRecord.rating,
        myReview: currentRecord.review,
        record: currentRecord,

        updateStatus,
        updateRating,
        updateReview,
        updateAll,
    };
}
