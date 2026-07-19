"use client";

import * as React from "react";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { Menu, X, Vote, BookOpen, Blocks, Heart, Images, BookText, Users } from "lucide-react";
import Link from "next/link";

// Official Discord mark (lucide dropped brand icons). Inherits text color.
export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

// TODO: set the real Vote URL. `disabled` items render un-clickable (Wiki: coming soon).
const MENU: {
  id: number;
  title: string;
  url: string;
  icon: React.ReactNode;
  disabled?: boolean;
}[] = [
  { id: 1, title: "Vote", url: "#", icon: <Vote className="w-5 h-5" />, disabled: true },
  { id: 2, title: "Rules", url: "/rules", icon: <BookOpen className="w-5 h-5" /> },
  { id: 4, title: "Allowed Mods", url: "/allowed-mods", icon: <Blocks className="w-5 h-5" /> },
  { id: 6, title: "Gallery", url: "/gallery", icon: <Images className="w-5 h-5" /> },
  { id: 7, title: "Wiki", url: "#", icon: <BookText className="w-5 h-5" />, disabled: true },
  { id: 8, title: "Staff", url: "/staff", icon: <Users className="w-5 h-5" /> },
  { id: 5, title: "Support", url: "/support", icon: <Heart className="w-5 h-5" /> },
  { id: 3, title: "Discord", url: "https://discord.gg/uz3jfSkhK", icon: <DiscordIcon className="w-5 h-5" /> },
];

const extLink = (url: string) =>
  url.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

export function VanillaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 100));

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { y: 20, opacity: 0, scale: 0.8 },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const hamburgerVariants: Variants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1.1 },
  };

  // Easter egg: 5 quick clicks on the logo reveals nova.png.
  const eggClicks = useRef(0);
  const eggTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onLogoClick = () => {
    eggClicks.current += 1;
    if (eggTimer.current) clearTimeout(eggTimer.current);
    eggTimer.current = setTimeout(() => (eggClicks.current = 0), 1200);
    if (eggClicks.current >= 5) {
      eggClicks.current = 0;
      window.dispatchEvent(new Event("nova:reveal"));
    }
  };

  return (
    <>
      {/* Full Navbar - visible when not scrolled */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isScrolled ? -100 : 0, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" onClick={onLogoClick} className="flex items-center gap-2 text-2xl font-bold text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/jv_logo.webp" alt="Just Vanilla logo" className="h-8 w-8" />
                <span>Just<span className="text-emerald-400">Vanilla</span></span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {MENU.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => !item.disabled && setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={item.disabled ? undefined : { scale: 1.05 }}
                    whileTap={item.disabled ? undefined : { scale: 0.95 }}
                  >
                    {item.disabled ? (
                      <span
                        aria-disabled="true"
                        className="flex cursor-not-allowed items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-zinc-500"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </span>
                    ) : (
                      <Link
                        href={item.url}
                        {...extLink(item.url)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    )}
                    {!item.disabled && hoveredItem === item.id && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-white/10 rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:text-emerald-400 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Hamburger - visible when scrolled */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.button
          onClick={toggleMenu}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Floating Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Menu Container */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl min-w-[300px]">
                {/* Close Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 text-white hover:text-emerald-400 rounded-full hover:bg-white/10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Menu Items */}
                <div className="space-y-4 mt-8">
                  {MENU.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={item.disabled ? undefined : { scale: 1.05, x: 10 }}
                      whileTap={item.disabled ? undefined : { scale: 0.95 }}
                    >
                      {item.disabled ? (
                        <div
                          aria-disabled="true"
                          className="flex cursor-not-allowed items-center space-x-4 p-4 rounded-xl"
                        >
                          <div className="text-zinc-500">{item.icon}</div>
                          <span className="text-lg font-medium text-zinc-500">
                            {item.title}
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={item.url}
                          {...extLink(item.url)}
                          onClick={toggleMenu}
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                          <motion.div className="text-emerald-400" whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
                            {item.icon}
                          </motion.div>
                          <span className="text-lg font-medium text-white group-hover:text-emerald-400">
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-emerald-300 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
