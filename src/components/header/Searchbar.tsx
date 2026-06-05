"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";

type Props = {
    autoFocus?: boolean;
};

export default function Searchbar({ autoFocus }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        setValue(searchParams.get("search") ?? "");
    }, [searchParams]);

    const onChange = (val: string) => {
        setValue(val);
        const params = new URLSearchParams(searchParams.toString());

        if (val) params.set("search", val);
        else params.delete("search");

        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="mx-auto flex gap-4 px-4 box-border w-full items-center">
            <input
                id="search"
                type="text"
                placeholder="Search for Media ..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus={autoFocus}
                className={clsx(
                    "flex-1",
                    "px-10 py-3",
                    "rounded-full border-none",
                    "bg-[#dccfb8] text-sm",
                    "ring-2 ring-[#dccfb8]",
                    "focus:outline-none",
                )}
            />
        </div>
    );
}
