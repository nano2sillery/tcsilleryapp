import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatches } from '@/hooks/useMatches';
import { deleteMatch } from '@/services/matches';
import MatchesList from '@/components/admin/matches/MatchesList';
import MatchSearch from '@/components/admin/matches/MatchSearch';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { MatchWithPlayers } from '@/services/matches/types';

export default function AdminMatches() {
  const navigate = useNavigate();
  const { matches, loading, error, refetch } = useMatches();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleEdit = (match: MatchWithPlayers) => {
    navigate(`/admin/matches/${match.id}/edit`);
  };

  const handleDelete = async (match: MatchWithPlayers) => {
    try {
      setDeleteError(null);
      await deleteMatch(match.id);
      await refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setDeleteError(error instanceof Error ? error.message : 'Impossible de supprimer le match');
    }
  };

  if (loading) return <LoadingSpinner />;

  const filteredMatches = matches.filter(match => 
    match.player1?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player1?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player2?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player2?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des matches
        </h2>
      </div>

      {deleteError && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{deleteError}</p>
        </div>
      )}

      <MatchSearch value={searchTerm} onChange={setSearchTerm} />
      
      <MatchesList 
        matches={filteredMatches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}