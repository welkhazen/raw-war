import { useState } from "react";
import {
  Trophy,
  Target,
  MessageCircle,
  Flame,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";

interface DashboardProfileProps {
  username: string;
  avatarLevel: number;
  onLevelChange: (level: number) => void;
  pollsAnswered: number;
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

const stats = [
  { icon: Target, label: "Polls Answered", value: "12" },
  { icon: MessageCircle, label: "Messages Sent", value: "47" },
  { icon: Flame, label: "Day Streak", value: "7" },
  { icon: TrendingUp, label: "XP Earned", value: "1,850" },
  { icon: Calendar, label: "Member Since", value: "Mar 2026" },
  { icon: Award, label: "Badges", value: "3" },
];

const badges = [
  { name: "Founding Member", desc: "Joined during the founding era", earned: true },
  { name: "First Vote", desc: "Answered your first poll", earned: true },
  { name: "Week Warrior", desc: "7-day activity streak", earned: true },
  { name: "Voice of Reason", desc: "50 community messages", earned: false },
  { name: "Gold Standard", desc: "Reach Level 10", earned: false },
];

export function DashboardProfile({
  username,
  avatarLevel,
  onLevelChange,
  pollsAnswered,
}: DashboardProfileProps) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const displayLevel = hoveredLevel ?? avatarLevel;
  const colors = LEVEL_COLORS[displayLevel - 1];
  const xpForNext = displayLevel * 500;
  const currentXp = 1850;
  const xpPct = Math.min(Math.round((currentXp / xpForNext) * 100), 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl tracking-wide text-raw-text">Profile</h1>
        <p className="mt-2 text-sm text-raw-silver/40">
          Your anonymous identity. Your progress. Your growth.
        </p>
      </div>

      {/* Avatar + Identity card */}
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2 rounded-2xl border border-raw-border/40 bg-raw-surface/40 p-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <div
            className="h-24 w-24 rounded-3xl flex items-center justify-center transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
              boxShadow: displayLevel >= 8 ? `0 0 30px ${colors.to}40` : "none",
            }}
          >
            <span className="font-display text-3xl text-white/80">W</span>
          </div>

          <p className="mt-4 font-display text-lg tracking-wide text-raw-text">{username}</p>
          <p className="text-xs text-raw-gold/60 mt-1">Level {displayLevel}</p>

          {/* XP Progress */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between text-[10px] mb-1.5">
              <span className="text-raw-silver/30">XP to Level {Math.min(displayLevel + 1, 10)}</span>
              <span className="text-raw-gold/60">{currentXp} / {xpForNext}</span>
            </div>
            <div className="h-1.5 rounded-full bg-raw-border/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-raw-gold/60 to-raw-gold transition-all duration-500"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>

          {/* Level selector */}
          <div className="mt-6 flex items-center gap-1.5 flex-wrap justify-center">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onLevelChange(lvl)}
                onMouseEnter={() => setHoveredLevel(lvl)}
                onMouseLeave={() => setHoveredLevel(null)}
                className={`h-7 w-7 rounded-lg text-[9px] font-bold transition-all ${
                  lvl === avatarLevel
                    ? "bg-raw-gold text-raw-black scale-110"
                    : "bg-raw-surface/60 text-raw-silver/30 hover:bg-raw-surface hover:text-raw-silver/60"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Mini app icon preview */}
          <div className="mt-6 flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
            >
              <span className="font-display text-[8px] text-white/80">raW</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-raw-silver/40">Your app icon</p>
              <p className="text-[10px] text-raw-silver/25">Updates with your level</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="lg:col-span-3 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-raw-border/30 bg-raw-surface/30 p-4 text-center"
                >
                  <Icon className="h-4 w-4 text-raw-gold/40 mx-auto mb-2" />
                  <p className="text-lg font-bold text-raw-text">{stat.label === "Polls Answered" ? pollsAnswered : stat.value}</p>
                  <p className="text-[9px] uppercase tracking-wider text-raw-silver/30 mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Badges */}
          <div className="rounded-2xl border border-raw-border/30 bg-raw-surface/30 p-5">
            <h3 className="font-display text-sm tracking-wide text-raw-text mb-4">Badges</h3>
            <div className="space-y-2.5">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
                    badge.earned
                      ? "border-raw-gold/15 bg-raw-gold/[0.03]"
                      : "border-raw-border/15 bg-raw-black/20 opacity-40"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    badge.earned ? "bg-raw-gold/10" : "bg-raw-surface/50"
                  }`}>
                    <Trophy className={`h-4 w-4 ${badge.earned ? "text-raw-gold/60" : "text-raw-silver/20"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-medium ${badge.earned ? "text-raw-text" : "text-raw-silver/30"}`}>
                      {badge.name}
                    </p>
                    <p className="text-[10px] text-raw-silver/25">{badge.desc}</p>
                  </div>
                  {badge.earned && (
                    <span className="ml-auto text-[9px] text-raw-gold/50 font-medium shrink-0">Earned</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
