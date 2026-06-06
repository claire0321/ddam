"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function MyPageBtn() {
    const router = useRouter();

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                router.push(`/myPage`);
            }}
            className={clsx(
                "bg-[#dccfb8]/65 text-[#6a5b4d] hover:bg-[#6a5b4d] hover:text-[#f4f0e6]",
                "px-5 py-3 rounded-full transition-all duration-200",
                "font-mono text-sm font-bold uppercase",
            )}
        >
            My Page
        </button>
    );
}
