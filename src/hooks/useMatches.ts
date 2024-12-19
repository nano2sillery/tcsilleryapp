import { useState, useEffect, useCallback } from 'react';
import { getAllMatches } from '@/services/matches/queries';
import type { MatchWithPlayers } from '@/services/matches/types';

export function useMatches() {
  const [matches, setMatches] = useState<MatchWithPlayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllMatches();
      setMatches(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des matches:', err);
      setError('Impossible de charger les matches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return { 
    matches, 
    loading, 
    error,
    refetch: loadMatches
  };
}