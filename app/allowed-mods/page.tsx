import type { Metadata } from "next";
import { ModSearch } from "@/components/ui/mod-search";

export const metadata: Metadata = {
  title: "Allowed Mods — JustVanilla",
  description: "Mods and clients permitted (and banned) on JustVanilla.",
};

export default function AllowedModsPage() {
  return (
    <main className="min-h-screen bg-zinc-900 pt-16 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Allowed <span className="text-emerald-400">Mods</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          These are the only client mods permitted on JustVanilla. Anything not
          on this list must be approved by management before use.
        </p>
        <ModSearch />
      </div>
    </main>
  );
}
