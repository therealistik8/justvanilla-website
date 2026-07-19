import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VanillaNavbar } from "@/components/ui/scroll-navigation-menu";
import { Disclaimer } from "@/components/ui/disclaimer";
import { EasterEgg } from "@/components/ui/easter-egg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JustVanilla",
  description: "Vanilla Minecraft the way it was meant to be played.",
  icons: { icon: "/jv_logo.webp" },
  // Tell Dark Reader to leave this (already-dark) page alone — its DOM edits
  // otherwise break React hydration and interactivity.
  other: { "darkreader-lock": "true" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <VanillaNavbar />
        {children}
        <Disclaimer />
        <EasterEgg />
      </body>
    </html>
  );
}
