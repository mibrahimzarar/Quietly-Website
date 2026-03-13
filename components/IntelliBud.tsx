"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function IntelliBud() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative group p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-[#11111a]/80 backdrop-blur-xl overflow-hidden flex flex-col items-center gap-6 text-center hover:border-purple-500/30 transition-colors duration-500"
        >
          {/* Subtle inside glow matching hover inner border */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* "A project by" label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] font-medium mt-0.5">
              A Project By
            </p>
          </div>

          {/* Logo with animated rings */}
          <div className="relative flex items-center justify-center">
            {/* Outer animated ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-16px] rounded-full border border-dashed border-purple-500/30 opacity-50"
            />
            {/* Middle animated ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] rounded-full border border-purple-500/20 opacity-70"
            />

            <div className="relative z-10 w-[88px] h-[88px] rounded-full ring-2 ring-white/[0.05] ring-offset-4 ring-offset-[#11111a] bg-[#0a0a14] overflow-hidden group-hover:ring-purple-500/40 transition-all duration-500">
              <Image
                src="/images/intellibud-white.png"
                alt="IntelliBud Innovations"
                width={88}
                height={88}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                suppressHydrationWarning
              />
            </div>

            {/* Deep glow underneath logo */}
            <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl scale-[2.5] pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          </div>

          {/* Typography & CTA */}
          <div className="flex flex-col items-center gap-4 mt-2 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              IntelliBud Innovations
            </h3>
            <p className="text-white/40 text-sm max-w-[280px] leading-relaxed">
              Building Tommorow's Software Solutions.
            </p>
            <a
              href="https://intellibud.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.1] text-sm font-medium text-white/70 hover:text-white transition-all duration-300 group/btn"
            >
              Visit intellibud.org
              <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
