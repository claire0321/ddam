import type { Metadata } from "next";
import "./globals.css";

import { MediaProvider } from "@/src/store/MediaContext";
// import { AuthProvider } from "@/src/components/login/AuthProvider";
import Header from "@/src/components/header/Header";

export const metadata: Metadata = {
    title: "DDam",
    description:
        "A personal tracker for movies and TV shows you’ve watched, plan to watch, or are not interested in",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className="py-16 px-8">
                <MediaProvider>
                    <Header />
                    <main className="p-5">{children}</main>
                </MediaProvider>
            </body>
        </html>
    );
}
