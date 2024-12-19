export function formatScoreDisplay(score: string): string {
  // Gestion du super tie-break
  if (score.startsWith('[') && score.endsWith(']')) {
    const [score1, score2] = score.slice(1, -1).split('-').map(Number);
    return `${score1}-${score2}`;
  }

  // Gestion du tie-break normal
  const tiebreakMatch = score.match(/(\d+)-(\d+)\((\d+)\)/);
  if (tiebreakMatch) {
    const [_, score1, score2, tiebreak] = tiebreakMatch;
    return `${score1}-${score2}(${tiebreak})`;
  }

  // Score normal
  return score;
}