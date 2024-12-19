import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayers } from '@/hooks/usePlayers';
import { deletePlayer } from '@/services/players/mutations';
import PlayersList from '@/components/admin/players/PlayersList';
import PlayerSearch from '@/components/admin/players/PlayerSearch';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import type { Player } from '@/types';

export default function AdminPlayers() {
  const navigate = useNavigate();
  const { players, loading, error, refetch } = usePlayers();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (player: Player) => {
    try {
      setDeleteError(null);
      await deletePlayer(player.id);
      await refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setDeleteError(error instanceof Error ? error.message : 'Impossible de supprimer le joueur');
    }
  };

  if (loading) return <LoadingSpinner />;

  const filteredPlayers = players.filter(player => 
    `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.fftRanking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des joueurs
        </h2>
        <Button
          onClick={() => navigate('create')}
          className="w-full sm:w-auto h-12 px-6 text-base"
        >
          + Nouveau Joueur
        </Button>
      </div>

      {(error || deleteError) && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error || deleteError}</p>
        </div>
      )}

      <div className="space-y-4">
        <PlayerSearch value={searchTerm} onChange={setSearchTerm} />
        
        <PlayersList 
          players={filteredPlayers}
          onEdit={(player) => navigate(`${player.id}/edit`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}