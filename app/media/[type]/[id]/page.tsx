"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { TMDBMedia, MediaType } from "@/src/types";
import { getMediaDetails } from "@/src/lib/tmdb";

import MediaPoster from "@/src/components/mediaDetail/MediaPoster";
import MediaInfo from "@/src/components/mediaDetail/MediaInfo";
import InfoEdit from "@/src/components/mediaDetail/InfoEdit";

import BackBtn from "@/src/components/button/BackBtn";
import { useMediaRecord } from "@/src/hooks/useMediaRecord";

export default function MediaDetailPage() {
    const params = useParams();
    const mediaId = Number(params?.id as string);
    const type = params?.type as MediaType;

    const { status, myRating, myReview, updateAll } = useMediaRecord(mediaId);

    const [media, setMedia] = useState<TMDBMedia | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [tempRating, setTempRating] = useState<number>(0);
    const [tempReview, setTempReview] = useState<string>("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const data = await getMediaDetails(type, mediaId);
                setMedia(data);
            } catch (error) {
                console.error("Failed to fetch media details:", error);
            } finally {
                setLoading(false);
            }
        }
        if (mediaId && type) loadData();
    }, [mediaId, type]);

    if (loading) return <div>Loading...</div>;
    if (!media) return <div>{type} not Found.</div>;

    // Handle Action Button click (Toggle between Comment mode and Save mode)
    const handleActionClick = () => {
        if (!isEditing) {
            // Entering Edit Mode: Synchronize temporary states with the current values
            setTempRating(myRating);
            setTempReview(myReview);
            setIsEditing(true);
        } else {
            // Saving Changes: Persist temporary states into the main states and return to view mode
            updateAll(status, tempRating, tempReview);
            setIsEditing(false);
        }
    };

    return (
        <div>
            <BackBtn />
            <div className="flex flex-col px-60">
                <div className="w-full max-w-240 flex justify-start"></div>
                <div className="flex flex-col items-center w-full h-auto">
                    <div
                        className="w-full flex items-stretch"
                        style={{
                            filter: "drop-shadow(0px 16px 32px rgba(42, 37, 33, 0.2))",
                        }}
                    >
                        <MediaPoster media={media} />
                        {!isEditing ? (
                            <MediaInfo
                                media={media}
                                rating={myRating}
                                review={myReview}
                            />
                        ) : (
                            <InfoEdit
                                media={media}
                                rating={tempRating}
                                review={tempReview}
                                onRatingChange={setTempRating}
                                onReviewChange={setTempReview}
                            />
                        )}
                    </div>

                    <div className="w-full flex justify-end mt-4">
                        <button
                            onClick={handleActionClick}
                            className={clsx(
                                "bg-[#dccfb8]",
                                "text-[#2a2521]",
                                "px-5 py-2",
                                "rounded shadow-sm",
                                "text-xs font-bold",
                                "hover:bg-[#b79c7a]",
                                "hover:text-[#f4f0e6]",
                                "transition-colors",
                            )}
                        >
                            {isEditing ? "SAVE" : "COMMENT"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
