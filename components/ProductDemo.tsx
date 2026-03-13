"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Volume2, Pause, Loader2 } from "lucide-react";

export default function ProductDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync state from video events — single source of truth
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setIsLoading(false);
  }, []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleWaiting = useCallback(() => setIsLoading(true), []);
  const handleCanPlay = useCallback(() => setIsLoading(false), []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setIsLoading(true);
      video.play().catch(() => setIsLoading(false));
    } else {
      video.pause();
    }
  }, []);

  // Parallax — only applied to the outer wrapper, NOT the video itself
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);

  return (
    <section id="demo" ref={sectionRef} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1e1a2c] to-[#181828]" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/6 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5 text-xs text-purple-400 font-medium tracking-wide">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            See it in action.
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Watch QuietlyCode help you write, explain, and refactor code — entirely on your machine.
          </p>
        </motion.div>

        {/* Video container — parallax on wrapper only */}
        <motion.div style={{ y, opacity, scale }}>
          {/* Outer glow */}
          <div className="absolute -inset-8 bg-purple-600/10 blur-[60px] rounded-3xl pointer-events-none" />

          {/* Browser/IDE frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#22223a] shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-5 py-3 bg-[#1e1e34] border-b border-white/[0.06]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-white/30 font-code">
                  QuietlyCode IDE — Demo
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/20">
                <Volume2 className="w-3 h-3" />
              </div>
            </div>

            {/* Video area */}
            <div
              className="relative bg-[#080810] aspect-video flex items-center justify-center group cursor-pointer overflow-hidden"
              onClick={togglePlay}
            >
              {/* Video element — preload metadata only, GPU-promoted layer */}
              {mounted && (
                <video
                  ref={videoRef}
                  src="/Video.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: "translateZ(0)" }}
                  preload="metadata"
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onWaiting={handleWaiting}
                  onCanPlayThrough={handleCanPlay}
                  loop
                  muted
                  playsInline
                />
              )}

              {/* IDE screenshot fallback — shown when not playing */}
              {(!mounted || !isPlaying) && (
                <div className="absolute inset-0 flex bg-[#080810] z-10 pointer-events-none">
                  {/* Left sidebar */}
                  <div className="w-48 border-r border-white/[0.04] bg-[#1e1e34]/80 p-2 space-y-1">
                    {[
                      "📁 Project",
                      "  📄 main.py",
                      "  📄 helper.py",
                      "📁 models",
                      "  📄 llm.py",
                      "📄 config.json",
                    ].map((f, i) => (
                      <div
                        key={i}
                        className={`px-2 py-0.5 text-[10px] font-code rounded ${
                          i === 1
                            ? "bg-purple-500/10 text-purple-300"
                            : "text-white/20"
                        }`}
                      >
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Main editor */}
                  <div className="flex-1 p-4 space-y-1.5 font-code text-[10px] text-white/30 overflow-hidden">
                    <div className="text-purple-400">
                      {"def generate_code(prompt: str) → str:"}
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-white/20"># Local LLM inference</span>
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-blue-400/60">model</span>{" "}
                      <span className="text-white/20">=</span>{" "}
                      <span className="text-green-400/60">LocalLLM</span>
                      <span className="text-white/20">()</span>
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-purple-400/60">return</span>{" "}
                      model.generate(prompt)
                    </div>
                    <div className="mt-2 text-white/10">
                      {"/* AI Suggestion */"}
                    </div>
                    <div className="text-purple-300/40">
                      def optimize_function(fn):
                    </div>
                  </div>

                  {/* AI Chat */}
                  <div className="w-56 border-l border-white/[0.04] bg-[#1e1e34]/60 p-3 space-y-3">
                    <div className="text-[10px] text-white/20 uppercase tracking-widest font-code">
                      AI Chat
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-2 text-[9px] text-white/30">
                      How can I help you today?
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-2 text-[9px] text-white/40 ml-4">
                      Explain this function
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-2 text-[9px] text-white/30">
                      This function calls a local LLM to generate code based on
                      your prompt. Everything runs on-device...
                    </div>
                  </div>
                </div>
              )}

              {/* Play button overlay */}
              {(!mounted || !isPlaying) && !isLoading && (
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center z-20 pointer-events-none">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-600/40 blur-2xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-500" />
                    <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-all duration-300">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Loading spinner */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 pointer-events-none">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-full scale-150" />
                    <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Loader2 className="w-7 h-7 text-white animate-spin" />
                    </div>
                  </div>
                </div>
              )}

              {/* Pause overlay on hover during playback */}
              {mounted && isPlaying && !isLoading && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center z-20 pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Pause className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8 text-white/40 text-sm"
        >
          See QuietlyCode in action.{" "}
          <span className="text-purple-400">Fully offline. Fully private.</span>
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: "100%", label: "Offline operation" },
            { value: "0", label: "Cloud calls made" },
            { value: "8B+", label: "Parameter models" },
            { value: "∞", label: "Privacy guarantee" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-purple mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
