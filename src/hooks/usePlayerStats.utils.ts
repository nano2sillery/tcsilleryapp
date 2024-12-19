import type { Match } from '@/types';

export function calculateStreaks(matches: Match[], playerId: string) {
  let currentStreak = 0;
  let longestStreak = 0;
  let isActive = false;
  
  const sortedMatches = [...matches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  for (const match of sortedMatches) {
    if (match.winnerId === playerId) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
      if (match === sortedMatches[0]) isActive = true;
    } else {
      if (match === sortedMatches[0]) currentStreak = 0;
      break;
    }
  }

  return { currentStreak, longestStreak, isActive };
}

export function calculateSetDistribution(matches: Match[], playerId: string) {
  const distribution = {
    won60: 0, won61: 0, won62: 0, won63: 0,
    won64: 0, won75: 0, won76: 0,
    lost: {
      lost06: 0, lost16: 0, lost26: 0, lost36: 0,
      lost46: 0, lost57: 0, lost67: 0
    }
  };

  matches.forEach(match => {
    const isPlayer1 = match.player1Id === playerId;
    match.scores.forEach(score => {
      const [score1, score2] = score.split('-').map(Number);
      const playerScore = isPlayer1 ? score1 : score2;
      const opponentScore = isPlayer1 ? score2 : score1;
      
      if (playerScore > opponentScore) {
        if (playerScore === 6) {
          switch (opponentScore) {
            case 0: distribution.won60++; break;
            case 1: distribution.won61++; break;
            case 2: distribution.won62++; break;
            case 3: distribution.won63++; break;
            case 4: distribution.won64++; break;
          }
        } else if (playerScore === 7) {
          if (opponentScore === 5) distribution.won75++;
          if (opponentScore === 6) distribution.won76++;
        }
      } else {
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

export function calculateMatchesByMonth(matches: Match[]) {
  const monthlyMatches: Record<string, number> = {};
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 
                 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  matches.forEach(match => {
    const date = new Date(match.date);
    const monthKey = months[date.getMonth()];
    monthlyMatches[monthKey] = (monthlyMatches[monthKey] || 0) + 1;
  });

  return monthlyMatches;
}