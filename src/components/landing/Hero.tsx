interface HeroProps {
  onSignupClick: () => void;
}

export function Hero({ onSignupClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-raw-black via-raw-black to-raw-surface/30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-raw-gold/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="animate-fade-in-up">
            <p className="mb-6 font-display text-[11px] tracking-[0.35em] uppercase text-raw-gold/70">
              Anonymous &bull; Community-First &bull; Identity-Driven
            </p>

            <h1 className="font-display text-4xl leading-tight tracking-wide text-raw-text sm:text-5xl lg:text-[3.4rem]">
              Find your people.{" "}
              <span className="text-metallic">Grow behind your avatar.</span>
            </h1>

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

          {/* Right: Visual placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md rounded-3xl border border-raw-border/50 bg-gradient-to-br from-raw-surface to-raw-black/50 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-[20px] border border-raw-border/30 bg-raw-black/60">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-raw-gold/20 to-raw-gold/5 flex items-center justify-center">
                    <span className="font-display text-2xl text-raw-gold/60">W</span>
                  </div>
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-raw-silver/30">
                    3D Visual Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
