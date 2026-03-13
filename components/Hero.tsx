"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Play, Shield, Wifi } from "lucide-react";
import Link from "next/link";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrame: number;
    const COLORS = ["#7c3aed", "#a78bfa", "#6d28d9", "#8b5cf6"];

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string };
    let particles: Particle[] = [];

    // Named resize handler — properly removable, no accumulation
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      // Cap at 60 particles: O(n) draw stays cheap at any screen size
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.2 + 0.4,
          opacity: Math.random() * 0.35 + 0.08,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    // Pure O(n) draw — no connection lines; keeps a solid 60 fps
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.55, willChange: "transform" }}
    />
  );
}

function IDEMockup() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-purple-600/10 blur-[80px] rounded-full scale-75" />

      {/* IDE Window */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative ide-chrome"
      >
        {/* Title bar */}
        <div className="ide-titlebar">
          <div className="ide-dot bg-[#FF5F57]" />
          <div className="ide-dot bg-[#FFBD2E]" />
          <div className="ide-dot bg-[#28CA41]" />
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs text-white/40 font-code">QuietlyCode IDE — main.py</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-purple-400/70 font-code bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              AI Active
            </span>
          </div>
        </div>

        {/* IDE Content */}
        <div className="flex h-[340px] md:h-[420px]">
          {/* Sidebar / File Explorer */}
          <div className="hidden sm:flex w-48 flex-col border-r border-white/[0.05] bg-[#1e1e34]/60">
            <div className="px-3 py-2 border-b border-white/[0.05]">
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Explorer</span>
            </div>
            {["📁 src", "  📄 main.py", "  📄 utils.py", "  📄 models.py", "📁 tests", "  📄 test_main.py", "📄 README.md"].map((f, i) => (
              <div
                key={i}
                className={`px-3 py-1 text-xs font-code cursor-pointer transition-colors ${f === "  📄 main.py"
                  ? "bg-purple-500/10 text-purple-300 border-l border-purple-500"
                  : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                  }`}
              >
                {f}
              </div>
            ))}
          </div>

          {/* Code area */}
          <div className="flex-1 flex flex-col">
            <div className="flex border-b border-white/[0.05]">
              {["main.py", "utils.py"].map((tab, i) => (
                <div
                  key={tab}
                  className={`px-4 py-2 text-xs font-code border-r border-white/[0.05] ${i === 0
                    ? "text-white/80 bg-[#22223a] border-t-2 border-t-purple-500"
                    : "text-white/30 hover:text-white/50"
                    }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="flex-1 p-4 font-code text-xs leading-relaxed overflow-hidden">
              <div className="space-y-1">
                {[
                  { ln: "1", code: <><span className="text-purple-400">import</span> <span className="text-blue-300">torch</span></> },
                  { ln: "2", code: <><span className="text-purple-400">from</span> <span className="text-blue-300">transformers</span> <span className="text-purple-400">import</span> <span className="text-green-300">AutoModelForCausalLM</span></> },
                  { ln: "3", code: null },
                  { ln: "4", code: <><span className="text-white/30"># Load model locally — no internet required</span></> },
                  { ln: "5", code: <><span className="text-purple-400">def</span> <span className="text-yellow-300">load_model</span><span className="text-white/60">(</span><span className="text-orange-300">model_path</span><span className="text-white/60">: str) → AutoModelForCausalLM:</span></> },
                  { ln: "6", code: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">model</span> <span className="text-white/60">=</span> <span className="text-green-300">AutoModelForCausalLM</span><span className="text-white/60">.from_pretrained(</span></> },
                  { ln: "7", code: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">model_path</span><span className="text-white/60">,</span></> },
                  { ln: "8", code: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">device_map</span><span className="text-white/60">=</span><span className="text-yellow-200">&quot;auto&quot;</span><span className="text-white/60">,</span></> },
                  { ln: "9", code: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">torch_dtype</span><span className="text-white/60">=</span><span className="text-blue-300">torch</span><span className="text-white/60">.</span><span className="text-blue-300">float16</span></> },
                  { ln: "10", code: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/60">)</span></> },
                  { ln: "11", code: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-purple-300">model</span></> },
                ].map(({ ln, code }) => (
                  <div key={ln} className="flex gap-4">
                    <span className="text-white/20 select-none w-4 text-right shrink-0">{ln}</span>
                    <span className="text-white/70">{code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat Panel */}
          <div className="hidden lg:flex w-64 flex-col border-l border-white/[0.05] bg-[#1e1e34]/40">
            <div className="px-3 py-2 border-b border-white/[0.05] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">AI Assistant</span>
            </div>
            <div className="flex-1 p-3 space-y-3 overflow-hidden">
              <div className="bg-white/[0.04] rounded-lg p-2.5 text-xs text-white/60">
                <span className="text-purple-400 font-medium block mb-1">AI</span>
                I can explain this function, suggest optimizations, or help you write tests.
              </div>
              <div className="bg-purple-500/10 rounded-lg p-2.5 text-xs text-white/70 border border-purple-500/20 ml-4">
                <span className="text-white/40 font-medium block mb-1">You</span>
                Explain the load_model function
              </div>
              <div className="bg-white/[0.04] rounded-lg p-2.5 text-xs text-white/60">
                <span className="text-purple-400 font-medium block mb-1">AI</span>
                This function loads a HuggingFace model from a local path...
                <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-0.5 animate-pulse align-middle" />
              </div>
            </div>
            <div className="p-2 border-t border-white/[0.05]">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <span className="text-xs text-white/25 flex-1 font-code">Ask AI...</span>
                <div className="w-5 h-5 rounded-md bg-purple-500/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-purple-900/20 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-purple-400/80 font-code flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Llama-3.1-8B Active
            </span>
            <span className="text-[10px] text-white/20 font-code">Python 3.11</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-purple-400/60" />
            <span className="text-[10px] text-white/30 font-code">100% Local</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function useHeroOS() {
  const [label, setLabel] = useState("Download QuietlyCode");
  useEffect(() => {
    const ua   = navigator.userAgent.toLowerCase();
    const plat = (navigator.platform || "").toLowerCase();
    if (plat.includes("mac") || ua.includes("mac"))         setLabel("Download for macOS");
    else if (plat.includes("linux") || ua.includes("linux")) setLabel("Download for Linux");
    else                                                      setLabel("Download for Windows");
  }, []);
  return label;
}

export default function Hero() {
  const downloadLabel = useHeroOS();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/8 blur-[120px] rounded-full pointer-events-none" />
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8"
        >
          <Shield className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-purple-300 font-medium tracking-wide">Your code never leaves your machine</span>
          <Wifi className="w-3 h-3 text-white/20" style={{ textDecoration: "line-through" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">Code with AI.</span>
          <br />
          <span className="gradient-text">Chat with AI.</span>
          <br />
          <span className="text-white">100% Offline.</span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          QuietlyCode is a private AI pair-programmer that runs entirely on your machine.{" "}
          <span className="text-white/70">No cloud. No telemetry. No compromise.</span>
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/download"
              className="btn-purple relative group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
            >
              <Download className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{downloadLabel}</span>
              <div className="absolute inset-0 rounded-xl glow-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>

          <motion.a
            href="#demo"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
          >
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
            </div>
            View Demo
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-20 text-xs text-white/30"
        >
          {[
            { icon: "🔒", text: "Zero telemetry" },
            { icon: "💻", text: "100% offline" },
            { icon: "🧠", text: "Local AI models" },
            { icon: "🖥️", text: "Windows · macOS · Linux" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-1.5">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-white/10" />

        </motion.div>

        {/* IDE Mockup */}
        <IDEMockup />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#181828] to-transparent pointer-events-none" />
    </section>
  );
}
