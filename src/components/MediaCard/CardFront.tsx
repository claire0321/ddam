import { TMDBMediaProps } from "@/src/types";

import clsx from "clsx";
import StatusBtn from "../button/StatusBtn";

export default function CardFront({ media }: TMDBMediaProps) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${media.poster_path}`;
    const title = media.title || media.name || "Unknown Title";
    const date = media.release_date ?? media.first_air_date;
    const year = date?.split("-")[0];

    return (
        <div
            className={clsx(
                "absolute inset-0 w-full h-full",
                "backface-hidden",
            )}
            style={{ WebkitBackfaceVisibility: "hidden" }}
        >
            <StatusBtn mediaId={media.id} className="top-3 right-3" />
            <img
                src={posterUrl}
                alt={title}
                className={clsx(
                    "w-full h-full object-cover",
                    "transition-transform duration-500",
                    "group-hover:scale-105",
                )}
            />

            {/* Text overlay */}
            <div
                className={clsx(
                    "absolute inset-0",
                    "bg-linear-to-t from-black/90 via-black/20 to-transparent",
                    "p-6 flex flex-col justify-end text-[#f4f0e6]",
                )}
            >
                <span
                    className={clsx(
                        "text-[10px] uppercase tracking-widest",
                        "text-[#dccfb8] font-bold mb-1",
                    )}
                >
                    {year}
                </span>

                <h2
                    className={clsx(
                        "text-xl font-black tracking-tight uppercase",
                        "line-clamp-2",
                    )}
                >
                    {title}
                </h2>
            </div>
        </div>
    );
}
