import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Installation from "@/components/Installation";

export const metadata: Metadata = {
  title: "Installation — Quietly",
  description:
    "Get Quietly running in four steps: download the installer, choose your AI backend, add a GGUF model, and start coding offline.",
};

export default function InstallationPage() {
  return (
    <main className="relative min-h-screen bg-[#05050a] text-white selection:bg-purple-500/30">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <nav className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden glow-purple-sm">
              <Image
                src="/images/logo.png"
                alt="Quietly Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                suppressHydrationWarning
              />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">Quietly</span>
          </Link>
        </div>
      </nav>

      <Installation />

      <div className="h-16" aria-hidden />
    </main>
  );
}
