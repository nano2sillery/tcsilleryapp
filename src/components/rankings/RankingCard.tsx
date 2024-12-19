import React from 'react';
import { cn } from '@/lib/utils';
import UserInitials from '@/components/ui/UserInitials';
import type { PlayerRanking } from '@/types/rankings';
import RankingPosition from './RankingPosition';
import RankingStats from './RankingStats';

interface RankingCardProps {
  player: PlayerRanking;
  position: number;
  type: 'matches' | 'victories';
}

export default function RankingCard({ player, position, type }: RankingCardProps) {
  const isTopThree = position < 3;

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-3 sm:p-4",
      isTopThree && "ring-1 ring-offset-2",
      position === 0 && "ring-yellow-500/50",
      position === 1 && "ring-gray-400/50",
      position === 2 && "ring-amber-700/50"
    )}>
      <div className="flex items-center gap-2 sm:gap-3">
        <RankingPosition position={position} />

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <UserInitials
            firstName={player.firstName}
            lastName={player.lastName}
            gender={player.gender}
            size="sm"
          />
          <div className="min-w-0">
            <div className="text-xs sm:text-sm text-gray-600 truncate">
              {player.firstName}
            </div>
            <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
              {player.lastName}
            </div>
            <div className="text-xs font-medium text-tertiary-500 mt-0.5">
              {player.fftRanking}
            </div>
          </div>
        </div>

        <RankingStats
          player={player}
          type={type}
        />
      </div>
    </div>
  );
}