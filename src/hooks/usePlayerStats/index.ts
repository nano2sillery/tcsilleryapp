import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchPlayerMatches } from './queries';
import { calculateStats } from './calculations';
import { initialStats } from './constants';
import type { PlayerStats } from '@/types/stats';

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

        const matches = await fetchPlayerMatches(currentUser.uid);

        if (!mounted) return;

        if (matches.length === 0) {
          setStats(initialStats);
          return;
        }

        const calculatedStats = calculateStats(matches, currentUser.uid);
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