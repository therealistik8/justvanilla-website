import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { GalleryGrid } from "@/components/ui/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery — JustVanilla",
  description: "Builds and moments from around the JustVanilla world.",
};

// List every image in public/gallery — drop files in and they appear here.
function galleryImages() {
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
    .sort()
    .map((f) => `/gallery/${f}`);
}

export default function GalleryPage() {
  const IMAGES = galleryImages();
  return (
    <main className="min-h-screen bg-zinc-900 pt-16 text-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Server <span className="text-emerald-400">Gallery</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          A look at builds and moments from around the JustVanilla world.
        </p>

        {IMAGES.length === 0 && (
          <p className="mt-10 text-zinc-400">No images yet — check back soon.</p>
        )}

        <GalleryGrid images={IMAGES} />
      </div>
    </main>
  );
}
