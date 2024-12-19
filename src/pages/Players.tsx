import React, { useState } from 'react';
import { usePlayers } from '@/hooks/usePlayers';
import { FFT_RANKINGS } from '@/lib/constants';
import PageTitle from '@/components/ui/PageTitle';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PlayerList from '@/components/players/PlayerList';
import PlayerFilters from '@/components/players/PlayerFilters';

export default function Players() {
  const { players, loading, error } = usePlayers();
  const [searchTerm, setSearchTerm] = useState('');
  const [rankingRange, setRankingRange] = useState<[string, string]>(['NC', 'Pro']);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  const rankingIndex = (ranking: string) => FFT_RANKINGS.indexOf(ranking);

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = searchTerm === '' || 
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      
      const rankingInRange = rankingIndex(player.fftRanking) >= rankingIndex(rankingRange[0]) &&
                            rankingIndex(player.fftRanking) <= rankingIndex(rankingRange[1]);
      
      return matchesSearch && rankingInRange;
    })
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 pb-20">
      <PageTitle 
        variant="primary"
        subtitle="Retrouvez tous les joueurs du club"
      >
        Annuaire des Joueurs
      </PageTitle>

      <PlayerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        rankingRange={rankingRange}
        onRankingRangeChange={setRankingRange}
        className="mb-6"
      />

      <PlayerList players={filteredPlayers} />
    </div>
  );
}