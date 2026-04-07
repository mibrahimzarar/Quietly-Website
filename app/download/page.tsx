"use client";

import { Suspense } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Shield,
  WifiOff,
  Sparkles,
  ArrowLeft,
  Zap,
  Heart,
  Apple,
  Terminal,
  Copy,
  CheckCheck,
  Package,
  Loader2,
  KeyRound,
  Lock,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// ── GitHub Releases (proxied via API route) ─────────────────────────
const GH_REPO = "mibrahimzarar/Quietly";
const FALLBACK_TAG = "v1.1.6";
const DL_BASE = `https://github.com/${GH_REPO}/releases/download/${FALLBACK_TAG}`;

const FALLBACK_ASSETS: Assets = {
  winX64: `${DL_BASE}/Quietly-Setup.exe`,
  macUniversal: `${DL_BASE}/Quietly-universal.dmg`,
  linuxAppImage: `${DL_BASE}/Quietly-x86_64.AppImage`,
  linuxDeb: `${DL_BASE}/Quietly-amd64.deb`,
  linuxRpm: `${DL_BASE}/Quietly-x86_64.rpm`,
};

interface Assets {
  winX64: string;
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

          if (name.endsWith(".exe")) {
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

        setHasRelease(true);

        setAssets({
          winX64: urls.winX64 || FALLBACK_ASSETS.winX64,
          macUniversal: urls.macUniversal || FALLBACK_ASSETS.macUniversal,
          linuxAppImage: urls.linuxAppImage || FALLBACK_ASSETS.linuxAppImage,
          linuxDeb: urls.linuxDeb || FALLBACK_ASSETS.linuxDeb,
          linuxRpm: urls.linuxRpm || FALLBACK_ASSETS.linuxRpm,
        });
      })
      .catch(() => {
        setHasRelease(true);
        setVersion(FALLBACK_TAG);
        setAssets(FALLBACK_ASSETS);
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



function buildPlatforms(assets: Assets) {
  return [
    {
      id: "windows" as OS,
      name: "Windows",
      icon: WindowsIcon,
      description: "Windows 10 / 11",
      downloads: [
        { label: "Installer (x64)", ext: ".exe", href: assets.winX64, recommended: true },
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
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05050a] flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
    </div>}>
      <DownloadPageContent />
    </Suspense>
  );
}

function DownloadPageContent() {
  const { os, arch } = useDetectedOS();
  const { assets, version, loading, hasRelease } = useGitHubRelease();
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const [copied, setCopied] = useState<string | null>(null);

  // License Authorization State
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [licenseError, setLicenseError] = useState("");

  useEffect(() => {
    if (os !== "unknown") setSelectedOS(os);
    // Check localStorage on mount
    const savedStatus = localStorage.getItem("quietly_license_unlocked");
    if (savedStatus === "true") {
      setIsAuthorized(true);
    }
  }, [os]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;

    setValidating(true);
    setLicenseError("");

    try {
      const res = await fetch("/api/validate-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: licenseKey.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setIsAuthorized(true);
        localStorage.setItem("quietly_license_unlocked", "true");
        setLicenseKey("");
      } else {
        setLicenseError(data.error || "Invalid license key");
      }
    } catch (err) {
      setLicenseError("Failed to validate key. Please try again.");
    } finally {
      setValidating(false);
    }
  };

  const handleSignOut = () => {
    setIsAuthorized(false);
    localStorage.removeItem("quietly_license_unlocked");
  };

  // Extract URL params inside a client component correctly using a custom hook/component pattern
  // But since we need the state here, we'll fetch it inside a smaller inner component 
  // or use `useSearchParams` directly, but we must wrap the usage in Suspense in the render tree.
  // We'll rename `DownloadPage` to `DownloadPageContent` and wrap it in `DownloadPage` export.

  const searchParams = useSearchParams();

  useEffect(() => {
    const keyFromUrl = searchParams.get("key");
    if (keyFromUrl && !isAuthorized && !validating) {
      setLicenseKey(keyFromUrl);
      // Automatically attempt to validate it
      const validateFromUrl = async () => {
        setValidating(true);
        setLicenseError("");
        try {
          const res = await fetch("/api/validate-license", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ license_key: keyFromUrl }),
          });
          const data = await res.json();
          if (res.ok && data.valid) {
            setIsAuthorized(true);
            localStorage.setItem("quietly_license_unlocked", "true");
            // clear from URL to make it clean
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            setLicenseError(data.error || "Invalid license key from URL");
          }
        } catch (err) {
          setLicenseError("Failed to validate key from URL.");
        } finally {
          setValidating(false);
        }
      };
      // only trigger if we aren't already authorized from localStorage
      if (localStorage.getItem("quietly_license_unlocked") !== "true") {
        validateFromUrl();
      }
    }
  }, [searchParams, isAuthorized, validating]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const platforms = assets ? buildPlatforms(assets) : [];
  const activePlatform = platforms.find((p) => p.id === selectedOS) || platforms[0];

  // Determine primary download for detected OS
  const getPrimaryDownload = () => {
    if (!assets) return "";
    if (os === "windows") return assets.winX64 || "";
    if (os === "macos") return assets.macUniversal || "";
    if (os === "linux") return assets.linuxAppImage || "";
    return assets.winX64 || "";
  };

  const getPrimaryLabel = () => {
    if (os === "windows") return "Download for Windows";
    if (os === "macos") return "Download for macOS";
    if (os === "linux") return "Download for Linux";
    return "Download Quietly";
  };

  return (
    <main className="relative min-h-screen bg-[#05050a] text-white overflow-hidden">
      {/* Backgrounds — brighter glows */}
      <div className="absolute inset-0 bg-grid opacity-[0.2]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-purple-600/[0.12] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-700/[0.08] blur-[120px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
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
            <span className="font-semibold text-sm tracking-tight text-white">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Shield className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">
              Your code never leaves your machine
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Get </span>
            <span className="gradient-text">Quietly</span>
          </h1>

          <p className="text-lg text-white/70 max-w-xl mx-auto mb-6 leading-relaxed">
            No subscriptions. No accounts.
            <br className="hidden sm:block" />
            Start coding with local AI in minutes.
          </p>
        </motion.div>
      </section>

      {!isAuthorized ? (
        /* --- LICENSE KEY GATE UI --- */
        <section className="relative z-10 max-w-md mx-auto px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/[0.08] to-transparent p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-50 pointer-events-none" />

            <div className="relative text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Unlock Downloads</h2>
              <p className="text-sm text-white/60">
                Enter your license key from your purchase receipt.
              </p>
            </div>

            <form onSubmit={handleValidate} className="relative space-y-4">
              <div>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="password"
                    placeholder="e.g. XXXX-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono"
                    disabled={validating}
                  />
                </div>
                {licenseError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-medium mt-3"
                  >
                    {licenseError}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={!licenseKey.trim() || validating}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl btn-purple text-white font-semibold text-sm shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                {validating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    Verify License
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/pricing" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Don&apos;t have a license? Buy Quietly
              </Link>
            </div>
          </motion.div>
        </section>
      ) : (
        /* --- AUTHORIZED DOWNLOAD UI --- */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sign Out Button */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 mb-4 flex justify-end">
            <button
              onClick={handleSignOut}
              className="text-xs text-white/40 hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Remove Key
            </button>
          </div>

          {/* Primary download button for detected OS */}
          <section className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              {loading ? (
                <div className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-purple-500/20 text-white/70 font-semibold text-base">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Fetching latest release…</span>
                </div>
              ) : !hasRelease ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 px-10 py-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-white/80 font-semibold text-base">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>Coming Soon</span>
                  </div>
                  <span className="text-xs text-white/40">First release is being prepared</span>
                </div>
              ) : getPrimaryDownload() ? (
                <motion.a
                  href={getPrimaryDownload()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl btn-purple text-white font-semibold text-base shadow-lg shadow-purple-600/30"
                >
                  <Download className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{getPrimaryLabel()}</span>
                </motion.a>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 px-10 py-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-white/80 font-semibold text-base">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>{getPrimaryLabel()} — Coming Soon</span>
                  </div>
                  <span className="text-xs text-white/40">Check out Linux builds below</span>
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-white/40">
                {version && (
                  <span className="text-purple-400/80 font-mono">{version}</span>
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
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold">
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
                      className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                        ? "text-white bg-purple-500/20 border border-purple-500/40 shadow-lg shadow-purple-500/15"
                        : "text-white/55 hover:text-white/80 border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]"
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : ""}`} />
                      <span>{platform.name}</span>
                      {os === platform.id && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/25 text-purple-300 font-semibold">
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
                    className="rounded-2xl border border-white/[0.1] bg-white/[0.03] overflow-hidden"
                  >
                    {/* Platform header */}
                    <div className="px-8 py-6 border-b border-white/[0.08] flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                        <activePlatform.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {activePlatform.name}
                        </h3>
                        <p className="text-sm text-white/55">{activePlatform.description}</p>
                      </div>
                    </div>

                    {/* Downloads list */}
                    <div className="p-6 space-y-3">
                      {activePlatform.downloads.map((dl, i) => {
                        const available = !!dl.href;
                        const Tag = available ? motion.a : motion.div;
                        return (
                          <Tag
                            key={dl.label}
                            {...(available ? { href: dl.href } : {})}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${!available
                              ? "border-white/[0.06] bg-white/[0.02] opacity-60 cursor-default"
                              : dl.recommended
                                ? "border-purple-500/30 bg-purple-500/[0.08] hover:bg-purple-500/[0.14] hover:border-purple-500/40"
                                : "border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15]"
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${!available
                                  ? "bg-white/[0.04]"
                                  : dl.recommended
                                    ? "bg-purple-500/20"
                                    : "bg-white/[0.06]"
                                  }`}
                              >
                                <Package
                                  className={`w-4 h-4 ${!available
                                    ? "text-white/30"
                                    : dl.recommended
                                      ? "text-purple-400"
                                      : "text-white/50"
                                    }`}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm font-medium transition-colors ${available ? "text-white/90 group-hover:text-white" : "text-white/50"
                                    }`}>
                                    {dl.label}
                                  </span>
                                  {available && dl.recommended && (
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/25 text-purple-300 font-semibold uppercase tracking-wider">
                                      Recommended
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-white/40 font-mono">{dl.ext}</span>
                              </div>
                            </div>
                            {available ? (
                              <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline font-medium">Download</span>
                              </div>
                            ) : (
                              <span className="text-xs text-white/35 font-medium">Coming Soon</span>
                            )}
                          </Tag>
                        );
                      })}

                      {/* Linux quick install */}
                      {selectedOS === "linux" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="mt-4 pt-4 border-t border-white/[0.08] space-y-4"
                        >
                          {/* Universal install script */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Terminal className="w-3.5 h-3.5 text-white/50" />
                              <span className="text-xs text-white/50 font-medium">Quick install (Ubuntu, Debian, Fedora & more)</span>
                            </div>
                            <div className="flex items-center gap-3 bg-[#0c0c18] rounded-xl px-5 py-3.5 border border-white/[0.1] group">
                              <code className="text-xs font-mono text-green-400 flex-1 overflow-x-auto whitespace-nowrap">
                                curl -fsSL https://quietlycode.org/install.sh | bash
                              </code>
                              <button
                                onClick={() => handleCopy("curl -fsSL https://quietlycode.org/install.sh | bash", "install")}
                                className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 border border-white/[0.12] hover:border-white/[0.2] rounded-lg px-3 py-1.5 transition-all shrink-0"
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

                          {/* Arch Linux */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Terminal className="w-3.5 h-3.5 text-white/50" />
                              <span className="text-xs text-white/50 font-medium">Arch Linux (via PKGBUILD)</span>
                            </div>
                            <div className="flex items-center gap-3 bg-[#0c0c18] rounded-xl px-5 py-3.5 border border-white/[0.1] group">
                              <code className="text-xs font-mono text-green-400 flex-1 overflow-x-auto whitespace-nowrap">
                                curl -fsSL https://quietlycode.org/PKGBUILD -o PKGBUILD && makepkg -si
                              </code>
                              <button
                                onClick={() => handleCopy("curl -fsSL https://quietlycode.org/PKGBUILD -o PKGBUILD && makepkg -si", "arch")}
                                className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 border border-white/[0.12] hover:border-white/[0.2] rounded-lg px-3 py-1.5 transition-all shrink-0"
                              >
                                {copied === "arch" ? (
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


          </section>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2026 IntelliBud Innovations. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
