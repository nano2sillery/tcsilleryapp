import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { getPlayer } from '@/services/players/queries';
import type { Match, MatchWithPlayers } from './types';

export async function getMatch(id: string): Promise<MatchWithPlayers | null> {
  try {
    const matchRef = doc(db, COLLECTIONS.MATCHES, id);
    const matchDoc = await getDoc(matchRef);
    
    if (!matchDoc.exists()) {
      return null;
    }

    const matchData = matchDoc.data() as Match;
    const [player1, player2] = await Promise.all([
      getPlayer(matchData.player1Id),
      getPlayer(matchData.player2Id)
    ]);

    return {
      id: matchDoc.id,
      ...matchData,
      player1,
      player2
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du match:', error);
    throw error;
  }
}

export async function getAllMatches(): Promise<MatchWithPlayers[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.MATCHES),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const matches = querySnapshot.docs
      .filter(doc => doc.id !== '_init')
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Match[];

    // Récupérer les données des joueurs
    const enrichedMatches = await Promise.all(
      matches.map(async match => {
        const [player1, player2] = await Promise.all([
          getPlayer(match.player1Id),
          getPlayer(match.player2Id)
        ]);

        return {
          ...match,
          player1,
          player2
        };
      })
    );

    return enrichedMatches;
  } catch (error) {
    console.error('Erreur lors de la récupération des matches:', error);
    throw error;
  }
}