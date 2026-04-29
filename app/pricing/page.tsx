"use client";

import { motion } from "framer-motion";
import {
  Check,
  Shield,
  WifiOff,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Heart,
  Crown,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const included = [
  "Full offline AI code completion",
  "Local chat with AI models",
  "Syntax highlighting for 50+ languages",
  "Integrated terminal & file explorer",
  "Zero telemetry — no data leaves your machine",
  "All future updates included",
  "Priority model optimization",
  "Advanced AI context (full project awareness)",
  "Multi-file refactoring with AI",
  "Custom model fine-tuning support",
];

const CHECKOUT_URL = "https://quietlycode.lemonsqueezy.com/checkout/buy/2c9d6e80-91a5-4b8b-962b-e8447b56545e";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-[#05050a] text-white overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-[0.2]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-purple-600/[0.12] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-700/[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-800/[0.06] blur-[100px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-6">
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
            <span className="font-semibold text-sm tracking-tight text-white">
              Quietly
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Crown className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">
              One-time purchase · No subscription
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Simple </span>
            <span className="gradient-text">Pricing</span>
          </h1>

          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Pay once, own it forever. No recurring fees.
            <br className="hidden sm:block" />
            Full access to every feature, on every platform.
          </p>
        </motion.div>
      </section>

      {/* Pricing Card */}
      <section className="relative z-10 max-w-xl mx-auto px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/[0.08] to-transparent overflow-hidden"
        >
          {/* Subtle shimmer border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-50 pointer-events-none" />

          <div className="relative p-10 sm:p-12 text-center">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/25 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Full License
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <span className="text-7xl sm:text-8xl font-extrabold text-white tracking-tight">
                $17
              </span>
            </div>
            <p className="text-sm text-white/50 mb-10">
              One-time payment · No subscription
            </p>

            {/* Purchase Button */}
            <motion.a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-4.5 rounded-2xl btn-purple text-white font-semibold text-lg shadow-xl shadow-purple-600/30 transition-shadow hover:shadow-2xl hover:shadow-purple-600/40"
            >
              <span className="relative z-10">Purchase Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            {/* Trust badges under button */}
            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                <span>Secure checkout</span>
              </div>
              <div className="w-px h-3 bg-white/15" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                <span>Instant delivery</span>
              </div>
            </div>

            {/* Redeem License link */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <Link
                href="/download"
                className="text-sm text-purple-400/80 hover:text-purple-300 transition-colors inline-flex items-center gap-1.5"
              >
                Already have a license? Redeem here
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-8 sm:p-10"
        >
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-[0.15em] text-center mb-8">
            Everything included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
            {included.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.04 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-sm text-white/70">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-8 px-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/75">Privacy Guaranteed</div>
                <div className="text-xs text-white/40">All AI runs locally</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/[0.1]" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <WifiOff className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/75">No Internet Required</div>
                <div className="text-xs text-white/40">Works completely offline</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/[0.1]" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2026 IntelliBud Innovations. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
