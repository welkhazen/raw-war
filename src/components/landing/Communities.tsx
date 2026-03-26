interface CommunityCardProps {
  title: string;
  description: string;
  badge: string;
}

function CommunityCard({ title, description, badge }: CommunityCardProps) {
  return (
    <div className="group rounded-2xl border border-raw-border/50 bg-raw-surface/50 p-8 transition-all hover:border-raw-gold/20 hover:bg-raw-surface">
      <div className="mb-5 inline-block rounded-full border border-raw-gold/20 bg-raw-gold/5 px-3 py-1">
        <span className="text-[10px] font-medium tracking-wider text-raw-gold/70 uppercase">
          {badge}
        </span>
      </div>
      <h3 className="font-display text-base tracking-wide text-raw-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-raw-silver/50">{description}</p>
    </div>
  );
}

const communities = [
  {
    title: "Late Night Talks",
    description:
      "For people who think deeply, feel deeply, and want honest conversation when the world gets quiet.",
    badge: "Founding Community",
  },
  {
    title: "Self-Improvement Circle",
    description:
      "For discipline, accountability, momentum, and becoming stronger with others who are trying too.",
    badge: "Opening First",
  },
  {
    title: "Mental Wellness",
    description:
      "For grounded reflection, support, and conversations that feel safe, real, and useful.",
    badge: "Early Access",
  },
];

interface CommunitiesProps {
  onSignupClick: () => void;
}

export function Communities({ onSignupClick }: CommunitiesProps) {
  return (
    <section id="communities" className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl tracking-wide text-raw-text sm:text-4xl">
            24/7 communities for real talk.
          </h2>
          <p className="mt-4 text-base text-raw-silver/50 max-w-xl mx-auto">
            Start with 3 founding categories. Smaller micro-communities unlock as raW grows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {communities.map((c) => (
            <CommunityCard key={c.title} {...c} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onSignupClick}
            className="rounded-full bg-raw-gold px-8 py-3.5 text-sm font-bold text-raw-black transition-all hover:bg-raw-gold/90 hover:shadow-lg hover:shadow-raw-gold/20"
          >
            Join the Founding Community
          </button>
        </div>

        {/* Future community map placeholder */}
        <div className="mt-16 rounded-2xl border border-raw-border/30 bg-raw-surface/30 p-12 text-center">
          <div className="mx-auto max-w-xs">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full bg-raw-gold/20 animate-subtle-pulse"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </div>
            <p className="font-display text-[10px] tracking-[0.3em] uppercase text-raw-silver/25">
              Live Community Map — Coming Soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
