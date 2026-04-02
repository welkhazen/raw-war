import { useState } from "react";
import { AvatarFigure, getAvatarTheme } from "@/components/ui/avatar-figure";
import { PhoneMockup } from "@/components/ui/phone-mockup";

interface AvatarIdentityProps {
  avatarLevel: number;
  onLevelChange: (level: number) => void;
}

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
  const theme = getAvatarTheme(displayLevel);

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

          {/* Right: Avatar display + Phone mockup */}
          <div className="flex flex-col items-center">
            {/* Large selected avatar */}
            <div className="mb-2">
              <AvatarFigure level={displayLevel} size="xl" selected />
            </div>
            <p className="font-display text-sm tracking-[0.2em] uppercase text-raw-text mt-1">
              Level {displayLevel}
            </p>
            <p className="text-xs text-raw-silver/40 mt-0.5">{theme.name}</p>

            {/* Level selector row */}
            <div className="mt-6 flex items-center gap-2 flex-wrap justify-center">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onLevelChange(lvl)}
                  onMouseEnter={() => setHoveredLevel(lvl)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <AvatarFigure
                    level={lvl}
                    size="sm"
                    selected={lvl === avatarLevel}
                  />
                  <span className={`text-[9px] font-bold tracking-wider transition-colors ${
                    lvl === avatarLevel
                      ? "text-raw-gold"
                      : "text-raw-silver/30 group-hover:text-raw-silver/60"
                  }`}>
                    LVL {lvl}
                  </span>
                </button>
              ))}
            </div>

            {/* Phone mockup showing avatar as app icon */}
            <div className="mt-10">
              <p className="text-center font-display text-[10px] tracking-[0.3em] uppercase text-raw-silver/30 mb-4">
                Your app icon
              </p>
              <PhoneMockup>
                {/* Fake home screen */}
                <div className="bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0] px-5 py-4 min-h-[480px]">
                  {/* App grid */}
                  <div className="grid grid-cols-4 gap-x-4 gap-y-5">
                    {/* Row 1: placeholder icons */}
                    <AppIcon color="#32D74B" label="FaceTime" />
                    <AppIcon color="#FF3B30" label="Calendar" />
                    <AppIcon color="#FF9500" label="Photos" />
                    <AppIcon color="#5856D6" label="Camera" />

                    {/* Row 2 */}
                    <AppIcon color="#000000" label="Clock" />
                    <AppIcon color="#34C759" label="Maps" />
                    <AppIcon color="#5AC8FA" label="Weather" />
                    <AppIcon color="#FFCC00" label="Notes" />

                    {/* Row 3: raW app + others */}
                    <AppIcon color="#FF2D55" label="Music" />
                    <AppIcon color="#AF52DE" label="Podcasts" />
                    {/* raW avatar icon - THE MAIN FEATURE */}
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="h-[52px] w-[52px] rounded-[12px] flex items-center justify-center shadow-md overflow-hidden"
                        style={{ background: theme.bg }}
                      >
                        <AvatarFigure level={displayLevel} size="sm" />
                      </div>
                      <span className="text-[8px] text-[#333] font-medium">raW</span>
                    </div>
                    <AppIcon color="#007AFF" label="Safari" />
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppIcon({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="h-[52px] w-[52px] rounded-[12px] shadow-sm"
        style={{ background: color, opacity: 0.7 }}
      />
      <span className="text-[8px] text-[#333] font-medium">{label}</span>
    </div>
  );
}
