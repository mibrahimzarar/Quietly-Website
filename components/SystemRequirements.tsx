"use client";

import { motion } from "framer-motion";
import { Monitor, MemoryStick, HardDrive, Cpu, CheckCircle2, Info } from "lucide-react";

const requirements = [
  {
    icon: Monitor,
    category: "Operating System",
    minimum: "Windows 10 (64-bit) / macOS 12+ / Linux",
    note: null,
  },
  {
    icon: MemoryStick,
    category: "RAM",
    minimum: "8 GB",
    note: "More RAM = larger models supported",
  },
  {
    icon: HardDrive,
    category: "Disk Space",
    minimum: "2 GB (app only)",
    note: "Model storage varies by size",
  },
  {
    icon: Cpu,
    category: "CPU",
    minimum: "x64 processor / Apple Silicon",
    note: "GPU acceleration coming soon",
  },
];

const models = [
  { name: "Llama 3.1 8B (Q4)", size: "4.7 GB", ram: "8 GB", speed: "Fast", recommended: true },
  { name: "Qwen 2.5 Coder 7B (Q5)", size: "5.0 GB", ram: "8 GB", speed: "Fast", recommended: true },
  { name: "Mistral Nemo 12B (Q4)", size: "7.1 GB", ram: "12 GB", speed: "Good", recommended: false },
  { name: "Gemma 2 9B (Q4)", size: "5.4 GB", ram: "8 GB", speed: "Good", recommended: false },
  { name: "Phi-3.5 Mini 3.8B (Q4)", size: "2.4 GB", ram: "4 GB", speed: "Fastest", recommended: false },
];

export default function SystemRequirements() {
  return (
    <section id="requirements" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1b1b30] to-[#181828]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5 text-xs text-purple-400 font-medium">
            <Monitor className="w-3 h-3" />
            System Requirements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What you&apos;ll need.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Optimized to run efficiently on standard developer machines.
          </p>
        </motion.div>

        {/* Requirements table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.07] overflow-hidden mb-12"
        >
          {/* Table header */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 bg-[#17172a] border-b border-white/[0.06] px-6 py-3">
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Component</div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Requirement</div>
            <div className="hidden md:block text-xs font-semibold text-white/40 uppercase tracking-wider">Note</div>
          </div>

          {requirements.map((req, i) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={req.category}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-0 px-6 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/15 transition-colors">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{req.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-white/50">{req.minimum}</span>
                </div>
                <div className="hidden md:flex items-center">
                  {req.note && (
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Info className="w-3 h-3 shrink-0" />
                      {req.note}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Supported models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            Supported Models
          </h3>

          <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-0 bg-[#17172a] border-b border-white/[0.06] px-5 py-2.5">
              <div className="col-span-2 text-xs font-semibold text-white/40 uppercase tracking-wider">Model</div>
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Size</div>
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Min RAM</div>
              <div className="hidden md:block text-xs font-semibold text-white/40 uppercase tracking-wider">Quality</div>
            </div>

            {models.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="grid grid-cols-4 md:grid-cols-5 gap-0 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-sm text-white/70 font-code">{model.name}</span>
                  {model.recommended && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20 font-medium">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-white/50 font-code">{model.size}</div>
                <div className="flex items-center text-sm text-white/50 font-code">{model.ram}</div>
                <div className="hidden md:flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${model.speed === "Best" ? "bg-green-500/10 text-green-400" :
                    model.speed === "Better" ? "bg-blue-500/10 text-blue-400" :
                      "bg-white/5 text-white/40"
                    }`}>{model.speed}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs flex items-center gap-1.5">
              <Info className="w-3 h-3" />
              Any GGUF-compatible model can be added manually.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
              <span className="text-xs font-medium text-white/50 tracking-wide uppercase">
                + And many more
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
