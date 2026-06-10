import clsx from "clsx";

interface Props {
    loading: boolean;
    onClick: () => void;
}

export default function LoadMoreBtn({ loading, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={clsx(
                "px-6 py-3",
                "bg-[#dccfb8] text-[#6a5b4d] hover:bg-[#dccfb8]/60",
                "rounded-lg shadow-md",
                "font-bold",
                "transition-colors duration-200",
            )}
        >
            {loading ? "Loading..." : "More"}
        </button>
    );
}
