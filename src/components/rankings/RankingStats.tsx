import React from 'react';
import type { PlayerRanking } from '@/types/rankings';

interface RankingStatsProps {
  player: PlayerRanking;
  type: 'matches' | 'victories';
}

export default function RankingStats({ player, type }: RankingStatsProps) {
  return (
    <div className="flex flex-col items-end text-right">
      <div className="text-xs sm:text-base font-semibold text-gray-900">
        {type === 'matches' ? (
          `${player.totalMatches} ${player.totalMatches > 1 ? 'M' : 'M'}`
        ) : (
          `${Math.round(player.winPercentage)}%`
        )}
      </div>
      <div className="text-[10px] sm:text-xs text-gray-500">
        {type === 'matches' ? (
          `${Math.round(player.winPercentage)}%`
        ) : (
          `${player.totalMatches} M`
        )}
      </div>
    </div>
  );
}