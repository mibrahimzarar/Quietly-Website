"use client";

import { motion } from "framer-motion";
import { Download, Settings, Brain, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Download Installer",
    description: "Grab the installer for your OS — Windows .exe, macOS .dmg, or Linux AppImage. One file, no prerequisites.",
    code: "QuietlyCode-Setup.exe / .dmg / .AppImage",
    codeLabel: "~180 MB",
  },
  {
    number: "02",
    icon: Settings,
    title: "Choose AI Backend",
    description: "Select your preferred inference backend — Llama.cpp for speed or AirLLM for memory-efficient inference.",
    code: "llama.cpp | AirLLM",
    codeLabel: "Backend",
  },
  {
    number: "03",
    icon: Brain,
    title: "Download Your Model",
    description: "Pick and download any GGUF-compatible model. We recommend Llama 3.1 8B or Code Llama for coding.",
    code: "llama-3.1-8b-instruct.gguf",
    codeLabel: "~4.7 GB",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Start Coding with AI",
    description: "Launch QuietlyCode and start your first AI-assisted coding session. Fully offline from day one.",
    code: "QuietlyCode.exe",
    codeLabel: "Ready",
  },
];

export default function Installation() {
  return (
    <section id="installation" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1a1a2e] to-[#181828]" />

      {/* Vertical line accent */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5 text-xs text-purple-400 font-medium">
            <Rocket className="w-3 h-3" />
            Get Started
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Up and running in{" "}
            <span className="gradient-text">minutes.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Simple four-step installation. No accounts. No API keys. No cloud setup.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-purple-500/5 hidden sm:block" />

          <div className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-6 sm:gap-10 group"
                >
                  {/* Step indicator */}
                  <div className="relative shrink-0">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-purple-900/20 border border-purple-500/30 flex items-center justify-center relative z-10 group-hover:border-purple-500/50 group-hover:glow-purple-sm transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0d0d1a]">
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-10 border-b border-white/[0.04] last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[11px] font-code text-purple-500/50 font-bold tracking-widest">{step.number}</span>
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-4">{step.description}</p>
                      </div>

                      {/* Code badge */}
                      <div className="shrink-0">
                        <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#17172a] border border-white/[0.07] group-hover:border-white/[0.12] transition-colors">
                          <code className="text-xs font-code text-purple-300">{step.code}</code>
                          <span className="text-[10px] text-white/25 border-l border-white/[0.08] pl-3">{step.codeLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connector arrow */}
                    {i < steps.length - 1 && (
                      <div className="flex items-center gap-2 text-purple-500/30 mt-2">
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[10px] font-code">then</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA after steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#download"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-purple inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white"
          >
            <Download className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Download QuietlyCode</span>
          </motion.a>
          <p className="text-white/30 text-xs mt-4">Free to use · Windows · macOS · Linux · No signup required</p>
        </motion.div>
      </div>
    </section>
  );
}
