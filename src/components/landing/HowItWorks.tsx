const steps = [
  {
    number: "01",
    title: "Answer anonymously",
    description: "Start with a few honest questions. See where you stand instantly.",
  },
  {
    number: "02",
    title: "Join the right community",
    description: "Enter 24/7 spaces built around real needs, not public image.",
  },
  {
    number: "03",
    title: "Build your identity",
    description: "Choose your avatar, level up over time, and make raW feel like yours.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-raw-border/50 bg-raw-surface/50 p-8 transition-all hover:border-raw-gold/20 hover:bg-raw-surface"
            >
              <span className="font-display text-[10px] tracking-[0.3em] text-raw-gold/50">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-base tracking-wide text-raw-text">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-raw-silver/50">
                {step.description}
              </p>

              {/* Connector line (between cards) */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-raw-border to-transparent md:block" />
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-raw-silver/40">
          The more you answer, the better raW understands you.
        </p>
      </div>
    </section>
  );
}
