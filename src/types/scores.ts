export interface TiebreakScore {
  player1: number;
  player2: number;
}

export interface SetScore {
  player1: number;
  player2: number;
  tiebreak?: TiebreakScore;
  isSuperTiebreak?: boolean;
}

export interface ScoreValidation {
  isValid: boolean;
  needsTiebreak: boolean;
  canHaveTiebreak: boolean;
  canBeSuperTiebreak: boolean;
  error?: string;
}