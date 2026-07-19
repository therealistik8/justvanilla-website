import type { ReactNode } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const RULES: { title: string; body: ReactNode }[] = [
  { title: "Be Respectful", body: "Racism, sexism, homophobia, hate speech, or extreme harassment is not allowed. Keep the community welcoming for everyone." },
  {
    title: "No Cheating",
    body: (
      <>
        Hacking, non-fair-play texture packs (such as xray) and exploits (such
        as item duping) are not allowed. See{" "}
        <Link
          href="/allowed-mods"
          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
        >
          Allowed Mods
        </Link>{" "}
        for the list of permitted mods and clients.
      </>
    ),
  },
  { title: "No Duping or Exploits", body: "Item duplication, game-breaking bugs, or exploiting glitches is not allowed." },
  { title: "Griefing & Stealing", body: "Griefing and stealing is allowed, but griefing the map for the sake of griefing is not allowed. Random lava casts, holes or similar things, and withers at world spawn are not allowed." },
  { title: "PvP", body: "PvP without consent is allowed, but portal trapping, or intentionally preventing players from joining or leaving the server is not allowed." },
  { title: "Chat Rules", body: "Spamming, advertising, flooding chat, or excessive messaging is not allowed." },
  { title: "Content Rules", body: "Sharing illegal content, NSFW content, or anything that violates Minecraft community standards is not allowed." },
  { title: "Server Stability", body: "Anything designed to intentionally lag, crash, or harm the server is not allowed." },
  { title: "Seed Tools", body: "Using the world seed with external tools to locate structures, bases, or ores is not allowed. JustVanilla uses fake seed implementations to prevent exploiters." },
];

export function RulesSection() {
  return (
    <section id="rules" className="scroll-mt-20 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-4xl font-extrabold md:text-5xl">
          Server <span className="text-emerald-400">Rules</span>
        </h2>
        <p className="mt-4 text-lg text-zinc-300">
          Welcome to JustVanilla! Please follow the rules below to keep the
          experience enjoyable for everyone.
        </p>

        {/* Rules */}
        <div className="mt-10 space-y-4">
          {RULES.map((rule) => (
            <div
              key={rule.title}
              className="scroll-mt-24 rounded-2xl border border-white/10 bg-zinc-800/60 p-6"
            >
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <Star className="h-5 w-5 shrink-0 text-emerald-400" />
                {rule.title}
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-300">{rule.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
