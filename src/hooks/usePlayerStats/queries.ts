import { collection, query, where, or, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { MatchData } from './types';

export async function fetchPlayerMatches(playerId: string): Promise<MatchData[]> {
  const matchesRef = collection(db, COLLECTIONS.MATCHES);
  const q = query(
    matchesRef,
    or(
      where('player1Id', '==', playerId),
      where('player2Id', '==', playerId)
    )
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate()
  })) as MatchData[];
}