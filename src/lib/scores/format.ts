import type { SetScore } from '@/types/scores';

export function parseScore(score: string): {
  score1: number;
  score2: number;
  tiebreak?: { score1: number; score2: number };
  isSuperTiebreak?: boolean;
} {
  // Super tie-break [10-8]
  if (score.startsWith('[') && score.endsWith(']')) {
    const [score1, score2] = score.slice(1, -1).split('-').map(Number);
    return { score1, score2, isSuperTiebreak: true };
  }
  
  // Tie-break normal "7-6(4-2)"
  const tiebreakMatch = score.match(/^(\d+)-(\d+)\((\d+)-(\d+)\)$/);
  if (tiebreakMatch) {
    const [_, score1, score2, tb1, tb2] = tiebreakMatch;
    return {
      score1: parseInt(score1),
      score2: parseInt(score2),
      tiebreak: { 
        score1: parseInt(tb1), 
        score2: parseInt(tb2) 
      }
    };
  }
  
  // Score normal "6-4"
  const [score1, score2] = score.split('-').map(Number);
  return { score1: score1 || 0, score2: score2 || 0 };
}

export function formatSetScore(score: SetScore): string {
  if (score.isSuperTiebreak && score.tiebreak) {
    return `[${score.tiebreak.player1}-${score.tiebreak.player2}]`;
  }
  
  if (score.tiebreak) {
    return `${score.player1}-${score.player2}(${score.tiebreak.player1}-${score.tiebreak.player2})`;
  }
  
  return `${score.player1}-${score.player2}`;
}