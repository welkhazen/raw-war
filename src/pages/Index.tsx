import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PollSection } from "@/components/landing/PollSection";
import { Communities } from "@/components/landing/Communities";
import { AvatarIdentity } from "@/components/landing/AvatarIdentity";
import { WhyAnonymity } from "@/components/landing/WhyAnonymity";
import { FoundingProviders } from "@/components/landing/FoundingProviders";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SignupModal } from "@/components/landing/SignupModal";
import Dashboard from "@/pages/Dashboard";
import { useRawStore } from "@/store/useRawStore";

const Index = () => {
  const {
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
  } = useRawStore();

  // Show dashboard when logged in
  if (isLoggedIn && user) {
    return (
      <Dashboard
        user={user}
        polls={polls}
        votedPolls={votedPolls}
        avatarLevel={avatarLevel}
        setAvatarLevel={setAvatarLevel}
        vote={vote}
      />
    );
  }

  return (
    <div className="min-h-screen bg-raw-black">
      <Navbar
        isLoggedIn={isLoggedIn}
        username={user?.username}
        onSignupClick={() => setShowSignup(true)}
      />

      <Hero onSignupClick={() => setShowSignup(true)} />
      <HowItWorks />
      <PollSection
        polls={polls}
        votedPolls={votedPolls}
        isLoggedIn={isLoggedIn}
        freeVotesUsed={freeVotesUsed}
        onVote={vote}
        onSignupClick={() => setShowSignup(true)}
      />
      <Communities onSignupClick={() => setShowSignup(true)} />
      <AvatarIdentity avatarLevel={avatarLevel} onLevelChange={setAvatarLevel} />
      <WhyAnonymity />
      <FoundingProviders />
      <FinalCTA onSignupClick={() => setShowSignup(true)} />

      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        onSignup={signup}
      />
    </div>
  );
};

export default Index;
