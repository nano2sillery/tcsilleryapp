import React from 'react';
import { useMatches } from '@/hooks/useMatches';
import MatchHistory from '@/components/matches/MatchHistory';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PlayerMatchHistoryProps {
  playerId: string;
  showTitle?: boolean;
}

export default function PlayerMatchHistory({ playerId, showTitle = true }: PlayerMatchHistoryProps) {
  const { matches, loading, error } = useMatches(playerId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {showTitle && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Historique de mes matches
        </h2>
      )}
      <MatchHistory 
        matches={matches}
        currentUserId={playerId}
      />
    </div>
  );
}