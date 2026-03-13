"use client";

import { motion } from "framer-motion";
import { Download, BookOpen, ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section id="download" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1e1838] to-[#181828]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/12 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-purple-500/8 blur-[60px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.6,
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-purple-400"
          style={{
            left: `${15 + i * 14}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 mb-8 text-xs text-purple-300 font-medium">
            <Zap className="w-3 h-3" />
            No account needed
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
            Start Coding with{" "}
            <span className="gradient-text">Local AI</span>
          </h2>

          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join developers who choose privacy and control over convenience. Your AI pair-programmer, running entirely on your machine.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.a
              href="/download"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-purple group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white"
            >
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Download Quietly</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              <div className="absolute inset-0 rounded-2xl glow-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-medium text-white/70 hover:text-white border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              View Documentation
            </motion.a>
          </div>

          {/* Feature checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              "100% Offline",
              "No Telemetry",
              "Local AI Models",
              "Free Forever",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-center gap-2 text-sm text-white/50"
              >
                <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                {feature}
              </div>
            ))}
          </motion.div>

          {/* OS support */}
          <p className="text-white/25 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12V6.75l6-1.25V12H3zm6-5.75v5.75h6V5l-6 1.25zm6 5.75V5.75L21 7v5h-6zm-12 6.25 6 1.25V13H3v5.25zm6 1.25 6-1.25V13h-6v5.5zm6-1.25 6-1V13h-6v5.25z" />
            </svg>
            Available for Windows · macOS · Linux
          </p>
        </motion.div>
      </div>
    </section>
  );
}
