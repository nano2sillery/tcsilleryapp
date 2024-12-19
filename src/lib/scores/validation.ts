import type { SetScore, ScoreValidation } from '@/types/scores';

export function validateSetScore(score: SetScore): ScoreValidation {
  if (score.isSuperTiebreak) {
    return validateSuperTiebreak(score);
  }
  return validateRegularSet(score);
}

function validateSuperTiebreak(score: SetScore): ScoreValidation {
  const { tiebreak } = score;
  if (!tiebreak) return createValidation(false);
  
  const isValid = (tiebreak.player1 >= 10 || tiebreak.player2 >= 10) && 
                 Math.abs(tiebreak.player1 - tiebreak.player2) >= 2;
  
  return createValidation(isValid, false, false, true);
}

function validateRegularSet(score: SetScore): ScoreValidation {
  const { player1, player2 } = score;
  
  if (player1 < 0 || player2 < 0) {
    return createValidation(false);
  }

  const needsTiebreak = player1 === 6 && player2 === 6;
  const canHaveTiebreak = player1 === 7 || player2 === 7;
  
  const isValidSet = (
    (player1 === 6 && player2 < 5) ||
    (player2 === 6 && player1 < 5) ||
    (player1 === 7 && (player2 === 5 || player2 === 6)) ||
    (player2 === 7 && (player1 === 5 || player1 === 6))
  );

  return createValidation(isValidSet, needsTiebreak, canHaveTiebreak);
}

function createValidation(
  isValid: boolean,
  needsTiebreak = false,
  canHaveTiebreak = false,
  canBeSuperTiebreak = false
): ScoreValidation {
  return {
    isValid,
    needsTiebreak,
    canHaveTiebreak,
    canBeSuperTiebreak,
    error: isValid ? undefined : 'Score invalide'
  };
}

export function validateTiebreakScore(score: SetScore): boolean {
  if (!score.tiebreak) return false;
  
  const { player1, player2 } = score.tiebreak;
  const minScore = score.isSuperTiebreak ? 10 : 7;
  
  return (player1 >= minScore || player2 >= minScore) && 
         Math.abs(player1 - player2) >= 2;
}