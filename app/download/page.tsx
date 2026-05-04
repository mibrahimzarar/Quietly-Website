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
  Package,
  Loader2,
  KeyRound,
  Lock,
  Unlock,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useGitHubRelease, type ReleaseAssets } from "@/hooks/useGitHubRelease";

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



function buildPlatforms(assets: ReleaseAssets) {
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

  const platforms = assets ? buildPlatforms(assets) : [];
  const activePlatform = platforms.find((p) => p.id === selectedOS) || platforms[0];
  const ActivePlatformIcon = activePlatform?.icon;

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
      <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors min-w-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">Back to home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2.5 shrink-0 ml-auto">
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
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >


          <h1 className="text-[clamp(2rem,8vw,3.75rem)] sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 px-1">
            <span className="gradient-text">QUIETLY</span>
          </h1>
          <p className="text-base sm:text-lg text-white/55 font-medium tracking-wide mb-6">
            Offline IDE &amp; Standalone Chat
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Shield className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">
              Your data never leaves your machine
            </span>
          </div>

        </motion.div>
      </section>

      {!isAuthorized ? (
        /* --- LICENSE KEY GATE UI --- */
        <section className="relative z-10 max-w-md mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/[0.08] to-transparent p-6 sm:p-8 md:p-10 relative overflow-hidden"
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
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex justify-end">
            <button
              onClick={handleSignOut}
              className="text-xs text-white/40 hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Remove Key
            </button>
          </div>

          {/* Primary download button for detected OS */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-3 w-full max-w-lg mx-auto"
            >
              {loading ? (
                <div className="flex items-center gap-3 px-6 sm:px-10 py-4 rounded-2xl bg-purple-500/20 text-white/70 font-semibold text-sm sm:text-base text-center w-full justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Fetching latest release…</span>
                </div>
              ) : !hasRelease ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col sm:flex-row items-center gap-3 px-6 sm:px-10 py-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-white/80 font-semibold text-sm sm:text-base w-full max-w-md justify-center text-center">
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
                  className="group relative flex items-center justify-center gap-3 w-full max-w-md px-6 sm:px-10 py-4 rounded-2xl btn-purple text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-600/30 text-center"
                >
                  <Download className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{getPrimaryLabel()}</span>
                </motion.a>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col sm:flex-row items-center gap-3 px-6 sm:px-10 py-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-white/80 font-semibold text-sm sm:text-base w-full max-w-md justify-center text-center">
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

              </div>
            </motion.div>
          </section>

          {/* Windows Certificate Warning Note - Only for Windows */}
          {selectedOS === "windows" && (
            <section className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-amber-200">Important Note for Windows Users</h4>
                  <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed">
                    If you encounter a warning during download stating that this file might be harmful, you can safely ignore it. This message appears because we are currently working on our official <strong>Windows Certificate</strong>. Quietly is 100% safe to download and install.
                  </p>
                </div>
              </motion.div>
            </section>
          )}

          {/* OS Selector Tabs + Downloads */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
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

              {/* OS Tabs — horizontal scroll on narrow viewports */}
              <div className="flex items-stretch justify-start sm:justify-center gap-2 mb-8 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {platforms.map((platform) => {
                  const isActive = selectedOS === platform.id;
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => setSelectedOS(platform.id)}
                      className={`relative flex shrink-0 snap-start items-center gap-2 min-h-[44px] px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${isActive
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
              {!loading && activePlatform && ActivePlatformIcon && (
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
                    <div className="px-4 sm:px-8 py-5 sm:py-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0">
                        <ActivePlatformIcon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-white">
                          {activePlatform.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/55 leading-snug">{activePlatform.description}</p>
                      </div>
                    </div>

                    {/* Downloads list */}
                    <div className="p-4 sm:p-6 space-y-3">
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
                            className={`group flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border transition-all duration-200 min-h-[3.25rem] ${!available
                              ? "border-white/[0.06] bg-white/[0.02] opacity-60 cursor-default"
                              : dl.recommended
                                ? "border-purple-500/30 bg-purple-500/[0.08] hover:bg-purple-500/[0.14] hover:border-purple-500/40 active:scale-[0.99]"
                                : "border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] active:scale-[0.99]"
                              }`}
                          >
                            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                              <div
                                className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${!available
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
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
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
                              <div className="flex items-center justify-center sm:justify-end gap-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors shrink-0 w-full sm:w-auto pt-1 sm:pt-0 border-t border-white/[0.06] sm:border-t-0">
                                <Download className="w-4 h-4 shrink-0" />
                                <span className="font-medium">Download</span>
                              </div>
                            ) : (
                              <span className="text-xs text-white/35 font-medium self-center sm:self-auto">Coming Soon</span>
                            )}
                          </Tag>
                        );
                      })}

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 text-center sm:text-left">
          <p className="max-w-[28ch] sm:max-w-none">&copy; 2026 IntelliBud Innovations. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
