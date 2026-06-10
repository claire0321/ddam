import clsx from "clsx";

import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useParams } from "next/navigation";

import TicketInfoMask from "@/public/ticketMask/Ticket-Info.png";
import { InfoEditProps, MediaType } from "@/src/types";
import { getMediaCredits } from "@/src/lib/tmdb";

import { useMaskStyle } from "@/src/hooks/useMaskStyle";

import StarRating from "@/src/components/rating/StarRating";

export default function InfoEdit({
    media,
    rating,
    review,
    onRatingChange,
    onReviewChange,
}: InfoEditProps) {
    const { type, id } = useParams() as { type: MediaType; id: string };
    const [credits, setCredits] = useState<any>(null);

    const maskStyle = useMaskStyle(TicketInfoMask.src);

    const genres = media?.genres.length
        ? `${media.genres
              .slice(0, 5)
              .map((g: any) => g.name)
              .join(", ")}${media.genres.length > 5 ? "..." : ""}`
        : "N/A";

    useEffect(() => {
        async function fetchCredits() {
            const data = await getMediaCredits(type, Number(id));
            setCredits(data);
        }
        fetchCredits();
    }, [type, Number(id)]);

    if (!credits) return <div>Loading...</div>;

    const handleRatingInputChange = (val: string) => {
        if (val === "") {
            onRatingChange(0);
            return;
        }

        let num = parseFloat(val);
        if (isNaN(num)) return;

        // Force bound constraints
        if (num > 5) num = 5;
        if (num < 0) num = 0;

        num = Math.round(num * 10) / 10;

        onRatingChange(num);
    };

    return (
        <div
            className={clsx(
                "flex-2",
                "flex",
                "flex-col",
                "justify-between",
                "p-10",
                "bg-[#dccfb8]",
                "text-[#4a3e2e]",
            )}
            style={maskStyle}
        >
            {/* Inner Frame */}
            <div
                className={clsx(
                    "min-h-125",
                    "flex",
                    "flex-col",
                    "justify-between",
                    "p-5",
                    "text-xs",
                    "border",
                    "border-[#b79c7a]",
                )}
            >
                {/* Title, Release, User Score, Genre */}
                <div className={clsx("flex pb-6 gap-10", borderB)}>
                    <div className="flex flex-col">
                        <span className={clsx(heading)}>Title</span>
                        <div className="flex-1 flex items-center">
                            <h1
                                className={clsx(
                                    "text-2xl text-[#6a5b4d] font-black",
                                    "uppercase",
                                    "mx-2",
                                )}
                            >
                                {media?.title || media?.name || "Unknown Title"}
                            </h1>
                        </div>
                    </div>
                    <div className="flex-2 grid grid-cols-2 gap-4">
                        <div>
                            <span className={clsx(heading)}>Release</span>
                            <p className={clsx(description)}>
                                {media?.release_date ?? media?.first_air_date}
                            </p>
                        </div>
                        <div>
                            <span className={clsx(heading)}>User Score</span>
                            <p className={clsx(description)}>
                                {media?.vote_average || "N/A"}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <span className={clsx(heading)}>Genre</span>
                            <p className={clsx(description)}>{genres}</p>
                        </div>
                    </div>
                </div>

                <div className={clsx("py-5 flex-1", borderB)}>
                    <div className="flex items-center gap-2 h-auto">
                        <span className={clsx(heading, "mb-0 self-start")}>
                            Rating
                        </span>

                        {/* Star Rating */}
                        <StarRating
                            value={rating}
                            size={"4rem"}
                            onChange={(rating) => {
                                onRatingChange(rating);
                            }}
                        />

                        <div className="flex items-center gap-2 mt-3">
                            <input
                                id="numeric-rating"
                                type="number"
                                min="0"
                                max="5"
                                step="0.25"
                                value={rating || ""}
                                onChange={(e) =>
                                    handleRatingInputChange(e.target.value)
                                }
                                placeholder="0.0"
                                className={clsx(
                                    "w-20 ml-5 p-2 rounded-lg border text-sm text-center font-bold font-[#6a5b4d]",
                                    "focus:outline-none focus:ring-1 focus:ring-[#6a5b4d]",
                                    "border-[#b79c7a]/50 bg-[#dccfb8]",
                                    "[appearance:textfield]",
                                    "[&::-webkit-outer-spin-button]:appearance-none",
                                    "[&::-webkit-inner-spin-button]:appearance-none",
                                )}
                            />
                            <span className={clsx(description, "h-0")}>
                                / 5.0 ]
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-5 flex-3 h-screen">
                    <div className="flex flex-col h-full">
                        <span className={clsx(heading)}>Review</span>

                        <TextareaAutosize
                            value={review}
                            onChange={(e) => onReviewChange(e.target.value)}
                            placeholder="Write your thoughts here..."
                            className={clsx(
                                "flex-1",
                                "w-full p-2",
                                "text-[#6a5b4d]",
                                "bg-transparent",
                                "resize-none",
                                "focus:outline-none",
                                "border border-[#b79c7a]",
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const heading = clsx(
    "block",
    "text-xs",
    "uppercase",
    "tracking-wider",
    "text-[#6a5b4d] font-bold",
    "mb-1",
);

const description = clsx("font-medium text-[#6a5b4d] ml-1");

const borderB = clsx("border-b border-[#b79c7a]");
