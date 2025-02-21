import type { Metadata } from "next";
import "./globals.scss";

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
  return (
    <html lang="en" id="root">
      <body>{children}</body>
    </html>
  );
}
