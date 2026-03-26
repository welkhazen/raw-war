import type { Poll } from "@/store/useRawStore";
import { Lock } from "lucide-react";

interface PollSectionProps {
  polls: Poll[];
  votedPolls: Set<string>;
  isLoggedIn: boolean;
  freeVotesUsed: number;
  onVote: (pollId: string, optionId: string) => void;
  onSignupClick: () => void;
}

function PollCard({
  poll,
  hasVoted,
  isLocked,
  onVote,
  onUnlock,
}: {
  poll: Poll;
  hasVoted: boolean;
  isLocked: boolean;
  onVote: (optionId: string) => void;
  onUnlock: () => void;
}) {
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  if (isLocked) {
    return (
      <div className="relative rounded-2xl border border-raw-border/50 bg-raw-surface/50 p-8 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm bg-raw-black/60 flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="mx-auto mb-3 h-6 w-6 text-raw-gold/60" />
            <p className="font-display text-xs tracking-wider text-raw-silver/60">Sign up to unlock</p>
            <button
              onClick={onUnlock}
              className="mt-4 rounded-full bg-raw-gold px-6 py-2 text-xs font-bold text-raw-black transition-all hover:bg-raw-gold/90"
            >
              Create Account
            </button>
          </div>
        </div>
        <p className="font-display text-sm tracking-wide text-raw-text/30">{poll.question}</p>
        <div className="mt-5 space-y-3">
          {poll.options.map((option) => (
            <div key={option.id} className="h-11 rounded-xl bg-raw-border/30" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-raw-border/50 bg-raw-surface/50 p-8 transition-all hover:border-raw-gold/10">
      <p className="font-display text-sm tracking-wide text-raw-text">{poll.question}</p>
      <div className="mt-5 space-y-3">
        {poll.options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          return (
            <button
              key={option.id}
              onClick={() => !hasVoted && onVote(option.id)}
              disabled={hasVoted}
              className={`relative w-full overflow-hidden rounded-xl border text-left transition-all ${
                hasVoted
                  ? "border-raw-border/30 bg-raw-black/50 cursor-default"
                  : "border-raw-border/50 bg-raw-black/30 hover:border-raw-gold/20 hover:bg-raw-surface/50 cursor-pointer"
              }`}
            >
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-raw-gold/10 animate-bar-fill"
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center justify-between px-5 py-3">
                <span className="text-sm text-raw-silver/80">{option.text}</span>
                {hasVoted && (
                  <span className="text-xs font-medium text-raw-gold/70">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {hasVoted && (
        <p className="mt-4 text-[11px] text-raw-silver/30">
          {totalVotes.toLocaleString()} anonymous responses
        </p>
      )}
    </div>
  );
}

export function PollSection({
  polls,
  votedPolls,
  isLoggedIn,
  freeVotesUsed,
  onVote,
  onSignupClick,
}: PollSectionProps) {
  return (
    <section id="polls" className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl tracking-wide text-raw-text sm:text-4xl">
            Start with a question.
          </h2>
          <p className="mt-4 text-base text-raw-silver/50 max-w-xl mx-auto">
            Answer anonymously and see live results instantly.
            Sign up to answer more, comment, and unlock the full experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              hasVoted={votedPolls.has(poll.id)}
              isLocked={poll.locked && !isLoggedIn}
              onVote={(optionId) => onVote(poll.id, optionId)}
              onUnlock={onSignupClick}
            />
          ))}
        </div>

        {/* Signup gate */}
        {!isLoggedIn && freeVotesUsed >= 2 && (
          <div className="mt-10 rounded-2xl border border-raw-gold/20 bg-gradient-to-br from-raw-surface to-raw-black p-10 text-center glow-gold-sm">
            <h3 className="font-display text-lg tracking-wide text-raw-text">
              Want to keep going?
            </h3>
            <p className="mt-3 text-sm text-raw-silver/50">
              Create your anonymous account to answer more questions, comment, and enter communities.
            </p>
            <button
              onClick={onSignupClick}
              className="mt-6 rounded-full bg-raw-gold px-8 py-3 text-sm font-bold text-raw-black transition-all hover:bg-raw-gold/90 hover:shadow-lg hover:shadow-raw-gold/20"
            >
              Enter raW
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
