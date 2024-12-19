import type { Match } from '@/types';

function isRegularSet(score: string): boolean {
  return !score.startsWith('[') && !score.endsWith(']');
}

function isSuperTiebreak(score: string): boolean {
  return score.startsWith('[') && score.endsWith(']');
}

function parseSetScore(score: string): { games1: number, games2: number } {
  // Pour les sets normaux (ex: "6-4" ou "7-6(4)")
  const baseScore = score.split('(')[0];
  const [games1, games2] = baseScore.split('-').map(Number);
  return { games1, games2 };
}

export function calculatePlayerStats(matches: Match[], playerId: string) {
  let totalMatches = 0;
  let wins = 0;
  let totalSets = 0;
  let setsWon = 0;
  let totalGames = 0;
  let gamesWon = 0;
  let gamesLost = 0;

  matches.forEach(match => {
    totalMatches++;
    const isPlayer1 = match.player1Id === playerId;
    
    if (match.winnerId === playerId) {
      wins++;
    }

    match.scores.forEach(score => {
      // Ne pas compter les super tie-breaks comme des sets
      if (isSuperTiebreak(score)) {
        return;
      }

      totalSets++;
      
      const { games1, games2 } = parseSetScore(score);
      const playerGames = isPlayer1 ? games1 : games2;
      const opponentGames = isPlayer1 ? games2 : games1;
      
      if (playerGames > opponentGames) {
        setsWon++;
      }
      
      gamesWon += playerGames;
      gamesLost += opponentGames;
      totalGames += games1 + games2;
    });
  });

  const losses = totalMatches - wins;
  const winLossRatio = losses > 0 ? +(wins / losses).toFixed(2) : wins > 0 ? wins : 0;

  return {
    totalMatches,
    wins,
    losses,
    totalSets,
    totalGames,
    winPercentage: totalMatches ? (wins / totalMatches) * 100 : 0,
    setsWonPercentage: totalSets ? (setsWon / totalSets) * 100 : 0,
    averageGamesWonPerSet: totalSets ? +(gamesWon / totalSets).toFixed(1) : 0,
    averageGamesLostPerSet: totalSets ? +(gamesLost / totalSets).toFixed(1) : 0,
    averageGamesPerMatch: totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0,
    winLossRatio
  };
}