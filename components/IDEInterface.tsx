"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, MessageSquare, Terminal, AlertCircle, ChevronRight } from "lucide-react";

const screens = [
  {
    id: "editor",
    label: "Code Editor",
    icon: Code2,
    description: "Monaco-powered editor with syntax highlighting, multi-tab support, and AI inline suggestions.",
    content: (
      <div className="flex h-full">
        <div className="w-44 border-r border-white/[0.05] p-2 bg-[#08080f]">
          <div className="text-[9px] uppercase tracking-widest text-white/20 px-2 py-1 mb-1">Explorer</div>
          {["📁 src", "  📄 index.ts", "  📄 app.ts", "  📄 types.ts", "📁 utils", "  📄 helpers.ts", "📄 package.json", "📄 tsconfig.json"].map((f, i) => (
            <div key={i} className={`px-2 py-0.5 text-[10px] font-code rounded cursor-pointer ${i === 1 ? "bg-purple-500/15 text-purple-300 border-l border-purple-500" : "text-white/25 hover:text-white/50"}`}>{f}</div>
          ))}
        </div>
        <div className="flex-1 p-4 font-code text-[11px] leading-6">
          <div className="flex gap-3"><span className="text-white/20">1</span><span className="text-purple-400">import</span><span className="text-white/60 ml-1"><span className="text-blue-300">{"{ Express }"}</span> <span className="text-purple-400">from</span> <span className="text-yellow-200">&apos;express&apos;</span></span></div>
          <div className="flex gap-3"><span className="text-white/20">2</span><span className="text-purple-400">import</span><span className="text-white/60 ml-1"><span className="text-blue-300">{"{ createServer }"}</span> <span className="text-purple-400">from</span> <span className="text-yellow-200">&apos;http&apos;</span></span></div>
          <div className="flex gap-3"><span className="text-white/20">3</span><span className="text-white/20"></span></div>
          <div className="flex gap-3"><span className="text-white/20">4</span><span className="text-white/30 ml-1">// Initialize Express app</span></div>
          <div className="flex gap-3"><span className="text-white/20">5</span><span className="text-purple-400 ml-1">const</span><span className="text-blue-300 ml-1">app</span><span className="text-white/60">: Express =</span><span className="text-green-300 ml-1">express</span><span className="text-white/60">()</span></div>
          <div className="flex gap-3"><span className="text-white/20">6</span><span className="text-purple-400 ml-1">const</span><span className="text-blue-300 ml-1">PORT</span><span className="text-white/60">=</span><span className="text-orange-300">3000</span></div>
          <div className="flex gap-3"><span className="text-white/20">7</span></div>
          <div className="flex gap-3"><span className="text-white/20">8</span><span className="text-yellow-300 ml-1">app</span><span className="text-white/60">.</span><span className="text-green-300">get</span><span className="text-white/60">(</span><span className="text-yellow-200">&apos;/&apos;</span><span className="text-white/60">, (req, res) =&gt; {"{"}</span></div>
          <div className="flex gap-3"><span className="text-white/20">9</span><span className="text-white/50 ml-8">res.send(</span><span className="text-yellow-200">&apos;Hello World&apos;</span><span className="text-white/50">)</span></div>
          <div className="flex gap-3"><span className="text-white/20">10</span><span className="text-white/60 ml-4">{"}"}</span><span className="text-white/60">)</span></div>
          <div className="mt-2 flex items-center gap-2">
            <div className="bg-purple-500/20 border border-purple-500/30 rounded px-2 py-0.5 text-[9px] text-purple-300 font-code flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
              AI: Add error handling?
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "chat",
    label: "AI Chat",
    icon: MessageSquare,
    description: "Conversational AI assistant that understands your codebase and runs entirely offline.",
    content: (
      <div className="flex flex-col h-full p-4 space-y-3">
        <div className="bg-white/[0.04] rounded-xl p-3 text-xs text-white/60 max-w-[80%]">
          <div className="text-purple-400 font-semibold text-[10px] mb-1">AI Assistant</div>
          Hello! I&apos;m your local AI assistant. All processing happens on your machine — no internet needed.
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-xs text-white/70 ml-auto max-w-[80%]">
          <div className="text-white/40 text-[10px] mb-1">You</div>
          How do I implement rate limiting in Express?
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3 text-xs text-white/60 max-w-[85%]">
          <div className="text-purple-400 font-semibold text-[10px] mb-2">AI Assistant</div>
          <p className="mb-2">You can use the <span className="text-purple-300 font-code">express-rate-limit</span> package:</p>
          <div className="bg-black/30 rounded-lg p-2 font-code text-[10px] text-green-300/70">
            <div className="text-purple-400">import</div>
            <div className="ml-2 text-blue-300">rateLimit from &apos;express-rate-limit&apos;</div>
            <div className="mt-1 text-purple-400">const</div>
            <div className="ml-2 text-white/50">limiter = rateLimit{"({"}</div>
            <div className="ml-4 text-white/40">windowMs: 15 * 60 * 1000,</div>
            <div className="ml-4 text-white/40">limit: 100</div>
            <div className="ml-2 text-white/50">{"})"})</div>
          </div>
        </div>
        <div className="mt-auto pt-2 border-t border-white/[0.05]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07]">
            <span className="text-xs text-white/20 flex-1 font-code">Ask anything about your code...</span>
            <div className="w-6 h-6 rounded-lg bg-purple-500/30 flex items-center justify-center">
              <ChevronRight className="w-3 h-3 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: Terminal,
    description: "Integrated terminal with full shell access. Run scripts, manage packages, all without leaving.",
    content: (
      <div className="flex flex-col h-full bg-[#030308] p-4 font-code text-xs">
        <div className="text-white/20 text-[10px] mb-3">QuietlyCode Integrated Terminal — PowerShell</div>
        <div className="space-y-1.5 text-[11px]">
          <div><span className="text-purple-400">PS</span> <span className="text-blue-400">~/project</span> <span className="text-white/60">&gt;</span> <span className="text-white/80">npm install</span></div>
          <div className="text-white/30">added 347 packages in 12.3s</div>
          <div className="text-green-400/70">✓ Done</div>
          <div className="mt-2"><span className="text-purple-400">PS</span> <span className="text-blue-400">~/project</span> <span className="text-white/60">&gt;</span> <span className="text-white/80">npm run dev</span></div>
          <div className="text-white/30 text-[10px]">  ▲ Next.js 14.2.5</div>
          <div className="text-white/30 text-[10px]">  - Local:  <span className="text-blue-400">http://localhost:3000</span></div>
          <div className="text-green-400/70 text-[10px]">  ✓ Ready in 843ms</div>
          <div className="mt-2"><span className="text-purple-400">PS</span> <span className="text-blue-400">~/project</span> <span className="text-white/60">&gt;</span> <span className="text-white/80">git commit -m &quot;feat: add auth&quot;</span></div>
          <div className="text-white/30 text-[10px]">[main 3a9f2c1] feat: add auth</div>
          <div className="text-white/30 text-[10px]"> 3 files changed, 87 insertions(+)</div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-purple-400">PS</span>
            <span className="text-blue-400">~/project</span>
            <span className="text-white/60">&gt;</span>
            <span className="w-2 h-4 bg-purple-400/80 animate-pulse ml-1" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "problems",
    label: "Problems",
    icon: AlertCircle,
    description: "Smart problems panel with AI-powered error explanations and one-click fix suggestions.",
    content: (
      <div className="flex flex-col h-full p-3">
        <div className="flex gap-4 border-b border-white/[0.05] pb-2 mb-3">
          <button className="text-xs text-white/70 border-b-2 border-purple-500 pb-1">Problems (3)</button>
          <button className="text-xs text-white/30">Output</button>
          <button className="text-xs text-white/30">Debug Console</button>
        </div>
        <div className="space-y-2 text-[11px]">
          {[
            { type: "error", file: "src/app.ts", line: 12, msg: "Type 'string' is not assignable to type 'number'", ai: "The PORT variable expects a number, but you're passing a string. Use parseInt() to fix this." },
            { type: "warning", file: "src/index.ts", line: 5, msg: "Variable 'server' is declared but never used", ai: "Remove the unused variable or use it in your code." },
            { type: "info", file: "tsconfig.json", line: 3, msg: "Consider enabling 'strict' mode", ai: "Strict mode catches more type errors during development." },
          ].map((p, i) => (
            <div key={i} className={`rounded-lg border p-2.5 ${
              p.type === "error" ? "border-red-500/20 bg-red-500/5" :
              p.type === "warning" ? "border-yellow-500/20 bg-yellow-500/5" :
              "border-blue-500/20 bg-blue-500/5"
            }`}>
              <div className="flex items-start gap-2">
                <AlertCircle className={`w-3 h-3 mt-0.5 shrink-0 ${
                  p.type === "error" ? "text-red-400" : p.type === "warning" ? "text-yellow-400" : "text-blue-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white/60 truncate">{p.msg}</div>
                  <div className="text-white/25 text-[9px] font-code mt-0.5">{p.file}:{p.line}</div>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-2 pl-5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50 mt-1 shrink-0" />
                <div className="text-purple-300/60 text-[9px]">{p.ai}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function IDEInterface() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section id="ide" ref={ref} className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] via-[#1b1b36] to-[#181828]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5 text-xs text-purple-400 font-medium">
            <Code2 className="w-3 h-3" />
            IDE Interface
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Built for developers.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every panel, every feature designed for a distraction-free, AI-enhanced coding experience.
          </p>
        </motion.div>

        <motion.div style={{ opacity }} className="space-y-6">
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {screens.map((screen, i) => {
              const Icon = screen.icon;
              return (
                <motion.button
                  key={screen.id}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === i
                      ? "bg-purple-600 text-white glow-purple-sm"
                      : "bg-white/[0.04] text-white/50 hover:text-white/80 border border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {screen.label}
                </motion.button>
              );
            })}
          </div>

          {/* Screen description */}
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white/40 text-sm"
          >
            {screens[activeTab].description}
          </motion.p>

          {/* IDE window */}
          <motion.div
            key={`window-${activeTab}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="ide-chrome mx-auto max-w-4xl"
          >
            {/* Title bar */}
            <div className="ide-titlebar">
              <div className="ide-dot bg-[#FF5F57]" />
              <div className="ide-dot bg-[#FFBD2E]" />
              <div className="ide-dot bg-[#28CA41]" />
              <div className="flex-1 flex items-center gap-2 ml-3">
                {screens.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(i)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-t-md text-[11px] transition-colors ${
                        activeTab === i
                          ? "bg-[#1a1a2e] text-white/80 border-t border-l border-r border-white/[0.07]"
                          : "text-white/30 hover:text-white/50"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="h-[400px] overflow-hidden">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {screens[activeTab].content}
              </motion.div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-purple-900/15 border-t border-white/[0.04] text-[10px] font-code">
              <div className="flex items-center gap-3 text-white/25">
                <span>TypeScript</span>
                <span>UTF-8</span>
                <span>LF</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400/70">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Llama-3.1-8B · Local
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
