import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { ChallengeStats } from '@/types/stats';

function isRegularSet(score: string): boolean {
  return !score.startsWith('[') && !score.endsWith(']');
}

function parseSetScore(score: string): { games1: number, games2: number } {
  // Pour les sets normaux (ex: "6-4" ou "7-6(4)")
  const baseScore = score.split('(')[0];
  const [games1, games2] = baseScore.split('-').map(Number);
  return { games1, games2 };
}

export async function fetchChallengeStats(): Promise<ChallengeStats> {
  try {
    // Récupérer tous les joueurs
    const playersSnap = await getDocs(collection(db, COLLECTIONS.PLAYERS));
    const totalPlayers = playersSnap.docs.filter(doc => doc.id !== '_init').length;

    // Récupérer tous les matches sauf _init
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const matchesQuery = query(matchesRef, where('__name__', '!=', '_init'));
    const matchesSnap = await getDocs(matchesQuery);
    const matches = matchesSnap.docs;
    const totalMatches = matches.length;

    let totalSets = 0;
    let totalGames = 0;

    matches.forEach(match => {
      const scores = match.data().scores || [];
      
      scores.forEach(score => {
        // Ne compter que les sets normaux, pas les super tie-breaks
        if (isRegularSet(score)) {
          totalSets++;
          const { games1, games2 } = parseSetScore(score);
          totalGames += games1 + games2;
        }
      });
    });

    return {
      totalPlayers,
      totalMatches,
      totalSets,
      totalGames,
      averageMatchesPerPlayer: totalPlayers ? +(totalMatches / totalPlayers).toFixed(1) : 0,
      averageSetsPerMatch: totalMatches ? +(totalSets / totalMatches).toFixed(1) : 0,
      averageGamesPerSet: totalSets ? +(totalGames / totalSets).toFixed(1) : 0,
      averageGamesPerMatch: totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}