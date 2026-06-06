import { useMemo } from "react";

export function useMaskStyle(maskUrl?: string) {
    return useMemo(() => {
        if (!maskUrl) return {};

        return {
            maskImage: `url(${maskUrl})`,
            WebkitMaskImage: `url(${maskUrl})`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
        } as React.CSSProperties;
    }, [maskUrl]);
}
