import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, or, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { calculatePlayerStats } from '@/services/matches/stats';
import type { PlayerStats } from '@/types/stats';

const initialStats: PlayerStats = {
  totalMatches: 0,
  wins: 0,
  losses: 0,
  totalSets: 0,
  totalGames: 0,
  winPercentage: 0,
  setsWonPercentage: 0,
  averageGamesWonPerSet: 0,
  averageGamesLostPerSet: 0,
  averageGamesPerMatch: 0
};

export function usePlayerStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<PlayerStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setStats(initialStats);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadStats() {
      try {
        setLoading(true);
        setError(null);

        const matchesRef = collection(db, COLLECTIONS.MATCHES);
        const q = query(
          matchesRef,
          or(
            where('player1Id', '==', currentUser.uid),
            where('player2Id', '==', currentUser.uid)
          )
        );

        const querySnapshot = await getDocs(q);
        const matches = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (!mounted) return;

        if (matches.length === 0) {
          setStats(initialStats);
          return;
        }

        const calculatedStats = calculatePlayerStats(matches, currentUser.uid);
        setStats(calculatedStats);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        if (mounted) {
          setError('Impossible de charger les statistiques');
          setStats(initialStats);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  return { stats, loading, error };
}