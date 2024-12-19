import type { MatchData } from './types';
import type { SetDistribution } from '@/types/stats';

export function calculateBasicStats(matches: MatchData[], playerId: string) {
  let totalMatches = matches.length;
  let wins = 0;
  let totalSets = 0;
  let setsWon = 0;
  let totalGames = 0;
  let gamesWon = 0;
  let gamesLost = 0;

  matches.forEach(match => {
    const isPlayer1 = match.player1Id === playerId;
    const scores = match.scores || [];
    
    totalSets += scores.length;
    
    scores.forEach(score => {
      const [score1, score2] = score.split('-').map(Number);
      const [playerScore, opponentScore] = isPlayer1 ? [score1, score2] : [score2, score1];
      
      if (playerScore > opponentScore) setsWon++;
      gamesWon += playerScore;
      gamesLost += opponentScore;
      totalGames += score1 + score2;
    });

    if (match.winnerId === playerId) wins++;
  });

  return {
    totalMatches,
    wins,
    losses: totalMatches - wins,
    totalSets,
    totalGames,
    setsWon,
    gamesWon,
    gamesLost,
    averageGamesWonPerSet: totalSets ? +(gamesWon / totalSets).toFixed(1) : 0,
    averageGamesLostPerSet: totalSets ? +(gamesLost / totalSets).toFixed(1) : 0
  };
}

export function calculateSetDistribution(matches: MatchData[], playerId: string): SetDistribution {
  const distribution: SetDistribution = {
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
  };

  matches.forEach(match => {
    const isPlayer1 = match.player1Id === playerId;
    
    match.scores.forEach(score => {
      if (!score) return;
      
      const [score1, score2] = score.split('-').map(Number);
      if (!score1 || !score2) return;
      
      const [playerScore, opponentScore] = isPlayer1 ? [score1, score2] : [score2, score1];
      
      // Sets gagnés
      if (playerScore > opponentScore) {
        if (playerScore === 6) {
          switch (opponentScore) {
            case 0: distribution.won.won60++; break;
            case 1: distribution.won.won61++; break;
            case 2: distribution.won.won62++; break;
            case 3: distribution.won.won63++; break;
            case 4: distribution.won.won64++; break;
          }
        } else if (playerScore === 7) {
          if (opponentScore === 5) distribution.won.won75++;
          if (opponentScore === 6) distribution.won.won76++;
        }
      }
      // Sets perdus
      else if (opponentScore > playerScore) {
        if (opponentScore === 6) {
          switch (playerScore) {
            case 0: distribution.lost.lost06++; break;
            case 1: distribution.lost.lost16++; break;
            case 2: distribution.lost.lost26++; break;
            case 3: distribution.lost.lost36++; break;
            case 4: distribution.lost.lost46++; break;
          }
        } else if (opponentScore === 7) {
          if (playerScore === 5) distribution.lost.lost57++;
          if (playerScore === 6) distribution.lost.lost67++;
        }
      }
    });
  });

  return distribution;
}