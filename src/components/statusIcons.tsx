import clsx from "clsx";

import WatchedIcon from "@/public/icons/watchedIcon.png";
import WatchingIcon from "@/public/icons/watchingIcon.png";
import PlanToWatchIcon from "@/public/icons/pinIcon.png";
import NotInterestedIcon from "@/public/icons/noIcon.png";

import { useMaskStyle } from "@/src/hooks/useMaskStyle";

const DefaultIcon = () => {
    return (
        <div className="flex gap-1">
            <span className="bg-[#DCCFB8] w-1 h-1 rounded-full" />
            <span className="bg-[#DCCFB8] w-1 h-1 rounded-full" />
            <span className="bg-[#DCCFB8] w-1 h-1 rounded-full" />
        </div>
    );
};

const MaskIcon = ({ src, className }: { src: string; className?: string }) => {
    const maskStyle = useMaskStyle(src);
    return (
        <div style={maskStyle} className={clsx("bg-[#DCCFB8]", className)} />
    );
};

export const StatusIcons = {
    Watched: () => (
        <MaskIcon src={WatchedIcon.src} className="w-full  h-full" />
    ),
    "Plan to Watch": () => (
        <MaskIcon src={PlanToWatchIcon.src} className="w-5 h-5" />
    ),
    Watching: () => (
        <MaskIcon src={WatchingIcon.src} className="w-5 h-5 ml-1" />
    ),
    "Not interested": () => (
        <MaskIcon src={NotInterestedIcon.src} className="w-4 h-4" />
    ),
    New: DefaultIcon,
};
