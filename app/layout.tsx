import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/components/Login/AuthProvider";

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
            <body>
                <AuthProvider>
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
