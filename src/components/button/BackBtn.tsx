"use client";

import React from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={clsx(
                "group flex items-center gap-2",
                "px-4 py-2 mb-6 rounded-md transition-all duration-200",
                "bg-[#dccfb8]/50 text-[#6a5b4d] hover:bg-[#dccfb8]",
                "font-mono text-xs font-bold uppercase tracking-widest",
            )}
        >
            {/* 왼쪽 화살표 아이콘 */}
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
                ←
            </span>
            Back to List
        </button>
    );
}
