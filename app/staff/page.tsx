import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Staff — JustVanilla",
  description: "Meet the JustVanilla staff team.",
};

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScV4pafo0w-rld9ZZkSHgWAq_umVMKDrEeE4vjRFL72CcyRFg/viewform?usp=dialog";

// Avatars live in public/staff/<username>.png; members without one fall back to initials.
const staffDir = path.join(process.cwd(), "public", "staff");
const hasAvatar = (name: string) =>
  fs.existsSync(path.join(staffDir, `${name}.png`));

const STAFF: { group: string; members: { name: string; role: string }[] }[] = [
  {
    group: "Administration",
    members: [
      { name: "SirV8", role: "Owner" },
      { name: "AngelClicker_", role: "JustVanilla Overseer" },
    ],
  },
  {
    group: "Management",
    members: [
      { name: "TheRealistik", role: "Server Manager" },
      { name: "Jellycatzz3", role: "Assistant Server Manager" },
    ],
  },
  {
    group: "Regulators",
    members: [
      { name: "Azeanos", role: "Regulator" },
      { name: "Verifigamer", role: "Regulator" },
    ],
  },
  {
    group: "Helpers",
    members: [
      { name: "johnsondeer", role: "Helper" },
      { name: "_R3spect", role: "Helper" },
      { name: "Chillyinpj09", role: "Helper" },
      { name: "GoalSix", role: "Helper" },
      { name: "Penji_", role: "Helper" },
    ],
  },
];

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-zinc-900 pt-16 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-0">
        <h1 className="mb-8 text-4xl font-bold md:mb-12 lg:text-5xl">
          Our <span className="text-emerald-400">Staff</span>
        </h1>

        {STAFF.map((section) => (
          <div key={section.group} className="mt-6 first:mt-0">
            <h2 className="mb-6 text-lg font-medium">{section.group}</h2>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 py-6 md:grid-cols-4">
              {section.members.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center"
                >
                  {hasAvatar(member.name) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/staff/${member.name}.png`}
                      alt={member.name}
                      className="size-20 rounded-full border border-white/10 object-cover"
                    />
                  ) : (
                    // Fallback: initial in a circle
                    <div className="flex size-20 items-center justify-center rounded-full border border-white/10 bg-emerald-900/40 text-2xl font-bold text-emerald-300">
                      {member.name[0].toUpperCase()}
                    </div>
                  )}
                  <span className="mt-2 block text-sm text-white">
                    {member.name}
                  </span>
                  <span className="block text-xs text-zinc-400">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Apply for staff */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-zinc-800/60 p-8 text-center">
          <h2 className="text-2xl font-bold">Join the team</h2>
          <p className="mx-auto mt-2 max-w-xl text-zinc-300">
            Think you&rsquo;d make a great addition to the JustVanilla staff?
            Applications are open — tell us about yourself.
          </p>
          <div className="mx-auto mt-6 max-w-xs text-left">
            <p className="text-sm font-medium text-white">Requirements</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span> Be at least 15 years
                old
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span> Be an active member of
                the community
              </li>
            </ul>
          </div>
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-emerald-700"
          >
            Apply for Staff
          </a>
        </div>
      </section>
    </main>
  );
}
