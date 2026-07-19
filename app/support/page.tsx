import type { Metadata } from "next";
import { Heart, Server, Code, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Support — JustVanilla",
  description: "Support JustVanilla and help keep the server running.",
};

const USES = [
  { icon: Server, title: "Hosting", body: "Keeping the server online 24/7 with the performance a busy world needs." },
  { icon: Code, title: "Development", body: "Hiring developers to improve server performance and keep everything up to date." },
  { icon: Users, title: "Upkeep", body: "Domains, tools, and the day-to-day costs of running the community." },
];

// TODO: point this at the web shop once it's live.
const SHOP_URL = "#";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-zinc-900 pt-16 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="flex items-center gap-3 text-4xl font-extrabold md:text-5xl">
          <Heart className="h-9 w-9 text-emerald-400" />
          Support <span className="text-emerald-400">JustVanilla</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          JustVanilla runs on the support of its players. Donations help keep the
          server online — and as a thank-you, supporters unlock exclusive
          cosmetics to show off in-game.
        </p>

        {/* Fair-play note */}
        <p className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-zinc-200">
          Cosmetics only — donation rewards are{" "}
          <span className="font-semibold text-emerald-300">purely visual</span>{" "}
          and give no gameplay advantage. The world stays vanilla and fair for
          everyone, no pay-to-win.
        </p>

        {/* Where it goes */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {USES.map((u) => (
            <div
              key={u.title}
              className="rounded-2xl border border-white/10 bg-zinc-800/60 p-6"
            >
              <u.icon className="h-7 w-7 text-emerald-400" />
              <h2 className="mt-3 text-lg font-semibold text-white">{u.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{u.body}</p>
            </div>
          ))}
        </div>

        {/* Donate — links out to the web shop */}
        <div className="mt-12 text-center">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-emerald-700"
          >
            <Heart className="h-5 w-5" /> Donate
          </a>
        </div>
      </div>
    </main>
  );
}
