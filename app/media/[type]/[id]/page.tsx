"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";

import { TMDBMedia, MediaType } from "@/src/types";
import { getMediaDetails } from "@/src/lib/tmdb";

import MediaPoster from "@/src/components/mediaDetail/MediaPoster";
import MediaInfo from "@/src/components/mediaDetail/MediaInfo";

import BackBtn from "@/src/components/button/BackBtn";

export default function MediaDetailPage() {
    const { type, id } = useParams() as { type: MediaType; id: string };

    const [media, setMedia] = useState<TMDBMedia | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const data = await getMediaDetails(type, Number(id));
                setMedia(data);
            } catch (error) {
                console.error("Failed to fetch media details:", error);
            } finally {
                setLoading(false);
            }
        }
        if (id && type) loadData();
    }, [id, type]);

    if (loading) return <div>Loading...</div>;
    if (!media) return <div>{type} not Found.</div>;

    return (
        <div>
            <BackBtn />
            <div className="min-h-screen flex flex-col px-60">
                <div className="w-full max-w-240 flex justify-start"></div>
                <div className="flex flex-col items-center w-full h-auto">
                    <div
                        className="w-full flex items-stretch"
                        style={{
                            filter: "drop-shadow(0px 16px 32px rgba(42, 37, 33, 0.2))",
                        }}
                    >
                        <MediaPoster media={media} />
                        <MediaInfo media={media} />
                    </div>

                    <div className="w-full flex justify-end mt-4">
                        <button className="bg-[#dccfb8] text-[#2a2521] px-5 py-2 rounded shadow-sm text-xs font-bold hover:bg-[#b79c7a] hover:text-[#f4f0e6] transition-colors">
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
