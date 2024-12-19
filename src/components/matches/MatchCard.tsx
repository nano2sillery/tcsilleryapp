import React from 'react';
import { formatDate } from '@/lib/utils';
import type { Match, Player } from '@/types';
import MatchScore from './MatchScore';
import MatchPlayer from './MatchPlayer';

interface MatchCardProps {
  match: Match & {
    player1?: Player;
    player2?: Player;
  };
}

export default function MatchCard({ match }: MatchCardProps) {
  const { player1, player2, scores, date, winnerId } = match;
  if (!player1 || !player2) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
      <div className="text-xs sm:text-sm text-gray-500 text-center mb-3">
        {formatDate(date)}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-6">
        <MatchPlayer 
          player={player1}
          isWinner={winnerId === player1.id}
        />

        <MatchScore scores={scores} />

        <MatchPlayer 
          player={player2}
          isWinner={winnerId === player2.id}
        />
      </div>
    </div>
  );
}