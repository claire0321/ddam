"use client";

import React from "react";
import clsx from "clsx";

import { TMDBMedia } from "@/src/types";
import TicketMask from "@/public/ticketMask/Ticket.png";

import { useMaskStyle } from "@/src/hooks/useMaskStyle";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

interface MediaCardProps {
    media: TMDBMedia;
    isFlipped: boolean;
    onFlip: () => void;
}

const cardBase = clsx(
    "relative w-full aspect-2/3",
    "transition-transform duration-200",
    "cursor-pointer select-none group",
    "[perspective:23rem]",
);

export default function MediaCard({
    media,
    isFlipped,
    onFlip,
}: MediaCardProps) {
    const maskStyle = useMaskStyle(TicketMask.src);

    return (
        <div
            className={clsx(
                "transition-transform duration-300",
                "hover:-translate-y-1",
            )}
            style={{
                filter: "drop-shadow(0px 15px 15px rgba(42, 37, 33, 0.5))",
                perspective: "1000px",
            }}
        >
            <div onClick={onFlip} style={maskStyle} className={cardBase}>
                <div
                    className={`relative w-full h-full duration-700 shadow-2xl ${
                        isFlipped ? "transform-[rotateY(180deg)]" : ""
                    }`}
                    style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                    }}
                >
                    <CardFront media={media} />
                    <CardBack media={media} />
                </div>
            </div>
        </div>
    );
}
