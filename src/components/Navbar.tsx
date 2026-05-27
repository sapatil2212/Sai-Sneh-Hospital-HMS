"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu, X, PhoneCall, Calendar, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Departments", path: "/departments" },
  { label: "Doctors", path: "/doctors" },
  { label: "Insurance", path: "/insurance" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  // Scroll listener to update navbar state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Outer Header Wrapper: Sticky at viewport top */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-transparent py-3 px-4" 
            : "bg-transparent py-0 px-0"
        }`}
      >
        {/* Inner Morphing Container */}
        <div
          className={`mx-auto w-full transition-all duration-500 ease-in-out ${
            isScrolled 
              ? "max-w-6xl rounded-full border border-slate-200/50 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-premium py-2 px-6" 
              : "max-w-full rounded-none border border-t-transparent border-x-transparent border-b-slate-100 dark:border-b-slate-800/50 bg-white/95 dark:bg-slate-950/95 py-3.5 px-6 md:px-12"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="p-1.5 bg-brand-teal/10 rounded-full group-hover:bg-brand-teal/20 transition-colors">
                <HeartPulse className="w-4.5 h-4.5 text-brand-teal" />
              </div>
              <div className="transition-all duration-350">
                <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
                  Sai Sneh
                </span>
                <span className="block text-[8px] tracking-widest text-slate-400 uppercase font-black -mt-0.5">
                  Hospital
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with sliding background capsule */}
            <nav 
              className="hidden lg:flex items-center gap-0.5"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className={`relative px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-colors duration-250 ${
                      isActive
                        ? "text-brand-teal"
                        : "text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {/* Sliding hover pill indicator */}
                    {hoveredIndex === idx && (
                      <motion.span
                        layoutId="hover-background"
                        className="absolute inset-0 bg-slate-100 dark:bg-slate-800/60 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    
                    {/* Active bottom thin highlight dot */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-teal rounded-full" />
                    )}
                    
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Live 24/7 Red Pill Button */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="tel:08888150101"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-300 relative overflow-hidden"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping shrink-0" />
                <PhoneCall className="w-3.5 h-3.5 text-white shrink-0" />
                <span>24x7 Emergency</span>
              </motion.a>

              {/* Booking Pill */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/book-appointment"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black text-white bg-slate-900 dark:bg-brand-teal hover:opacity-90 shadow-sm transition-all duration-300"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Book Slot</span>
              </motion.a>

              {/* Admin shortcut */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/admin"
                title="Admin Panel"
                className="p-1.5 rounded-full border border-slate-205 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* Mobile Actions Drawer Triggers */}
            <div className="flex lg:hidden items-center gap-1.5">
              <a
                href="tel:08888150101"
                className="p-2 rounded-full text-white bg-red-650 animate-pulse"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-705 dark:text-slate-300"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-18 left-4 right-4 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 rounded-3xl lg:hidden shadow-lg p-5"
          >
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`block px-4 py-2.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? "text-brand-teal bg-brand-teal/5 dark:bg-brand-teal/10"
                        : "text-slate-750 dark:text-slate-350 hover:bg-slate-55/60 dark:hover:bg-slate-850/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/book-appointment"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[11px] font-bold text-white bg-brand-teal text-center"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Slot</span>
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-205 border border-slate-200 dark:border-slate-800 text-center"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
