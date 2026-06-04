import { MediaCardProps } from "@/src/types";
import clsx from "clsx";

const heading = clsx(
    "text-[10px] uppercase tracking-wider",
    "text-[#8a7a60] block mb-1",
);
const description = "text-[0.625rem] text-[#5c4f3c] leading-tight line-clamp-4";

export default function CardBack({ media, isFlipped, onFlip }: MediaCardProps) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${media.poster_path}`;
    const title = media.title || media.name || "Unknown Title";
    const date = media.release_date ?? media.first_air_date;
    const year = date?.split("-")[0];

    return (
        <div
            style={{ WebkitBackfaceVisibility: "hidden" }}
            className={clsx(
                "absolute inset-0 w-full h-full",
                "bg-[#dccfb8] text-[#4a3e2e]",
                "p-6 font-mono",
                "flex flex-col justify-between",
                "border border-[#c5b89d]/40",
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
                        {title}
                    </h2>

                    <div className={clsx("space-y-3 text-xs")}>
                        <div className={clsx("flex justify-between items-end")}>
                            <div>
                                <span className={clsx(heading)}>Release</span>
                                <p className={clsx(description)}>
                                    {date || "Unknown"}
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
                        <span className={clsx(heading)}>Rating</span>

                        <div
                            className={clsx(
                                "flex items-center justify-between",
                            )}
                        >
                            <div className={clsx("text-xl")}>☆☆☆☆☆</div>
                        </div>
                    </div>

                    <div className={clsx("border-t border-[#c5b89d]", "pt-2")}>
                        <span className={clsx(heading)}>Review</span>

                        <p className={clsx(description)}>
                            Tap to flip back and see the poster...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
