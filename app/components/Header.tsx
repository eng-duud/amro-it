"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية", labelEn: "Home" },
  { href: "/about", label: "عني", labelEn: "About" },
  { href: "/works", label: "أعمالي", labelEn: "Works" },
  { href: "/contact", label: "تواصل", labelEn: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-[#C9A96E]/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-[#C9A96E]/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/20 to-transparent" />
              <span className="font-playfair text-[#C9A96E] font-bold text-lg relative z-10">ع</span>
            </div>
            <div>
              <div className="font-playfair text-white font-semibold text-sm leading-tight">عمرو الجمل</div>
              <div className="text-[#C9A96E]/60 text-xs font-dm">Developer</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-dm transition-all duration-300 group ${
                  pathname === link.href ? "text-[#C9A96E]" : "text-[#888] hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:amro@example.com"
              className="relative px-6 py-2.5 text-sm font-dm font-medium overflow-hidden group"
            >
              <div className="absolute inset-0 border border-[#C9A96E]/40 rounded-lg transition-colors group-hover:border-[#C9A96E]" />
              <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/10 rounded-lg transition-colors" />
              <span className="relative text-[#C9A96E]">للتواصل</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-[#C9A96E]/20 rounded-lg text-[#C9A96E]"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-[#C9A96E]/20 rounded-lg text-[#C9A96E]"
            >
              <X size={18} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-playfair text-3xl font-bold transition-colors ${
                      pathname === link.href ? "text-[#C9A96E]" : "text-white hover:text-[#C9A96E]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
