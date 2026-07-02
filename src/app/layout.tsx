import type { Metadata } from "next";
import { DM_Sans, Libre_Caslon_Text } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aura Villa Bali | Where Every Moment Becomes a Memory",
  description: "Aura Villa Bali — a romantic villa resort nestled in the heart of Bali. Discover our curated collection of private villas with infinity pools, breathtaking rice field views, and bespoke honeymoon experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${libreCaslonText.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body-md selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
        {/* Interactive Navigation Shell (Desktop Sidebar, Mobile Header, Overlays) */}
        <Navigation />

        {/* Main Application Container */}
        <main className="md:ml-[80px]">
          {children}
        </main>
      </body>
    </html>
  );
}
