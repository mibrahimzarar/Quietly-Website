import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quietly - AI IDE & Standalone Chat.",
  description:
    "Quietly is a private, local AI pair-programmer that runs entirely on your machine. No cloud. No telemetry. Your code never leaves your machine.",
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
    title: "Quietly — AI Coding and Chat. Completely Offline.",
    description:
      "A calm, local, private AI pair-programmer. Your code never leaves your machine.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#05050a] text-white antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
