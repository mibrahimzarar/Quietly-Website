"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Check,
  Shield,
  WifiOff,
  Cpu,
  Sparkles,
  ArrowLeft,
  Zap,
  Heart,
  Monitor,
  Apple,
  ChevronDown,
  Terminal,
  Copy,
  CheckCheck,
  HardDrive,
  Lock,
  Package,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ── GitHub Releases (proxied via API route) ─────────────────────────
const GH_REPO = "mibrahimzarar/Quietly";
const RELEASES_FALLBACK = `https://github.com/${GH_REPO}/releases/latest`;

interface Assets {
  winX64: string;
  winArm64: string;
  macUniversal: string;
  linuxAppImage: string;
  linuxDeb: string;
  linuxRpm: string;
}

function useGitHubRelease() {
  const [assets, setAssets] = useState<Assets | null>(null);
  const [version, setVersion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [hasRelease, setHasRelease] = useState(false);

  useEffect(() => {
    fetch("/api/releases")
      .then((res) => {
        if (!res.ok) throw new Error("No release");
        return res.json();
      })
      .then((release) => {
        const tag = release.tag_name || "";
        setVersion(tag);

        const urls: Record<string, string> = {};
        for (const asset of release.assets || []) {
          const name: string = asset.name;
          const url: string = asset.browser_download_url;

          if (name.endsWith(".exe") && name.includes("arm64")) {
            urls.winArm64 = url;
          } else if (name.endsWith(".exe")) {
            urls.winX64 = url;
          } else if (name.endsWith(".dmg")) {
            urls.macUniversal = url;
          } else if (name.endsWith(".AppImage")) {
            urls.linuxAppImage = url;
          } else if (name.endsWith(".deb")) {
            urls.linuxDeb = url;
          } else if (name.endsWith(".rpm")) {
            urls.linuxRpm = url;
          }
        }

        const hasAny = Object.keys(urls).length > 0;
        setHasRelease(hasAny);

        setAssets({
          winX64: urls.winX64 || RELEASES_FALLBACK,
          winArm64: urls.winArm64 || RELEASES_FALLBACK,
          macUniversal: urls.macUniversal || RELEASES_FALLBACK,
          linuxAppImage: urls.linuxAppImage || RELEASES_FALLBACK,
          linuxDeb: urls.linuxDeb || RELEASES_FALLBACK,
          linuxRpm: urls.linuxRpm || RELEASES_FALLBACK,
        });
      })
      .catch(() => {
        setHasRelease(false);
        setAssets({
          winX64: RELEASES_FALLBACK,
          winArm64: RELEASES_FALLBACK,
          macUniversal: RELEASES_FALLBACK,
          linuxAppImage: RELEASES_FALLBACK,
          linuxDeb: RELEASES_FALLBACK,
          linuxRpm: RELEASES_FALLBACK,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { assets, version, loading, hasRelease };
}

type OS = "windows" | "macos" | "linux" | "unknown";

function useDetectedOS(): { os: OS; arch: "x64" | "arm64" } {
  const [result, setResult] = useState<{ os: OS; arch: "x64" | "arm64" }>({
    os: "unknown",
    arch: "x64",
  });

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const plat = (navigator.platform || "").toLowerCase();

    let os: OS = "unknown";
    if (plat.includes("win") || ua.includes("windows")) os = "windows";
    else if (plat.includes("mac") || ua.includes("mac")) os = "macos";
    else if (plat.includes("linux") || ua.includes("linux")) os = "linux";

    const arch: "x64" | "arm64" =
      ua.includes("arm64") || ua.includes("aarch64") ? "arm64" : "x64";

    const uad = (navigator as any).userAgentData;
    if (uad?.getHighEntropyValues) {
      uad
        .getHighEntropyValues(["architecture"])
        .then((d: any) => {
          setResult({ os, arch: d.architecture === "arm" ? "arm64" : arch });
        })
        .catch(() => setResult({ os, arch }));
    } else {
      setResult({ os, arch });
    }
  }, []);

  return result;
}

const WindowsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 5.557L10.125 4.5v7.125H3V5.557zm0 12.886L10.125 19.5V12.375H3v6.068zM10.875 4.387L21 2.625v8.875H10.875V4.387zm0 15.226L21 21.375V12.375H10.875v7.238z" />
  </svg>
);

const LinuxIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.207 1.361 1.073 2.44 2.707 3.248 3.26 1.506 3.419-.984 5.665-.992.02 0 .04 0 .061.003 1.3.047 2.275.99 3.536.99.57 0 1.14-.146 1.794-.517 2.24-1.303 1.965-2.986 1.78-4.025-.183-1.04-.336-2.26.282-3.494.606-1.213 1.77-2.393 2.394-3.747.33-.712.482-1.461.396-2.188-.126-1.08-.725-2.003-1.699-2.663-.914-.615-2.01-.979-3.27-1.102-.35-.033-.7-.05-1.04-.05z" />
  </svg>
);

const included = [
  "Full offline AI code completion",
  "Local chat with AI models",
  "Syntax highlighting for 50+ languages",
  "Integrated terminal & file explorer",
  "Zero telemetry — no data leaves your machine",
  "All future updates included",
  "Priority model optimization",
  "Advanced AI context (full project awareness)",
  "Multi-file refactoring with AI",
  "Custom model fine-tuning support",
];

function buildPlatforms(assets: Assets) {
  return [
    {
      id: "windows" as OS,
      name: "Windows",
      icon: WindowsIcon,
      description: "Windows 10 / 11",
      downloads: [
        { label: "Installer (x64)", ext: ".exe", href: assets.winX64, recommended: true },
        { label: "Installer (ARM64)", ext: ".exe", href: assets.winArm64, recommended: false },
      ],
    },
    {
      id: "macos" as OS,
      name: "macOS",
      icon: Apple,
      description: "macOS 12+ (Monterey and later)",
      downloads: [
        { label: "Universal (Intel + Apple Silicon)", ext: ".dmg", href: assets.macUniversal, recommended: true },
      ],
    },
    {
      id: "linux" as OS,
      name: "Linux",
      icon: LinuxIcon,
      description: "Ubuntu, Debian, Fedora, Arch & more",
      downloads: [
        { label: "AppImage (Universal)", ext: ".AppImage", href: assets.linuxAppImage, recommended: true },
        { label: "Ubuntu / Debian", ext: ".deb", href: assets.linuxDeb, recommended: false },
        { label: "Fedora / RHEL", ext: ".rpm", href: assets.linuxRpm, recommended: false },
      ],
    },
  ];
}

export default function DownloadPage() {
  const { os, arch } = useDetectedOS();
  const { assets, version, loading, hasRelease } = useGitHubRelease();
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (os !== "unknown") setSelectedOS(os);
  }, [os]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const platforms = assets ? buildPlatforms(assets) : [];
  const activePlatform = platforms.find((p) => p.id === selectedOS) || platforms[0];

  // Determine primary download for detected OS
  const getPrimaryDownload = () => {
    if (!assets) return "#";
    if (os === "windows") return arch === "arm64" ? assets.winArm64 : assets.winX64;
    if (os === "macos") return assets.macUniversal;
    if (os === "linux") return assets.linuxAppImage;
    return assets.winX64;
  };

  const getPrimaryLabel = () => {
    if (os === "windows") return `Download for Windows${arch === "arm64" ? " (ARM64)" : ""}`;
    if (os === "macos") return "Download for macOS";
    if (os === "linux") return "Download for Linux";
    return "Download Quietly";
  };

  return (
    <main className="relative min-h-screen bg-[#05050a] text-white overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-[0.15]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-700/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden glow-purple-sm">
              <Image
                src="/images/logo.png"
                alt="Quietly Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                suppressHydrationWarning
              />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white/90">
              Quietly
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pt-12 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <Shield className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">
              Your code never leaves your machine
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Get </span>
            <span className="gradient-text">Quietly</span>
          </h1>

          <p className="text-lg text-white/45 max-w-xl mx-auto mb-6 leading-relaxed">
            One purchase. No subscriptions. No accounts.
            <br className="hidden sm:block" />
            Start coding with local AI in under two minutes.
          </p>

          {/* Price badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06]"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-white">$7</span>
              <span className="text-sm text-white/35">one-time</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-left">
              <div className="text-xs text-purple-300 font-medium">Full License</div>
              <div className="text-[11px] text-white/30">All platforms included</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Primary download button for detected OS */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          {loading ? (
            <div className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-purple-500/20 text-white/50 font-semibold text-base">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Fetching latest release…</span>
            </div>
          ) : !hasRelease ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 px-10 py-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] text-white/60 font-semibold text-base">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Coming Soon</span>
              </div>
              <span className="text-xs text-white/25">First release is being prepared</span>
            </div>
          ) : (
            <motion.a
              href={getPrimaryDownload()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl btn-purple text-white font-semibold text-base shadow-lg shadow-purple-600/20"
            >
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{getPrimaryLabel()}</span>
            </motion.a>
          )}
          <div className="flex items-center gap-4 text-xs text-white/25">
            {version && (
              <span className="text-purple-400/60 font-mono">{version}</span>
            )}
            <div className="flex items-center gap-1.5">
              <WifiOff className="w-3 h-3" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              <span>~2 min setup</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* OS Selector Tabs + Downloads */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Section header */}
          <div className="text-center mb-8">
            <p className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium">
              Choose your platform
            </p>
          </div>

          {/* OS Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {platforms.map((platform) => {
              const isActive = selectedOS === platform.id;
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedOS(platform.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-purple-500/15 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                      : "text-white/40 hover:text-white/70 border border-transparent hover:border-white/[0.08] hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : ""}`} />
                  <span>{platform.name}</span>
                  {os === platform.id && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                      Detected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active platform downloads */}
          {!loading && activePlatform && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOS}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              {/* Platform header */}
              <div className="px-8 py-6 border-b border-white/[0.04] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <activePlatform.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {activePlatform.name}
                  </h3>
                  <p className="text-sm text-white/35">{activePlatform.description}</p>
                </div>
              </div>

              {/* Downloads list */}
              <div className="p-6 space-y-3">
                {activePlatform.downloads.map((dl, i) => (
                  <motion.a
                    key={dl.label}
                    href={dl.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      dl.recommended
                        ? "border-purple-500/20 bg-purple-500/[0.04] hover:bg-purple-500/[0.08] hover:border-purple-500/30"
                        : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          dl.recommended
                            ? "bg-purple-500/15"
                            : "bg-white/[0.04]"
                        }`}
                      >
                        <Package
                          className={`w-4 h-4 ${
                            dl.recommended ? "text-purple-400" : "text-white/40"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                            {dl.label}
                          </span>
                          {dl.recommended && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold uppercase tracking-wider">
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-white/25 font-mono">{dl.ext}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-400/70 group-hover:text-purple-300 transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </div>
                  </motion.a>
                ))}

                {/* Linux quick install */}
                {selectedOS === "linux" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-4 pt-4 border-t border-white/[0.05] space-y-4"
                  >
                    {/* Universal install script */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Terminal className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-xs text-white/30 font-medium">Quick install (Ubuntu, Debian, Fedora & more)</span>
                      </div>
                      <div className="flex items-center gap-3 bg-[#0a0a14] rounded-xl px-5 py-3.5 border border-white/[0.06] group">
                        <code className="text-xs font-mono text-green-400/80 flex-1 overflow-x-auto whitespace-nowrap">
                          curl -fsSL https://quietlycode.netlify.app/install.sh | bash
                        </code>
                        <button
                          onClick={() => handleCopy("curl -fsSL https://quietlycode.netlify.app/install.sh | bash", "install")}
                          className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 border border-white/[0.08] hover:border-white/[0.15] rounded-lg px-3 py-1.5 transition-all shrink-0"
                        >
                          {copied === "install" ? (
                            <>
                              <CheckCheck className="w-3 h-3 text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          )}
        </motion.div>

        {/* What's included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
        >
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-[0.15em] text-center mb-8">
            Everything included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
            {included.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.04 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-sm text-white/50">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-8 px-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
            <div className="flex items-center gap-3 text-white/30">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-400/70" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/50">Privacy Guaranteed</div>
                <div className="text-xs text-white/20">All AI runs locally</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/[0.06]" />
            <div className="flex items-center gap-3 text-white/30">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <WifiOff className="w-4 h-4 text-purple-400/70" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/50">No Internet Required</div>
                <div className="text-xs text-white/20">Works completely offline</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/[0.06]" />
            <div className="flex items-center gap-3 text-white/30">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400/70" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/50">Lifetime Updates</div>
                <div className="text-xs text-white/20">Free forever</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
          <p>&copy; 2026 Quietly. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-purple-500/50 fill-purple-500/35" />
            <span>for developers who value privacy</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
