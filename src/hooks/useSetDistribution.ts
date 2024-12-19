import { useMemo } from 'react';
import type { Match } from '@/types';

interface SetScore {
  label: string;
  value: number;
  type: 'won' | 'lost';
}

export function useSetDistribution(matches: Match[], playerId: string) {
  return useMemo(() => {
    const wonDistribution = {
      '6-0': 0,
      '6-1': 0,
      '6-2': 0,
      '6-3': 0,
      '6-4': 0,
      '7-5': 0,
      '7-6': 0
    };

    const lostDistribution = {
      '0-6': 0,
      '1-6': 0,
      '2-6': 0,
      '3-6': 0,
      '4-6': 0,
      '5-7': 0,
      '6-7': 0
    };

    let totalSets = 0;

    matches.forEach(match => {
      const isPlayer1 = match.player1Id === playerId;
      
      match.scores.forEach(score => {
        const [score1, score2] = score.split('-').map(Number);
        const [playerScore, opponentScore] = isPlayer1 ? [score1, score2] : [score2, score1];
        
        totalSets++;
        
        if (playerScore > opponentScore) {
          const scoreKey = `${playerScore}-${opponentScore}` as keyof typeof wonDistribution;
          if (scoreKey in wonDistribution) {
            wonDistribution[scoreKey]++;
          }
        } else {
          const scoreKey = `${playerScore}-${opponentScore}` as keyof typeof lostDistribution;
          if (scoreKey in lostDistribution) {
            lostDistribution[scoreKey]++;
          }
        }
      });
    });

    const scores: SetScore[] = [
      ...Object.entries(wonDistribution).map(([label, value]) => ({
        label,
        value,
        type: 'won' as const
      })),
      ...Object.entries(lostDistribution).map(([label, value]) => ({
        label,
        value,
        type: 'lost' as const
      }))
    ];

    return {
      scores,
      totalSets
    };
  }, [matches, playerId]);
}