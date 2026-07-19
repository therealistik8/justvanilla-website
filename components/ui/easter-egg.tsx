"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Revealed by clicking the logo 5× (dispatches "nova:reveal").
    const reveal = () => setOpen(true);
    window.addEventListener("nova:reveal", reveal);
    return () => window.removeEventListener("nova:reveal", reveal);
  }, []);

  if (!open) return null;

  return (
    <motion.div
      onClick={() => setOpen(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden bg-black/90"
    >
      {/* Spinning vortex backdrop. The rotating layer is a sharp gradient —
          a transform-only (GPU-composited) animation, smooth on every browser.
          Softness comes from a STATIC vignette rendered once, not a per-frame
          blur (animating blur stutters badly on Firefox). */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          className="h-[160vmax] w-[160vmax] opacity-30 [will-change:transform]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #10b981 15%, transparent 35%, #34d399 55%, transparent 75%, #10b981 95%, transparent 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.85) 70%)",
          }}
        />
      </div>

      {/* Nova spirals in from the center of the vortex */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/nova.png"
        alt="Nova"
        initial={{ scale: 0, rotate: -900, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 55, damping: 13 }}
        className="relative z-10 max-h-[80vh] max-w-[85vw] object-contain drop-shadow-[0_0_50px_rgba(16,185,129,0.6)]"
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="relative z-10 italic text-emerald-400"
      >
        Dim by comparison — everything, to Nova.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="relative z-10 text-lg font-semibold tracking-wide text-emerald-300"
      >
        Site by TheRealistik
      </motion.p>
      <p className="relative z-10 text-sm text-zinc-400">
        Click anywhere to close.
      </p>
    </motion.div>
  );
}
