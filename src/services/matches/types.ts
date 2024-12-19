import type { Match } from '@/types';

export type { Match };

export interface CreateMatchInput {
  player1Id: string;
  player2Id: string;
  scores: string[];
  winnerId: string;
  date: Date;
}

export interface UpdateMatchInput extends Partial<CreateMatchInput> {
  updatedAt?: Date;
}

export interface MatchWithPlayers extends Match {
  player1?: {
    id: string;
    firstName: string;
    lastName: string;
    fftRanking: string;
  };
  player2?: {
    id: string;
    firstName: string;
    lastName: string;
    fftRanking: string;
  };
}