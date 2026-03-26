import { useState, useCallback } from "react";

export interface User {
  id: string;
  username: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  locked: boolean;
}

const INITIAL_POLLS: Poll[] = [
  {
    id: "poll-1",
    question: "What drains you most right now?",
    options: [
      { id: "p1-1", text: "Social pressure", votes: 127 },
      { id: "p1-2", text: "Lack of direction", votes: 203 },
      { id: "p1-3", text: "Burnout", votes: 184 },
      { id: "p1-4", text: "Loneliness", votes: 156 },
    ],
    locked: false,
  },
  {
    id: "poll-2",
    question: "What do you need more of these days?",
    options: [
      { id: "p2-1", text: "Discipline", votes: 189 },
      { id: "p2-2", text: "Calm", votes: 142 },
      { id: "p2-3", text: "Belonging", votes: 231 },
      { id: "p2-4", text: "Clarity", votes: 167 },
    ],
    locked: false,
  },
  {
    id: "poll-3",
    question: "What would help you the most right now?",
    options: [
      { id: "p3-1", text: "Someone to talk to", votes: 198 },
      { id: "p3-2", text: "A structured routine", votes: 154 },
      { id: "p3-3", text: "A safe community", votes: 176 },
      { id: "p3-4", text: "Professional guidance", votes: 132 },
    ],
    locked: true,
  },
];

export function useRawStore() {
  const [user, setUser] = useState<User | null>(null);
  const [polls, setPolls] = useState<Poll[]>(INITIAL_POLLS);
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [showSignup, setShowSignup] = useState(false);
  const [avatarLevel, setAvatarLevel] = useState(1);

  const isLoggedIn = user !== null;
  const freeVotesUsed = votedPolls.size;

  const vote = useCallback(
    (pollId: string, optionId: string) => {
      if (!isLoggedIn && freeVotesUsed >= 2) {
        setShowSignup(true);
        return;
      }

      const poll = polls.find((p) => p.id === pollId);
      if (!poll) return;
      if (poll.locked && !isLoggedIn) {
        setShowSignup(true);
        return;
      }
      if (votedPolls.has(pollId)) return;

      setPolls((prev) =>
        prev.map((p) =>
          p.id === pollId
            ? {
                ...p,
                options: p.options.map((o) =>
                  o.id === optionId ? { ...o, votes: o.votes + 1 } : o
                ),
              }
            : p
        )
      );
      setVotedPolls((prev) => new Set(prev).add(pollId));
    },
    [isLoggedIn, freeVotesUsed, polls, votedPolls]
  );

  const signup = useCallback((username: string, _password: string) => {
    setUser({ id: crypto.randomUUID(), username });
    setShowSignup(false);
  }, []);

  return {
    user,
    isLoggedIn,
    polls,
    votedPolls,
    freeVotesUsed,
    showSignup,
    setShowSignup,
    avatarLevel,
    setAvatarLevel,
    vote,
    signup,
  };
}
