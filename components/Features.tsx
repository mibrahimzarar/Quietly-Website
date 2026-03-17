"use client";

import { motion } from "framer-motion";
import {
  WifiOff, Brain, Code2, Terminal, Lock, Cpu,
  MessageSquare, Layers, Zap, GitBranch
} from "lucide-react";

const features = [
  {
    icon: WifiOff,
    title: "Offline AI",
    description: "Run powerful AI models directly on your machine. No internet required — ever.",
    color: "purple",
    gradient: "from-purple-500/20 to-purple-700/10",
    border: "border-purple-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Brain,
    title: "Local Models",
    description: "Supports Llama.cpp and AirLLM for flexible local inference. Use any GGUF model you choose.",
    color: "pink",
    gradient: "from-pink-500/10 to-pink-700/5",
    border: "border-pink-500/15",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
  },
  {
    icon: Terminal,
    title: "Built-in Terminal",
    description: "Run commands, scripts, and programs without ever leaving the IDE. Full shell access included.",
    color: "emerald",
    gradient: "from-emerald-500/10 to-emerald-700/5",
    border: "border-emerald-500/15",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: MessageSquare,
    title: "AI Pair Programming",
    description: "Explain code, refactor logic, and generate solutions through natural conversation.",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-700/5",
    border: "border-blue-500/15",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Layers,
    title: "AI Code Explanations",
    description: "Instantly understand any piece of code with detailed AI-generated explanations in plain English.",
    color: "amber",
    gradient: "from-amber-500/10 to-amber-700/5",
    border: "border-amber-500/15",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Zero telemetry. Zero cloud processing. Your code, prompts, and data stay on your machine forever.",
    color: "purple",
    gradient: "from-purple-500/20 to-purple-800/10",
    border: "border-purple-500/25",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1a1a2e] to-[#181828]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-purple-500/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5 text-xs text-purple-400 font-medium">
            <Cpu className="w-3 h-3" />
            Core Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything you need.{" "}
            <br />
            <span className="gradient-text">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A complete, local AI development environment engineered for privacy-conscious developers.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className={`
                  relative group p-6 rounded-2xl border bg-gradient-to-br
                  ${feature.gradient} ${feature.border}
                  bg-[rgba(255,255,255,0.02)] backdrop-blur-sm
                  hover:border-opacity-40 transition-all duration-300
                  cursor-default overflow-hidden
                `}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-base mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 transition-colors duration-200" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
