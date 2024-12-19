import React from 'react';
import { cn } from '@/lib/utils';
import { parseScore } from '@/lib/scores/format';

interface ScoreDisplayProps {
  score: string;
  className?: string;
}

export default function ScoreDisplay({ score, className }: ScoreDisplayProps) {
  const parsedScore = parseScore(score);
  
  // Super tie-break
  if (parsedScore.isSuperTiebreak) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <span className="text-amber-600 font-medium">
          [{parsedScore.score1}-{parsedScore.score2}]
        </span>
      </div>
    );
  }
  
  // Score avec ou sans tie-break
  return (
    <div className={cn("flex items-center justify-center gap-0.5", className)}>
      <span className="tabular-nums">
        {parsedScore.score1}-{parsedScore.score2}
      </span>
      {parsedScore.tiebreak && (
        <span className="text-[0.65em] text-gray-500 font-normal ml-0.5">
          ({parsedScore.tiebreak.score1}-{parsedScore.tiebreak.score2})
        </span>
      )}
    </div>
  );
}