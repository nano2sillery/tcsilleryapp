import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Player } from '@/types';

export async function getPlayer(id: string): Promise<Player | null> {
  try {
    const playerRef = doc(db, COLLECTIONS.PLAYERS, id);
    const playerDoc = await getDoc(playerRef);
    
    if (!playerDoc.exists()) {
      return null;
    }

    return {
      id: playerDoc.id,
      ...playerDoc.data()
    } as Player;
  } catch (error) {
    console.error('Erreur lors de la récupération du joueur:', error);
    throw error;
  }
}

export async function getAllPlayers(): Promise<Player[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PLAYERS),
      orderBy('lastName', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .filter(doc => doc.id !== '_init')
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs:', error);
    throw error;
  }
}