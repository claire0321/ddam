"use client";

import { useMediaContext } from "@/src/store/MediaContext"; // 실제 파일 경로로 수정해 주세요
import { UserMediaRecord, WatchStatus } from "@/src/types";

export function useMediaRecord(mediaId: number) {
    const { getMediaRecord, updateMediaRecord } = useMediaContext();

    // 📌 해당 미디어의 현재 기록 상태 (status, rating, review 등)
    const currentRecord = getMediaRecord(mediaId);

    // 📌 평점이나 리뷰를 업데이트할 때 상태(status) 유실 없이 쉽게 쓸 수 있도록 래핑한 함수들
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

    // 📌 한 번에 통째로 업데이트하고 싶을 때 쓰는 전천후 함수
    const updateAll = (status: WatchStatus, rating: number, review: string) => {
        updateMediaRecord(mediaId, status, rating, review);
    };

    return {
        // 기존 데이터 분해 할당 편의성 제공
        status: currentRecord.status,
        myRating: currentRecord.rating,
        myReview: currentRecord.review,
        record: currentRecord, // 통째로 필요할 때를 대비

        // 헬퍼 업데이트 함수들
        updateStatus,
        updateRating,
        updateReview,
        updateAll,
    };
}
