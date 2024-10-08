import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LexiGen AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/app/logoipsum-292.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/app/logoipsum-292.svg" />
          <link rel="icon" type="image/png" sizes="16x16" href="/app/logoipsum-292.svg" />
          
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
