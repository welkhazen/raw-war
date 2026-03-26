import { useState } from "react";

interface AvatarIdentityProps {
  avatarLevel: number;
  onLevelChange: (level: number) => void;
}

const LEVEL_COLORS = [
  { from: "#333", to: "#555" },
  { from: "#3a3a3a", to: "#666" },
  { from: "#444", to: "#777" },
  { from: "#4a4a4a", to: "#888" },
  { from: "#555", to: "#999" },
  { from: "#8B7355", to: "#C4A76C" },
  { from: "#9B8365", to: "#D4B77C" },
  { from: "#B8941A", to: "#E8C84A" },
  { from: "#D4A81A", to: "#F1C42D" },
  { from: "#F1C42D", to: "#FFE066" },
];

const features = [
  {
    title: "Anonymous",
    desc: "No real names. Just your username and your chosen identity.",
  },
  {
    title: "Personal",
    desc: "Pick a theme that feels like you and evolve it through participation.",
  },
  {
    title: "Recognizable",
    desc: "Your avatar becomes your symbol across raW — and even your phone icon.",
  },
  {
    title: "Progressive",
    desc: "Start at LVL 1. Grow toward higher forms as you engage more.",
  },
];

export function AvatarIdentity({ avatarLevel, onLevelChange }: AvatarIdentityProps) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const displayLevel = hoveredLevel ?? avatarLevel;
  const colors = LEVEL_COLORS[displayLevel - 1];

  return (
    <section id="avatar" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl tracking-wide text-raw-text sm:text-4xl">
            Your avatar is your identity.
          </h2>
          <p className="mt-4 text-base text-raw-silver/50 max-w-xl mx-auto">
            Choose your theme. Level up over time. Make your avatar your app icon.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Features */}
          <div className="space-y-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-raw-gold/40" />
                <div>
                  <h3 className="font-display text-sm tracking-wide text-raw-text">{f.title}</h3>
                  <p className="mt-1 text-sm text-raw-silver/50">{f.desc}</p>
                </div>
              </div>
            ))}
            <p className="text-sm text-raw-gold/60 italic">
              Earn your look. Don't just pick it.
            </p>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex flex-col items-center">
            <div className="relative mx-auto w-[280px]">
              {/* Phone frame */}
              <div className="rounded-[2.5rem] border-2 border-raw-border/60 bg-raw-black p-3 shadow-2xl">
                {/* Notch */}
                <div className="mx-auto mb-3 h-6 w-24 rounded-full bg-raw-surface" />
                {/* Screen */}
                <div className="rounded-[2rem] bg-raw-surface/80 p-6 min-h-[360px] flex flex-col items-center justify-center">
                  {/* Avatar preview */}
                  <div
                    className="h-28 w-28 rounded-3xl transition-all duration-500 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      boxShadow: displayLevel >= 8 ? `0 0 30px ${colors.to}40` : "none",
                    }}
                  >
                    <span className="font-display text-3xl text-white/80">W</span>
                  </div>
                  <p className="mt-4 font-display text-xs tracking-wider text-raw-silver/60">
                    LVL {displayLevel}
                  </p>

                  {/* Mini app icon preview */}
                  <div className="mt-8 flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-xl transition-all duration-500 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      }}
                    >
                      <span className="font-display text-[10px] text-white/80">raW</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-raw-silver/50">Your app icon</p>
                      <p className="text-[10px] text-raw-silver/30">Updates with your level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level selector */}
            <div className="mt-8 flex items-center gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onLevelChange(lvl)}
                  onMouseEnter={() => setHoveredLevel(lvl)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`h-9 w-9 rounded-lg text-[10px] font-bold transition-all ${
                    lvl === avatarLevel
                      ? "bg-raw-gold text-raw-black scale-110"
                      : "bg-raw-surface/60 text-raw-silver/40 hover:bg-raw-surface hover:text-raw-silver/70"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
