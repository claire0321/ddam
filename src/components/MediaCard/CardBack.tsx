import { TMDBMediaProps } from "@/src/types";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { useMediaRecord } from "@/src/hooks/useMediaRecord";

import StarRating from "@/src/components/Rating/StarRating";

const heading = clsx(
    "text-[10px] uppercase tracking-wider",
    "text-[#8a7a60] block",
);
const description =
    "mt-1 text-[0.625rem] text-[#5c4f3c] leading-tight line-clamp-4";

export default function CardBack({ media }: TMDBMediaProps) {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    const { status, myRating, myReview, updateRating } = useMediaRecord(
        media.id,
    );

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const y = e.clientY - rect.top;

        // Apply at bottom 40%
        setShow(y > rect.height * 0.6);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShow(false)}
            style={{ WebkitBackfaceVisibility: "hidden" }}
            className={clsx(
                "absolute inset-0 w-full h-full",
                "bg-[#dccfb8]",
                "p-6 font-mono",
                "flex flex-col justify-between",
                "backface-hidden",
                "transform-[rotateY(180deg)]",
            )}
        >
            {/* Design Frame*/}
            <div
                className={clsx(
                    "border border-soild border-[#b8ab90]",
                    "p-4 h-full flex flex-col justify-between",
                    "rounded-md",
                )}
            >
                <div>
                    <span className={clsx(heading)}>Title</span>

                    <h2
                        className={clsx(
                            "text-xl font-black tracking-tight uppercase text-[#6a5b4d]",
                            "leading-none mb-3 text-center",
                            "border-b border-[#c5b89d] pb-3",
                            "line-clamp-2",
                        )}
                    >
                        {media.title || media.name || "Unknown Title"}
                    </h2>

                    <div className={clsx("space-y-3 text-xs")}>
                        <div className={clsx("flex justify-between items-end")}>
                            <div>
                                <span className={clsx(heading)}>Release</span>
                                <p className={clsx(description)}>
                                    {media.release_date ??
                                        media.first_air_date ??
                                        "Unknown"}
                                </p>
                            </div>

                            <div className={clsx("text-right")}>
                                <span className={clsx(heading)}>
                                    User Score
                                </span>
                                <p className={clsx(description)}>
                                    {media.vote_average
                                        ? media.vote_average.toFixed(1)
                                        : "0.0"}
                                </p>
                            </div>
                        </div>

                        {/* Overview region (leaving space at bottom) */}
                        <div className={clsx("pt-2")}>
                            <span className={clsx(heading)}>Overview</span>

                            <p className={clsx(description)}>
                                {media.overview || "No overview available."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={clsx("space-y-2 mt-4")}>
                    <div className={clsx("border-t border-[#c5b89d]", "pt-2")}>
                        <div className="flex items-center gap-2">
                            <span className={clsx(heading, "algin-middle")}>
                                Rating
                            </span>
                            <StarRating
                                value={myRating}
                                size={"2.5rem"}
                                onChange={(newRating) => {
                                    updateRating(newRating);
                                }}
                            />
                            {/* <div className="text-xl">☆☆☆☆☆</div> */}
                        </div>
                    </div>

                    <div className={clsx("border-t border-[#c5b89d]", "pt-2")}>
                        <span className={clsx(heading)}>Review</span>

                        <div
                            className={clsx(
                                description,
                                "line-clamp-1",
                                !myReview && "italic",
                            )}
                        >
                            {myReview || "Write your thoughts here..."}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    "absolute inset-0",
                    "bg-linear-to-t from-[#2a2521]/90 via-[#2a2521]/20 to-transparent",
                    "opacity-0 transition-opacity duration-300 ease-out",
                    show && "opacity-100",
                )}
            />
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/media/${media.media_type}/${media.id}`);
                    }}
                    className={clsx(
                        "absolute bottom-1 right-1 z-10",
                        "bg-[#6a5b4d] text-[#e3d7be]",
                        "px-3 py-1.5 rounded",
                        "text-[11px] font-bold uppercase tracking-wider",
                        "transition-all duration-300 ease-out",
                        show
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-3 pointer-events-none",
                        "hover:bg-[#b79c7a]",
                        "hover:shadow-lg",
                    )}
                >
                    Detail
                </button>
            </div>
        </div>
    );
}
