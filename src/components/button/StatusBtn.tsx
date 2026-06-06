import clsx from "clsx";

import React, { useState, useRef, useEffect } from "react";

import { useMediaRecord } from "@/src/hooks/useMediaRecord";
import { StatusIcons } from "@/src/components/statusIcons";
import { WatchStatus } from "@/src/types";

interface StatusButtonProps {
    mediaId: number;
    className?: string;
    alwaysVisible?: boolean;
}

export default function StatusBtn({
    mediaId,
    className,
    alwaysVisible = false,
}: StatusButtonProps) {
    const { status, updateStatus } = useMediaRecord(mediaId);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isLongPress = useRef(false);

    const dropDown: WatchStatus[] = [
        "Watched",
        "Plan to Watch",
        "Watching",
        "Not interested",
    ];
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Long click
    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card flip
        isLongPress.current = false;

        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setIsMenuOpen(true); // Show list for long click
        }, 500);
    };

    // Short click
    const handleMouseUp = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (timerRef.current) clearTimeout(timerRef.current);

        if (!isLongPress.current) {
            if (status === "Watched") {
                updateStatus("New");
            } else {
                updateStatus("Watched");
            }
        }
    };

    const handleMouseLeave = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setIsMenuOpen(true);
        }, 500);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation();
        if (timerRef.current) clearTimeout(timerRef.current);
        if (!isLongPress.current) {
            updateStatus(status === "Watched" ? "Plan to Watch" : "Watched");
        }
    };

    const isWatched = status === "Watched";

    const Icon = StatusIcons[status] ?? StatusIcons.New;

    console.log("status:", status);
    console.log("Icon:", StatusIcons[status]);

    return (
        <div
            className={clsx("absolute z-30 select-none", className)}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center gap-1 p-2",
                    "bg-[#6a5b4d]/60 text-[#dccfb8] backdrop-blur-sm",
                    "hover:bg-[#6a5b4d]/90 active:scale-95 transition-all duration-200",
                    alwaysVisible || isWatched || isMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                )}
            >
                <Icon />
            </button>

            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-1 w-36 bg-[#dccfb8] border border-[#b79c7a] rounded shadow-lg overflow-hidden font-mono text-[11px] text-[#2a2521]"
                >
                    {dropDown.map((s) => (
                        <button
                            key={s}
                            onClick={() => {
                                updateStatus(s);
                                setIsMenuOpen(false);
                            }}
                            className={clsx(
                                "w-full text-left px-3 py-2 transition-colors border-b border-[#b79c7a]/30 last:border-none",
                                status === s
                                    ? "bg-[#6a5b4d] text-[#dccfb8] font-bold"
                                    : "hover:bg-[#6a5b4d]/20",
                            )}
                        >
                            {s === "Watched" ? "★ Watched *" : s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
