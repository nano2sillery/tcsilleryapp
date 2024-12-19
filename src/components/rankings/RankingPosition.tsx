import React from 'react';
import { Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankingPositionProps {
  position: number;
}

export default function RankingPosition({ position }: RankingPositionProps) {
  const getMedalColor = (pos: number) => {
    switch (pos) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-700';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="flex-shrink-0 w-8 flex items-center justify-center">
      {position < 3 ? (
        <Medal className={cn("w-5 h-5", getMedalColor(position))} />
      ) : (
        <span className="text-sm sm:text-base font-medium text-gray-400">
          {position + 1}
        </span>
      )}
    </div>
  );
}