import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PlayerStats from '@/components/player/PlayerStats';
import PlayerMatchHistory from '@/components/player/PlayerMatchHistory';
import PageTitle from '@/components/ui/PageTitle';

export default function Statistics() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <PageTitle 
        variant="primary"
        subtitle="Suivez vos performances et statistiques"
      >
        Mes Statistiques
      </PageTitle>
      
      <div className="space-y-6">
        <PlayerStats playerId={currentUser.uid} showTitle={false} />
        <PlayerMatchHistory playerId={currentUser.uid} showTitle={true} />
      </div>
    </div>
  );
}