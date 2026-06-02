import { TMDBMedia } from "../types";

export default function MediaCard({ media }: { media: TMDBMedia }) {
    const date = media.release_date ?? media.first_air_date;

    return (
        <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] transition-transform duration-200 flex flex-col h-full hover:-translate-y-1">
            <div className="relative w-full aspect-2/3">
                <img
                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    alt={media.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-base m-0">{media.title || media.name}</h3>
                <p className="text-gray-400 text-sm">{date?.split("-")[0]}</p>
            </div>
        </div>
    );
}
