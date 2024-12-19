import React from 'react';
import { cn } from '@/lib/utils';

interface MatchScoreProps {
  scores: string[];
}

export default function MatchScore({ scores }: MatchScoreProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {scores.map((score, index) => (
        <div
          key={index}
          className={cn(
            "text-sm font-medium text-gray-600",
            "bg-gray-50 px-2 py-1 rounded-md w-16 sm:w-20",
            "text-center tabular-nums"
          )}
        >
          {score}
        </div>
      ))}
    </div>
  );
}