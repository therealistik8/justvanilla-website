"use client";
// Button component and utilities inlined for local use
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";

// Utility to merge Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button style variants (vanilla / emerald theme)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-700",
        secondary:
          "bg-black/50 text-emerald-100 border border-emerald-500/40 backdrop-blur hover:bg-black/70",
        outline:
          "border border-white/30 bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-12 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const SERVER_IP = "mc.justvanilla.net";

// VanillaHero: hero section for the Just Vanilla Minecraft server.
// `images` is the ordered list of slideshow image paths (from public/hero-images).
function VanillaHero({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);
  // Enable crossfade only after mount so the first paint doesn't fade every image in.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const next = () => setCurrent((i) => (i + 1) % images.length);
  const prev = () =>
    setCurrent((i) => (i - 1 + images.length) % images.length);

  // Advance every 8s. Keyed on `current` so clicking an arrow resets the timer.
  useEffect(() => {
    const id = setTimeout(next, 8000);
    return () => clearTimeout(id);
  }, [current]);

  const copyIp = () => {
    navigator.clipboard?.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden font-sans">
      {/* Crossfading background slideshow — inline opacity so it's correct before CSS loads */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === current ? 1 : 0,
            transition: mounted ? "opacity 1s ease-in-out" : "none",
          }}
        />
      ))}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      {/* Slideshow arrows — full-height side zones so they're easy to hit */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={prev}
        className="group absolute left-0 top-0 z-30 flex h-full w-16 md:w-24 cursor-pointer items-center justify-center focus-visible:outline-none"
      >
        <span className="rounded-full bg-black/40 p-2 text-white backdrop-blur transition-colors group-hover:bg-black/70 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500">
          <ChevronLeft className="h-6 w-6" />
        </span>
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={next}
        className="group absolute right-0 top-0 z-30 flex h-full w-16 md:w-24 cursor-pointer items-center justify-center focus-visible:outline-none"
      >
        <span className="rounded-full bg-black/40 p-2 text-white backdrop-blur transition-colors group-hover:bg-black/70 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500">
          <ChevronRight className="h-6 w-6" />
        </span>
      </button>
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col w-full px-4">
          {/* Headline and description */}
          <div className="flex gap-4 flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-7xl max-w-2xl tracking-tight text-center font-extrabold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
            >
              <span className="text-emerald-400">Vanilla Minecraft.</span>{" "}
              <span className="text-white">Nothing more.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-lg md:text-xl leading-relaxed tracking-tight text-zinc-200 max-w-2xl text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              <span className="font-semibold text-emerald-400">JustVanilla</span>{" "}
              is Minecraft the way it was meant to be played — no economy
              plugins, no gimmicks, no pay-to-win, no cheats. Just you, the
              world, and the community you build with.
            </motion.p>
          </div>
          {/* Call-to-action */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-2 items-center"
          >
            <Button size="lg" onClick={copyIp} className="gap-3">
              {copied ? (
                <>
                  Copied! <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  {SERVER_IP} <Copy className="w-4 h-4" />
                </>
              )}
            </Button>
            <p className="text-sm text-zinc-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Bedrock players — port{" "}
              <span className="font-mono text-emerald-300">19132</span>
            </p>
          </motion.div>
        </div>
      </div>
      {/* Fade the bottom of the hero into the About section (zinc-900). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-b from-transparent to-zinc-900" />
    </section>
  );
}

export { VanillaHero };
