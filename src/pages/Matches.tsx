import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMatches } from '@/hooks/useMatches';
import MatchList from '@/components/matches/MatchList';
import PlayerFilter from '@/components/matches/PlayerFilter';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Matches() {
  const { currentUser } = useAuth();
  const { matches, loading, error } = useMatches();
  const [filterValue, setFilterValue] = useState('');

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-tertiary-500 to-tertiary-600 bg-clip-text text-transparent">
          Challenge Interne
        </h1>
        <p className="mt-2 text-gray-600">
          Historique des matches du club
        </p>
        <div className="mt-2 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-tertiary-500 to-tertiary-600" />
      </div>
      
      <div className="mb-6">
        <PlayerFilter 
          value={filterValue}
          onChange={setFilterValue}
        />
      </div>

      <MatchList 
        matches={matches}
        currentUserId={currentUser?.uid}
        filterValue={filterValue}
      />
    </div>
  );
}