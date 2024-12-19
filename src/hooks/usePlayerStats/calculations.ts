import type { MatchData } from './types';
import type { PlayerStats } from '@/types/stats';
import { calculateBasicStats, calculateSetDistribution } from './utils';
import { initialStats } from './constants';

export function calculateStats(matches: MatchData[], playerId: string): PlayerStats {
  if (!matches.length) {
    return initialStats;
  }

  const {
    totalMatches,
    wins,
    losses,
    totalSets,
    totalGames,
    gamesWon,
    gamesLost,
    averageGamesWonPerSet,
    averageGamesLostPerSet
  } = calculateBasicStats(matches, playerId);

  const setDistribution = calculateSetDistribution(matches, playerId);

  return {
    totalMatches,
    wins,
    losses,
    totalSets,
    totalGames,
    winPercentage: totalMatches ? (wins / totalMatches) * 100 : 0,
    winLossRatio: losses ? +(wins / losses).toFixed(2) : wins,
    averageGamesWonPerSet,
    averageGamesLostPerSet,
    averageGamesPerMatch: totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0,
    setDistribution
  };
}