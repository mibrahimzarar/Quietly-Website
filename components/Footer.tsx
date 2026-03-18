"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

const links = {
  Product: [
    { label: "Download", href: "/download" },
    { label: "Features", href: "/#features" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#181828] to-[#141420]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top section */}
        <div className="flex flex-col items-center justify-center gap-12 py-16 text-center">

          {/* Brand */}
          <div className="flex flex-col items-center max-w-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Logo — uses actual LOGO.png */}
              <div className="flex items-center justify-center gap-2.5 mb-5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden glow-purple-sm">
                  <Image
                    src="/images/logo.png"
                    alt="Quietly Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    suppressHydrationWarning
                  />
                </div>
                <span className="font-semibold text-base tracking-tight text-white/90">
                  Quietly
                </span>
              </div>

              <p className="text-white/35 text-sm leading-relaxed">
                A local, private AI pair-programmer. Your code stays on your machine. Always.
              </p>
            </motion.div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-12">
            {Object.entries(links).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h4 className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] py-5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-center">
          <p className="text-xs text-white/20">
            © 2026 IntelliBud Innovations. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-1.5 text-xs text-white/20">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-purple-500/50 fill-purple-500/35" />
            <span>for people who value privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
