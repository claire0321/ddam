"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { MediaCardProps } from "@/src/types";
import TicketMask from "@/public/Ticket.png";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

const cardBase = clsx(
    "relative w-full aspect-2/3",
    "transition-transform duration-200",
    "cursor-pointer select-none group",
    "[perspective:23rem]",
);

const maskStyle = {
    // Get Ticket.png file, and set it as masking map.
    maskImage: `url(${TicketMask.src})`,
    WebkitMaskImage: `url(${TicketMask.src})`,

    // Set the mask image to stretch and populate at the right rate for card size.
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",

    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
};

export default function MediaCard({
    media,
    isFlipped,
    onFlip,
}: MediaCardProps) {
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
                    <CardFront
                        media={media}
                        isFlipped={isFlipped}
                        onFlip={onFlip}
                    />
                    <CardBack
                        media={media}
                        isFlipped={isFlipped}
                        onFlip={onFlip}
                    />
                </div>
            </div>
        </div>
    );
}
