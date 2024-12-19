import { useState, useEffect } from 'react';
import { getMatch } from '@/services/matches/queries';
import type { MatchWithPlayers } from '@/services/matches/types';

export function useMatch(id?: string) {
  const [match, setMatch] = useState<MatchWithPlayers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setMatch(null);
      setLoading(false);
      return;
    }

    const loadMatch = async () => {
      try {
        setLoading(true);
        const data = await getMatch(id);
        setMatch(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement du match:', err);
        setError('Impossible de charger le match');
        setMatch(null);
      } finally {
        setLoading(false);
      }
    };

    loadMatch();
  }, [id]);

  return { match, loading, error };
}