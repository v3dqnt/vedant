import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import MinimalGrid2D from "@/components/canvas/MinimalGrid2D";
import KeyboardNav from "@/components/ui/KeyboardNav";
import PixelTrail from "@/components/ui/PixelTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sitrusFont = localFont({
  src: "../public/DxSitrus-Expanded.otf",
  variable: "--font-sitrus",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedant - The Archive",
  description: "Portfolio of a Full-Stack Developer with design skills",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${sitrusFont.variable} h-full antialiased`}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=quicksand@300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#000000] text-white font-sans antialiased relative">
        <SmoothScroll>
          <MinimalGrid2D />
          <PixelTrail />
          {children}
        </SmoothScroll>
        <KeyboardNav />
      </body>
    </html>
  );
}


