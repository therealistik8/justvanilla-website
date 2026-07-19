"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { DiscordIcon } from "./scroll-navigation-menu";

const SERVER_IP = "mc.justvanilla.net";
const DISCORD_URL = "https://discord.gg/uz3jfSkhK";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const copyIp = () => {
    navigator.clipboard?.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
      {/* subtle emerald glow behind the CTA */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          Your world is waiting
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          Jump in, claim your corner of the map, and build something that lasts.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={copyIp}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-8 py-4 text-lg font-bold tracking-wide text-white transition-colors hover:bg-emerald-700"
          >
            {copied ? (
              <>
                Copied! <Check className="h-5 w-5" />
              </>
            ) : (
              <>
                {SERVER_IP} <Copy className="h-5 w-5" />
              </>
            )}
          </button>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#5865F2] px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#4752c4]"
          >
            <DiscordIcon className="h-5 w-5" /> Join Discord
          </a>
        </div>
        <p className="mt-4 text-sm text-zinc-400">
          Bedrock players — port{" "}
          <span className="font-mono text-emerald-300">19132</span>
        </p>
      </div>
    </section>
  );
}
