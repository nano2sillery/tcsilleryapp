import type { PlayerStats } from '@/types/stats';

export const initialStats: PlayerStats = {
  totalMatches: 0,
  wins: 0,
  losses: 0,
  totalSets: 0,
  totalGames: 0,
  winPercentage: 0,
  winLossRatio: 0,
  averageGamesWonPerSet: 0,
  averageGamesLostPerSet: 0,
  averageGamesPerMatch: 0,
  setDistribution: {
    won: {
      won60: 0,
      won61: 0,
      won62: 0,
      won63: 0,
      won64: 0,
      won75: 0,
      won76: 0
    },
    lost: {
      lost06: 0,
      lost16: 0,
      lost26: 0,
      lost36: 0,
      lost46: 0,
      lost57: 0,
      lost67: 0
    }
  }
};