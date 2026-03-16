"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Zap, Terminal } from "lucide-react";
import Image from "next/image";

export default function PoweredBy() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background & Effects */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[#05050a]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-30 mask-radial-faded" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-purple-300 font-medium tracking-wide uppercase">
                Under the hood
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Powered by Bleeding-Edge Open Source
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Quietly stands on the shoulders of giants to bring you massive AI models directly on your local consumer hardware.
            </p>
          </motion.div>
        </div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Llama.cpp Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 lg:p-10 overflow-hidden hover:border-purple-500/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0c0c18] border border-white/10 flex items-center justify-center mb-6 glow-purple-sm">
                <Cpu className="w-7 h-7 text-purple-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Llama.cpp</h3>
              <p className="text-white/60 leading-relaxed mb-8">
                The gold standard for local LLM inference. Written in pure C/C++ for maximum performance, allowing Quietly to achieve massive tokens-per-second even without a dedicated GPU.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Extremely optimized inference engine" },
                  { icon: Terminal, text: "Seamless CPU/GPU hybrid execution" },
                  { icon: Cpu, text: "Broad hardware support (Apple Silicon, CUDA, CPU)" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-white/80">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AirLLM Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 lg:p-10 overflow-hidden hover:border-blue-500/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0c0c18] border border-white/10 flex items-center justify-center mb-6 glow-blue-sm">
                <Layers className="w-7 h-7 text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">AirLLM</h3>
              <p className="text-white/60 leading-relaxed mb-8">
                Run massive 70B+ parameter models on a single consumer GPU. Quietly utilizes AirLLM&apos;s innovative layer-wise execution to bypass VRAM limitations completely.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Layers, text: "Layer-wise memory loading algorithms" },
                  { icon: Cpu, text: "Run 70B models on just 4GB or 8GB of VRAM" },
                  { icon: Zap, text: "Zero compromise on model quality or precision" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-white/80">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
