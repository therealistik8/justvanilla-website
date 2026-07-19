import type { Metadata } from "next";
import { RulesSection } from "@/components/ui/rules-section";

export const metadata: Metadata = {
  title: "Rules — JustVanilla",
  description: "Server rules and connection info for JustVanilla.",
};

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-zinc-900 pt-16 text-white">
      <RulesSection />
    </main>
  );
}
