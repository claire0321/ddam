"use client";

import React, { useState, useEffect } from "react";
import { getPopularMedia, searchMedia } from "@/src/lib/tmdb";
import { TMDBMedia } from "@/src/types";
import MediaCard from "@/src/components/MediaCard";
import Link from "next/link";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [medias, setMedias] = useState<TMDBMedia[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!searchQuery.trim()) {
            const loadPopularMedia = async () => {
                try {
                    const data = await getPopularMedia();
                    setMedias(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            loadPopularMedia();
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const searchResults = await searchMedia(searchQuery);
                setMedias(searchResults);
                setError(null);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className="py-16 px-8">
            <h1 className="px-5 py-10 text-5xl font-black">🎬 Media Tracker</h1>

            <div className="mx-auto mb-8 flex gap-4 px-4 box-border sm:mb-4">
                <input
                    type="text"
                    placeholder="Search for Media..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 rounded border-none bg-[#333] text-white text-base focus:outline-none ring-2 ring-[#666]"
                    autoFocus
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 py-5 w-full box-border">
                    {medias.map((media) => (
                        <MediaCard media={media} key={media.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

// import { useState } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useMediaStore } from "@/src/store/useMediaStore";
// import { WatchStatus } from "@/src/types";
// import Link from "next/link";

// export default function HomePage() {
//     const { data: session } = useSession();
//     const { myList, updateItem, removeItem } = useMediaStore();

//     const [searchQuery, setSearchQuery] = useState("");
//     const [statusFilter, setStatusFilter] = useState<string>("All");
//     const [sortBy, setSortBy] = useState<"added" | "rating">("added");

//     const filteredList = myList
//         .filter((item) => {
//             const matchesSearch = item.title
//                 .toLowerCase()
//                 .includes(searchQuery.toLowerCase());
//             const matchesStatus =
//                 statusFilter === "All" || item.status === statusFilter;
//             return matchesSearch && matchesStatus;
//         })
//         .sort((a, b) => {
//             if (sortBy === "rating")
//                 return (b.userRating || 0) - (a.userRating || 0);
//             return (
//                 new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
//             );
//         });

//     return (
//         <div className="p-4">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-xl font-bold text-indigo-400">
//                     🎬 Media Tracker
//                 </h1>
//                 {session ? (
//                     <button
//                         onClick={() => signOut()}
//                         className="text-xs text-gray-400 underline"
//                     >
//                         로그아웃
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => signIn("google")}
//                         className="bg-indigo-600 text-xs px-3 py-1.5 rounded font-medium"
//                     >
//                         Google 로그인
//                     </button>
//                 )}
//             </div>

//             {/* Search Bar & Add Button */}
//             <div className="flex gap-2 mb-4">
//                 <input
//                     type="text"
//                     placeholder="내 리스트에서 검색..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="flex-1 bg-gray-700 text-sm rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-indigo-500"
//                 />
//                 <Link
//                     href="/search"
//                     className="bg-indigo-600 px-4 py-2 rounded text-sm font-bold flex items-center"
//                 >
//                     +
//                 </Link>
//             </div>

//             {/* Filters & Sorting */}
//             <div className="flex justify-between items-center gap-2 mb-4 text-xs">
//                 <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="bg-gray-700 p-2 rounded border border-gray-600"
//                 >
//                     <option value="All">전체 상태</option>
//                     <option value="Watched">시청 완료 (Watched)</option>
//                     <option value="Watching">보는 중 (Watching)</option>
//                     <option value="Plan to Watch">
//                         볼 예정 (Plan to Watch)
//                     </option>
//                     <option value="Not interested">안 볼 예정</option>
//                 </select>

//                 <select
//                     value={sortBy}
//                     onChange={(e) =>
//                         setSortBy(e.target.value as "added" | "rating")
//                     }
//                     className="bg-gray-700 p-2 rounded border border-gray-600"
//                 >
//                     <option value="added">추가순</option>
//                     <option value="rating">평점순</option>
//                 </select>
//             </div>

//             {/* List */}
//             <div className="space-y-3">
//                 {filteredList.map((item) => (
//                     <div
//                         key={item.id}
//                         className="bg-gray-750 p-3 rounded-lg border border-gray-700 flex gap-3"
//                     >
//                         {item.poster_path && (
//                             <img
//                                 src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
//                                 alt={item.title}
//                                 className="w-16 h-24 object-cover rounded bg-gray-800 flex-shrink-0"
//                             />
//                         )}
//                         <div className="flex-1 min-w-0 flex flex-col justify-between">
//                             <div>
//                                 <div className="flex justify-between items-start">
//                                     <h3 className="font-bold text-sm truncate pr-2">
//                                         {item.title}
//                                     </h3>
//                                     <button
//                                         onClick={() => removeItem(item.id)}
//                                         className="text-gray-500 hover:text-red-400 text-xs"
//                                     >
//                                         삭제
//                                     </button>
//                                 </div>
//                                 <p className="text-xs text-gray-400 mt-0.5">
//                                     {item.release_date.split("-")[0]} • ⭐{" "}
//                                     {item.vote_average.toFixed(1)}
//                                 </p>
//                                 {item.tags && item.tags.length > 0 && (
//                                     <div className="flex flex-wrap gap-1 mt-1">
//                                         {item.tags.map((t) => (
//                                             <span
//                                                 key={t}
//                                                 className="bg-gray-800 text-[10px] px-1.5 py-0.5 rounded text-gray-300"
//                                             >
//                                                 #{t}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="flex justify-between items-center mt-2">
//                                 <select
//                                     value={item.status}
//                                     onChange={(e) =>
//                                         updateItem(item.id, {
//                                             status: e.target
//                                                 .value as WatchStatus,
//                                         })
//                                     }
//                                     className="bg-gray-700 text-xs p-1 rounded text-indigo-300 border border-gray-600"
//                                 >
//                                     <option value="Watched">시청 완료</option>
//                                     <option value="Watching">보는 중</option>
//                                     <option value="Plan to Watch">
//                                         볼 예정
//                                     </option>
//                                     <option value="Not interested">
//                                         관심 없음
//                                     </option>
//                                 </select>
//                                 <Link
//                                     href={`/detail/${item.id}`}
//                                     className="text-xs text-indigo-400 font-medium"
//                                 >
//                                     상세/수정
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 {filteredList.length === 0 && (
//                     <p className="text-center text-sm text-gray-500 py-10">
//                         리스트가 비어있습니다.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// }
