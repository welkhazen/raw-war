import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Boxes } from "@/components/ui/background-boxes";
import { Globe3D } from "@/components/ui/3d-globe";
import type { GlobeMarker } from "@/components/ui/3d-globe";

const globeMarkers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
  { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio" },
  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
];

interface HeroProps {
  onSignupClick: () => void;
}

export function Hero({ onSignupClick }: HeroProps) {
  const words = [
    { text: "Find", className: "text-raw-text" },
    { text: "your", className: "text-raw-text" },
    { text: "people.", className: "text-raw-gold" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Boxes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-raw-black via-raw-black to-raw-surface/30 z-[1]" />
        <Boxes className="opacity-30" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-raw-gold/[0.03] blur-[120px] z-[1]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="animate-fade-in-up">
            <p className="mb-6 font-display text-[11px] tracking-[0.35em] uppercase text-raw-gold/70">
              Anonymous &bull; Community-First &bull; Identity-Driven
            </p>

            <TypewriterEffect
              words={words}
              className="!text-left !text-4xl sm:!text-5xl lg:!text-[3.4rem] !font-display !tracking-wide !leading-tight"
            />

            <p className="mt-4 font-display text-xl tracking-wide text-metallic sm:text-2xl lg:text-3xl">
              Grow behind your avatar.
            </p>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-raw-silver/60">
              Answer a few honest questions, join the right 24/7 communities,
              and build an identity that feels like yours — without using your real name.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onSignupClick}
                className="rounded-full bg-raw-gold px-8 py-3.5 text-sm font-bold text-raw-black transition-all hover:bg-raw-gold/90 hover:shadow-lg hover:shadow-raw-gold/20"
              >
                Join Free
              </button>
              <a
                href="#communities"
                className="rounded-full border border-raw-border px-8 py-3.5 text-sm font-medium text-raw-silver/80 transition-all hover:border-raw-silver/30 hover:text-raw-text"
              >
                Explore the 3 Founding Communities
              </a>
            </div>

            <p className="mt-5 text-xs text-raw-silver/40">
              Username + password only.
            </p>
          </div>

          {/* Right: 3D Globe */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md h-[400px]">
              <Globe3D
                className="h-full w-full"
                markers={globeMarkers}
                config={{
                  atmosphereColor: "#F1C42D",
                  atmosphereIntensity: 20,
                  showAtmosphere: true,
                  bumpScale: 5,
                  autoRotateSpeed: 0.3,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
