"use client";

import { useState } from "react";
import { Check, X, Search } from "lucide-react";

const ALLOWED = [
  "Optifine",
  "LabyMod",
  "Shaders Mod",
  "Schematica (printer function disabled)",
  "5Zig",
  "bspkrs",
  "ArmorHUD",
  "PotionHUD",
  "Kohi TCPNoDelay",
  "DirectionHUD",
  "ToggleSneak",
  "Badlion Client",
  "Lighting Mods",
  "CPS Mod",
  "font/music changes",
  "Minimaps (strictly NO entity tracking)",
  "Tabby Chat",
  "NEI/TMI/JEI",
  "Sodium",
  "OkZoomer",
  "DynamicFPS",
  "Canvas Registerer",
  "MotioNO",
  "CBT",
  "DarkLoadingScreen",
  "Console Clients (strictly for AFK use only)",
  "Shield fixes",
  "Shield color and Health indicators",
];

const DISALLOWED = [
  "Hacked Clients (e.g., Meteor)",
  "BetterPvP",
  "Damage Indicators",
  "Macros/Scripts",
  "Better Sprint",
  "Ghost Clients",
  "Xray Mods/Texture Packs",
  "Chest Finders",
  "Freecam mod",
  "World Downloader Mods",
  "CheatUtils",
  "Schematica Printer",
  "Any other PvP-enhancing modifications or unlisted clients not explicitly approved by management",
];

function ModList({
  items,
  allowed,
}: {
  items: string[];
  allowed: boolean;
}) {
  const Icon = allowed ? Check : X;
  const color = allowed ? "text-emerald-400" : "text-red-400";
  return (
    <>
      <h2 className={`mt-12 flex items-center gap-2 text-2xl font-semibold ${color}`}>
        <Icon className="h-6 w-6" /> {allowed ? "Allowed" : "Disallowed"}
      </h2>
      {items.length === 0 ? (
        <p className="mt-4 text-zinc-400">No matches.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {items.map((mod) => (
            <li
              key={mod}
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-zinc-800/60 px-3 py-2 text-zinc-200"
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
              {mod}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function ModSearch() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const allowed = ALLOWED.filter((m) => m.toLowerCase().includes(q));
  const disallowed = DISALLOWED.filter((m) => m.toLowerCase().includes(q));
  const noMatches = q && allowed.length === 0 && disallowed.length === 0;

  return (
    <div>
      {/* Search */}
      <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-800/60 px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a mod…"
          className="w-full bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
        />
      </div>

      {noMatches ? (
        <p className="mt-8 rounded-xl border border-white/10 bg-zinc-800/60 p-6 text-zinc-300">
          &ldquo;{query.trim()}&rdquo; isn&rsquo;t on either list. Anything not
          explicitly allowed must be approved by management before use.
        </p>
      ) : (
        <>
          <ModList items={allowed} allowed />
          <ModList items={disallowed} allowed={false} />
        </>
      )}
    </div>
  );
}
