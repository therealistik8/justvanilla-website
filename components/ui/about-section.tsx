import { Sprout, Users, ShieldCheck, Gamepad2 } from "lucide-react";

const FEATURES = [
  {
    icon: Sprout,
    title: "Pure Vanilla",
    body: "No economy plugins, no custom items, no ranks for sale. Every player starts equal and earns everything in-game.",
  },
  {
    icon: Users,
    title: "Survival & Community",
    body: "A long-lived world where towns, alliances, and rivalries grow naturally. Build with friends or carve your own path.",
  },
  {
    icon: ShieldCheck,
    title: "Fair Play, Real Stakes",
    body: "Griefing and PvP are part of the world — but exploits, duping, and hacked clients are not. The playing field stays honest.",
  },
  {
    icon: Gamepad2,
    title: "Compatibility",
    body: "Join on any version up to 26.1.2. Hop on from Java or Bedrock and play with everyone on the same world.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-center text-4xl font-extrabold md:text-5xl">
          About <span className="text-emerald-400">JustVanilla</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-300">
          JustVanilla is Minecraft the way it was meant to be played — the pure
          survival experience, shared with a community that actually builds,
          explores, and fights together.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-zinc-800/60 p-6"
            >
              <f.icon className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-zinc-300">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
