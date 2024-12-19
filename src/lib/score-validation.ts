import type { SetScore } from '@/types/scores';

export function validateSetScore(score: SetScore): ScoreValidation {
  const { player1, player2 } = score;
  
  // Validation de base
  if (player1 < 0 || player2 < 0) {
    return {
      isValid: false,
      needsTiebreak: false,
      canHaveTiebreak: false,
      canBeSuperTiebreak: false,
      error: 'Les scores doivent être positifs'
    };
  }

  // Super tie-break
  if (score.isSuperTiebreak) {
    const isValid = (player1 >= 10 || player2 >= 10) && Math.abs(player1 - player2) >= 2;
    return {
      isValid,
      needsTiebreak: false,
      canHaveTiebreak: false,
      canBeSuperTiebreak: true,
      error: isValid ? undefined : 'Score de super tie-break invalide'
    };
  }

  // Set normal
  const needsTiebreak = player1 === 6 && player2 === 6;
  const canHaveTiebreak = player1 === 7 || player2 === 7;
  
  // Validation du score de set
  const isValidSet = (
    (player1 === 6 && player2 < 5) ||
    (player2 === 6 && player1 < 5) ||
    (player1 === 7 && (player2 === 5 || player2 === 6)) ||
    (player2 === 7 && (player1 === 5 || player1 === 6))
  );

  return {
    isValid: isValidSet,
    needsTiebreak,
    canHaveTiebreak,
    canBeSuperTiebreak: false,
    error: isValidSet ? undefined : 'Score de set invalide'
  };
}

export function validateTiebreakScore(score: SetScore): boolean {
  if (!score.tiebreak) return false;
  
  const { player1, player2 } = score.tiebreak;
  const minScore = score.isSuperTiebreak ? 10 : 7;
  const maxDiff = Math.abs(player1 - player2);
  
  return (
    (player1 >= minScore || player2 >= minScore) &&
    maxDiff >= 2
  );
}

export function formatScore(score: SetScore): string {
  if (score.isSuperTiebreak) {
    return `[${score.player1}-${score.player2}]`;
  }
  
  if (score.tiebreak) {
    const losingTiebreakScore = Math.min(score.tiebreak.player1, score.tiebreak.player2);
    return `${score.player1}-${score.player2}(${losingTiebreakScore})`;
  }
  
  return `${score.player1}-${score.player2}`;
}