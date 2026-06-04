"use client";

import clsx from "clsx";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function Searchbar({ value, onChange }: Props) {
    return (
        <div className="mx-auto mb-8 flex gap-4 px-4 box-border sm:mb-4">
            <input
                type="text"
                placeholder="Search for Media"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={clsx(
                    "flex-1",
                    "px-10 py-3",
                    "rounded-full border-none",
                    "bg-[#dccfb8] text-sm",
                    "ring-2 ring-[#dccfb8]",
                    "focus:outline-none",
                )}
                autoFocus
            />
        </div>
    );
}
