import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';

export default function Home() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="pb-24">
      <ChallengeHeader />
      <ChallengeSummary />
    </div>
  );
}