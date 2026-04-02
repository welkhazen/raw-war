import { useState } from "react";
import type { Poll } from "@/store/useRawStore";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  Send,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

interface PollSectionProps {
  polls: Poll[];
  votedPolls: Set<string>;
  isLoggedIn: boolean;
  freeVotesUsed: number;
  onVote: (pollId: string, optionId: string) => void;
  onSignupClick: () => void;
}

// Mock comments for polls
const mockComments: Record<string, { user: string; text: string; time: string; likes: number }[]> = {
  "poll-1": [
    { user: "zen_spark", text: "This really made me think about what's been weighing on me.", time: "2h ago", likes: 5 },
    { user: "wave_rider", text: "Interesting perspective!", time: "3h ago", likes: 2 },
  ],
  "poll-2": [
    { user: "night_echo", text: "Belonging hits different when you're anonymous.", time: "1h ago", likes: 8 },
    { user: "raw_signal", text: "Clarity for sure. Everything else follows.", time: "4h ago", likes: 3 },
  ],
  "poll-3": [
    { user: "ghost_mind", text: "Safe community is everything. That's why I'm here.", time: "30m ago", likes: 12 },
    { user: "quiet_flame", text: "Someone to talk to — but honestly.", time: "2h ago", likes: 6 },
  ],
};

function PollPhoneCard({
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
  const comments = mockComments[poll.id] || [];

  if (isLocked) {
    return (
      <div className="relative">
        <PhoneMockup>
          <div className="bg-raw-black px-4 py-6 min-h-[480px] flex flex-col">
            {/* Blurred content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Lock className="mx-auto mb-3 h-8 w-8 text-raw-gold/40" />
                <p className="font-display text-sm tracking-wide text-raw-silver/60 mb-1">
                  Locked Poll
                </p>
                <p className="text-xs text-raw-silver/30 mb-5 max-w-[180px] mx-auto">
                  Sign up to unlock this question and see what others think.
                </p>
                <button
                  onClick={onUnlock}
                  className="rounded-full bg-raw-gold px-6 py-2.5 text-xs font-bold text-raw-black hover:bg-raw-gold/90 transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    );
  }

  return (
    <div className="relative">
      <PhoneMockup>
        <div className="bg-raw-black px-4 py-3 min-h-[480px] flex flex-col">
          {/* Poll header */}
          <div className="text-center mb-1">
            <p className="font-display text-[9px] tracking-[0.2em] uppercase text-raw-gold/40">
              Anonymous Poll
            </p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-[9px] text-raw-silver/30 flex items-center gap-1">
                <ThumbsUp className="h-2.5 w-2.5" /> {totalVotes}
              </span>
              <span className="text-[9px] text-raw-silver/30 flex items-center gap-1">
                <MessageCircle className="h-2.5 w-2.5" /> {comments.length}
              </span>
            </div>
          </div>

          {/* Question card */}
          <div className="rounded-2xl bg-[#1a1a1e] border border-raw-border/30 p-5 mt-2">
            <p className="font-display text-base tracking-wide text-raw-text text-center leading-snug">
              {poll.question}
            </p>

            {!hasVoted ? (
              /* Pre-vote: Yes/No style buttons */
              <div className="mt-5">
                <p className="text-[10px] text-raw-silver/30 text-center mb-3">
                  Tap to answer
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {poll.options.slice(0, 2).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onVote(option.id)}
                      className="rounded-xl border border-raw-border/40 bg-raw-black/60 py-3 text-sm text-raw-text hover:border-raw-gold/30 hover:bg-raw-gold/[0.04] transition-all"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                {poll.options.length > 2 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {poll.options.slice(2).map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onVote(option.id)}
                        className="rounded-xl border border-raw-border/40 bg-raw-black/60 py-3 text-sm text-raw-text hover:border-raw-gold/30 hover:bg-raw-gold/[0.04] transition-all"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Post-vote: Results */
              <div className="mt-5 space-y-2">
                {poll.options.map((option) => {
                  const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                  return (
                    <div
                      key={option.id}
                      className="relative overflow-hidden rounded-xl border border-raw-border/20 bg-raw-black/40"
                    >
                      <div
                        className="absolute inset-y-0 left-0 bg-raw-gold/10 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                      <div className="relative flex items-center justify-between px-4 py-2.5">
                        <span className="text-xs text-raw-silver/70">{option.text}</span>
                        <span className="text-xs font-bold text-raw-gold/70">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
                <p className="text-[9px] text-raw-silver/25 text-center pt-1">
                  {totalVotes.toLocaleString()} anonymous responses
                </p>
              </div>
            )}
          </div>

          {/* Comments section */}
          {hasVoted && comments.length > 0 && (
            <div className="mt-3 flex-1">
              {/* Comment input */}
              <div className="flex items-center gap-2 rounded-xl bg-[#1a1a1e] border border-raw-border/20 px-3 py-2 mb-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-[11px] text-raw-text placeholder:text-raw-silver/25 outline-none"
                  readOnly
                />
                <Send className="h-3.5 w-3.5 text-raw-silver/25" />
              </div>

              {/* Comments */}
              <div className="space-y-2">
                {comments.map((comment, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#1a1a1e] border border-raw-border/15 px-3 py-2.5"
                  >
                    <p className="text-[11px] text-raw-silver/60 leading-relaxed">
                      {comment.text}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="text-[9px] font-medium text-raw-gold/50">
                        @{comment.user}
                      </span>
                      <span className="text-[9px] text-raw-silver/20">{comment.time}</span>
                      <span className="text-[9px] text-raw-silver/25 flex items-center gap-0.5">
                        ↑ {comment.likes}
                      </span>
                      <span className="text-[9px] text-raw-silver/25">↩ Reply</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PhoneMockup>
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
  const [currentPoll, setCurrentPoll] = useState(0);

  const goNext = () => setCurrentPoll((p) => Math.min(p + 1, polls.length - 1));
  const goPrev = () => setCurrentPoll((p) => Math.max(p - 1, 0));

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

        {/* Phone mockup poll carousel */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous arrow */}
          <button
            onClick={goPrev}
            disabled={currentPoll === 0}
            className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all ${
              currentPoll === 0
                ? "border-raw-border/20 text-raw-silver/15 cursor-not-allowed"
                : "border-raw-border/40 text-raw-silver/50 hover:border-raw-gold/30 hover:text-raw-gold/60"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Phone with poll */}
          <div className="relative">
            <PollPhoneCard
              poll={polls[currentPoll]}
              hasVoted={votedPolls.has(polls[currentPoll].id)}
              isLocked={polls[currentPoll].locked && !isLoggedIn}
              onVote={(optionId) => onVote(polls[currentPoll].id, optionId)}
              onUnlock={onSignupClick}
            />

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {polls.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPoll(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentPoll
                      ? "w-6 bg-raw-gold"
                      : "w-2 bg-raw-silver/20 hover:bg-raw-silver/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            disabled={currentPoll === polls.length - 1}
            className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all ${
              currentPoll === polls.length - 1
                ? "border-raw-border/20 text-raw-silver/15 cursor-not-allowed"
                : "border-raw-border/40 text-raw-silver/50 hover:border-raw-gold/30 hover:text-raw-gold/60"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Signup gate */}
        {!isLoggedIn && freeVotesUsed >= 2 && (
          <div className="mt-14 rounded-2xl border border-raw-gold/20 bg-gradient-to-br from-raw-surface to-raw-black p-10 text-center glow-gold-sm">
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
