import { useState, useEffect, useCallback } from 'react';
import { getAllPlayers } from '@/services/players';
import type { Player } from '@/types';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPlayers();
      setPlayers(data);
    } catch (err) {
      console.error('Erreur lors du chargement des joueurs:', err);
      setError('Impossible de charger la liste des joueurs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  return { 
    players, 
    loading, 
    error,
    refetch: loadPlayers
  };
}