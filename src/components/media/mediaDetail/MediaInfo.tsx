import clsx from "clsx";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import TicketInfoMask from "@/public/ticketMask/Ticket-Info.png";
import { MediaInfoProps, MediaType } from "@/src/types";
import { getMediaCredits } from "@/src/lib/tmdb";

import { useMaskStyle } from "@/src/hooks/useMaskStyle";

import StarRating from "@/src/components/rating/StarRating";

export default function MediaInfo({ media, rating, review }: MediaInfoProps) {
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

    if (!credits) {
        return <div>Loading...</div>;
    } else {
        console.log(
            credits.cast.map((person: any) => ({
                name: person.name,
                character: person.character,
            })),
        );
        console.log(
            credits.crew.map((person: any) => ({
                name: person.name,
                job: person.job,
            })),
        );
    }

    const cast = credits.cast.length
        ? `${credits.cast
              .slice(0, 10)
              .map((p: any) => p.name)
              .join(", ")}${credits.cast.length > 10 ? "..." : ""}`
        : "N/A";

    const roles = new Set(["Executive Producer", "Director"]);

    const keyCrew = (credits.crew ?? []).filter((p: any) => roles.has(p.job));

    const director = keyCrew.length
        ? `${keyCrew
              .slice(0, 5)
              .map((p: any) => p.name)
              .join(", ")}${keyCrew.length > 5 ? "..." : ""}`
        : "N/A";

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
                    "h-full",
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

                <div className={clsx("py-5 space-y-4 flex-1", borderB)}>
                    <div>
                        <span className={clsx(heading)}>Overview</span>
                        <p className={clsx(description, "leading-relaxed")}>
                            {media?.overview ||
                                "No overview context available."}
                        </p>
                    </div>
                    <div className="flex">
                        <span className={clsx(heading)}>Director</span>
                        <p className={clsx(description, "ml-4")}>{director}</p>
                    </div>
                    <div className="flex">
                        <span className={clsx(heading)}>Cast</span>
                        <p className={clsx(description, "line-clamp-2 ml-12")}>
                            {cast}
                        </p>
                    </div>
                </div>

                <div className="pt-5 space-y-4">
                    <div className="flex items-center gap-2">
                        <span className={clsx(heading, "mb-0 self-start")}>
                            Rating
                        </span>

                        {/* Star Rating */}
                        <StarRating value={rating} size={"4rem"} />
                        <span className={clsx(description, "h-0")}>
                            [{rating ? rating.toFixed(1) : "0.0"} / 5.0]
                        </span>
                    </div>
                    <div>
                        <span className={clsx(heading)}>Review</span>
                        <div
                            className={clsx(
                                description,
                                !review && "min-h-15 italic",
                            )}
                        >
                            {review || "Write your thoughts here..."}
                        </div>
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
