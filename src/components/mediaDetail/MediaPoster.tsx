import TicketPosterMask from "@/public/ticketMasK/Ticket-Poster.png";
import { TMDBMediaProps } from "@/src/types";

import { useMaskStyle } from "@/src/hooks/useMaskStyle";

export default function MediaPoster({ media }: TMDBMediaProps) {
    const maskStyle = useMaskStyle(TicketPosterMask.src);

    return (
        <div className="flex-1" style={maskStyle}>
            <img
                src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
                alt={media?.title || media?.name || "Unknown Title"}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
