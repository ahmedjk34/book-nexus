import type { Metadata } from "next";
import "./globals.scss";
import { AuthNav, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "BookNexus",
  description:
    "Discover, explore, and track your favorite books with BookNexus. Your go-to platform for book lovers to find recommendations, reviews, and personalized reading lists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = true; //placeholder for authentication status
  return (
    <html lang="en">
      <body id="root">
        <AuthNav isAuthenticated={isAuthenticated} />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
