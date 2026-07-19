import fs from "node:fs";
import path from "node:path";
import { VanillaHero } from "@/components/ui/progressive-hero";
import { AboutSection } from "@/components/ui/about-section";
import { Footer } from "@/components/ui/footer";

// Slideshow images from public/hero-images, in filename order (1.png, 2.png, …).
function heroImages() {
  const dir = path.join(process.cwd(), "public", "hero-images");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/hero-images/${f}`);
}

export default function Home() {
  return (
    <>
      <VanillaHero images={heroImages()} />
      <div className="bg-zinc-900 text-white">
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}
