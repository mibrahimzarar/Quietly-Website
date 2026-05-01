"use client";

import { motion } from "framer-motion";
import { Shield, Lock, WifiOff, Eye, Server, Database } from "lucide-react";

const points = [
  {
    icon: WifiOff,
    title: "100% Offline Operation",
    description: "Once setup is complete, every feature works without an internet connection. Disconnect and code freely.",
  },
  {
    icon: Eye,
    title: "Zero Telemetry",
    description: "We collect absolutely no usage data, analytics, or behavioral metrics. None.",
  },
  {
    icon: Server,
    title: "No Cloud Processing",
    description: "AI inference runs on your hardware. Your prompts never touch a remote server.",
  },
  {
    icon: Database,
    title: "Local Data Storage",
    description: "Project files, settings, and chat history are stored only on your machine.",
  },
];

export default function Privacy() {
  return (
    <section id="privacy" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1e1a2e] to-[#181828]" />
      <div className="absolute inset-0 bg-dots opacity-15" />

      {/* Large centered glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Shield graphic */}
            <div className="relative w-72 h-72">
              {/* Outer rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.05, 0.2] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute inset-0 rounded-full border border-purple-500/20"
                  style={{ margin: `${i * 20}px` }}
                />
              ))}

              {/* Center shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full scale-150" />
                  <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600/30 to-purple-900/20 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm glow-purple-sm">
                    <Shield className="w-16 h-16 text-purple-400" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Orbit dots */}
              {[
                { icon: Lock, angle: 0, label: "Encrypted" },
                { icon: WifiOff, angle: 90, label: "Offline" },
                { icon: Eye, angle: 180, label: "Private" },
                { icon: Server, angle: 270, label: "Local" },
              ].map(({ icon: Icon, angle, label }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 120;
                const x = Math.cos(rad) * r + 136;
                const y = Math.sin(rad) * r + 136;
                return (
                  <motion.div
                    key={angle}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: angle / 360 * 2 }}
                    className="absolute flex flex-col items-center gap-1"
                    style={{ left: x - 20, top: y - 20 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#17172a] border border-purple-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[9px] text-white/30 whitespace-nowrap">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5 text-xs text-purple-400 font-medium">
                <Lock className="w-3 h-3" />
                Privacy
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Your Code.{" "}
                <br />
                <span className="gradient-text">Your Machine.</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 leading-relaxed">
                In a world where every tool wants to send your data to the cloud, Quietly is different. We built privacy in from the ground up — not as a feature, but as a foundation.
              </p>
            </motion.div>

            <div className="space-y-5">
              {points.map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:border-purple-500/40 transition-colors duration-200">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{point.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{point.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Privacy guarantee badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col gap-3"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-purple-500/20 bg-purple-500/5">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-semibold text-white">Privacy Guaranteed: Your code never leaves your machine.</div>
                  <div className="text-xs text-white/40">Open source verifiable · No accounts required · Offline after setup</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-white/25">
                <WifiOff className="w-3 h-3" />
                <span>Works 100% offline after setup — ideal for companies with sensitive codebases</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
