import React from 'react';
import { cn } from '@/lib/utils';
import type { TiebreakScore } from '@/types/scores';

interface TiebreakInputProps {
  value: TiebreakScore;
  onChange: (score: TiebreakScore) => void;
  isSuperTiebreak?: boolean;
  error?: string;
}

export default function TiebreakInput({
  value,
  onChange,
  isSuperTiebreak = false,
  error
}: TiebreakInputProps) {
  const maxScore = isSuperTiebreak ? 99 : 20;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label className="text-xs font-medium text-gray-500 mb-1">
            {isSuperTiebreak ? 'Super TB' : 'Tie-break'}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              max={maxScore}
              value={value.player1}
              onChange={(e) => onChange({
                ...value,
                player1: parseInt(e.target.value) || 0
              })}
              className={cn(
                "w-16 h-8 text-center rounded-md border-gray-300",
                "focus:ring-primary-500 focus:border-primary-500",
                error && "border-red-300 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              min="0"
              max={maxScore}
              value={value.player2}
              onChange={(e) => onChange({
                ...value,
                player2: parseInt(e.target.value) || 0
              })}
              className={cn(
                "w-16 h-8 text-center rounded-md border-gray-300",
                "focus:ring-primary-500 focus:border-primary-500",
                error && "border-red-300 focus:ring-red-500 focus:border-red-500"
              )}
            />
          </div>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}