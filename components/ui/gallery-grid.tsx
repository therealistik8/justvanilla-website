"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryGrid({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelected(src)}
            className="relative h-56 cursor-pointer overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={src}
              alt=""
              fill
              // Grid is 1 col, 2 at sm, 3 at lg inside a max-w-5xl container.
              sizes="(min-width: 1024px) 341px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox — click anywhere to close */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-4 bg-black/90 p-4"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={selected}
              alt=""
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm text-zinc-400">Click anywhere to close.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
