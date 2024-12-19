import React from 'react';
import type { PlayerRanking } from '@/types/rankings';
import RankingCard from './RankingCard';

interface RankingListProps {
  rankings: PlayerRanking[];
  type: 'matches' | 'victories';
}

export default function RankingList({ rankings, type }: RankingListProps) {
  const activeRankings = rankings.filter(player => player.totalMatches > 0);

  if (activeRankings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun joueur n'a encore joué de match
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {activeRankings.map((player, index) => (
        <RankingCard
          key={player.id}
          player={player}
          position={index}
          type={type}
        />
      ))}
    </div>
  );
}