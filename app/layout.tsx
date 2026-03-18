import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quietly - Offline AI IDE & Standalone Chat.",
  description:
    "Quietly is a private, local AI pair-programmer & buddy that runs entirely on your machine. No cloud. No telemetry. Your code never leaves your machine.",
  keywords: [
    "offline AI IDE",
    "local AI coding",
    "private AI pair programmer",
    "Llama.cpp IDE",
    "AirLLM IDE",
    "offline code assistant",
    "Quietly",
  ],
  openGraph: {
    title: "Quietly — Offline AI Coding and Chat. Completely Offline.",
    description:
      "A calm, local, private AI pair-programmer & buddy. Your code never leaves your machine.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="bg-[#05050a] text-white antialiased font-sans overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
