"use client";

import React from "react";

interface RatingProps {
    max?: number;
    step?: number;
    value: number;
    size?: string;
    onChange: (value: number) => void; // 📌 값 변경 이벤트를 부모로 전달합니다.
}

export default function StarRating({
    max = 5,
    step = 0.5,
    value,
    size,
    onChange,
}: RatingProps) {
    const normalizedValue = Math.floor(value / step) * step;

    const getFillPercent = (index: number) => {
        const fillValue = normalizedValue - index; // 📌 rating 변수 대신 외부에서 온 value를 봅니다.

        if (fillValue >= 1) return 100;
        if (fillValue <= 0) return 0;

        return fillValue * 100;
    };

    return (
        <div className="flex items-start gap-1">
            {Array.from({ length: max }).map((_, index) => (
                <div
                    key={index}
                    className={`relative leading-none select-none`}
                    style={{ fontSize: size }}
                >
                    {/* Empty Star */}
                    <span className="text-[#B79c7a]/50">☆</span>

                    {/* Filled Star */}
                    <span
                        className="absolute inset-0 overflow-hidden text-[#B79c7a]"
                        style={{
                            width: `${getFillPercent(index)}%`,
                        }}
                    >
                        ★
                    </span>
                </div>
            ))}
        </div>
    );
}
