"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Demo", href: "/#demo" },
  { label: "Installation", href: "/installation" },
  { label: "Privacy", href: "/privacy" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [boxData, setBoxData] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const target = e.currentTarget;
    setHoveredIndex(index);
    setBoxData({
      left: target.offsetLeft,
      width: target.offsetWidth,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setBoxData((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`
            pointer-events-auto transition-all duration-700 ease-in-out
            ${scrolled 
              ? "nav-pill glass-morphism-premium py-2 max-w-[95%] sm:max-w-fit mx-auto" 
              : "w-full bg-transparent py-4 px-6 sm:px-12"}
          `}
        >
          <div className={`flex items-center gap-8 ${scrolled ? "" : "max-w-7xl mx-auto w-full justify-between"}`}>
            {/* Logo */}
            <Link 
              href="/" 
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 group"
            >
              <motion.div 
                className="relative w-8 h-8 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center group-hover:glow-purple-premium transition-all duration-300"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Quietly Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.span 
                animate={{ width: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
                className="font-bold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors overflow-hidden whitespace-nowrap"
              >
                Quietly
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center relative" onMouseLeave={handleMouseLeave}>
              {/* Sliding Indicator */}
              <motion.div
                className="absolute h-8 bg-white/[0.08] rounded-full z-0 border border-white/[0.05]"
                initial={false}
                animate={{
                  left: boxData.left,
                  width: boxData.width,
                  opacity: boxData.opacity,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
              
              <div className="flex items-center gap-1 z-10">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`
                      px-4 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full
                      ${hoveredIndex === i ? "text-white" : "text-white/50 hover:text-white/80"}
                    `}
                    onMouseEnter={(e) => handleMouseEnter(e, i)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column (CTA) */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  href="/pricing"
                  className="btn-premium group flex items-center gap-2"
                >
                  <span className="text-sm font-semibold tracking-wide">Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Mobile Toggle */}
              <button
                className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-[#05050a]/90 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-bold text-white/50 hover:text-white hover:shimmer-text transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 w-full max-w-xs"
              >
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="btn-premium flex items-center justify-center gap-3 w-full py-4 text-lg font-bold"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

