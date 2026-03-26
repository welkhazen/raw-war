const cards = [
  {
    title: "Less pressure",
    description: "People answer more honestly when they are not performing.",
  },
  {
    title: "Better communities",
    description: "Real connection starts when people stop managing appearances.",
  },
  {
    title: "Stronger signals",
    description: "Honest participation creates better recommendations over time.",
  },
];

export function WhyAnonymity() {
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center font-display text-2xl tracking-wide text-raw-text sm:text-3xl">
          No real names. Better honesty. Better matching.
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-raw-border/40 bg-raw-surface/30 p-7 text-center transition-all hover:border-raw-gold/15"
            >
              <h3 className="font-display text-sm tracking-wide text-raw-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-raw-silver/45">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
