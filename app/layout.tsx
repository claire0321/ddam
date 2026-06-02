import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/components/AuthProvider";

export const metadata: Metadata = {
    title: "DDam",
    description:
        "A personal tracker for movies and TV shows you’ve watched, plan to watch, or are not interested in",
    viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <AuthProvider>
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
