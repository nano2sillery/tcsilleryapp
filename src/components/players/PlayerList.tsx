import React from 'react';
import type { Player } from '@/types';
import UserInitials from '@/components/ui/UserInitials';
import SmsButton from '@/components/ui/SmsButton';
import { formatPhoneNumber } from '@/lib/utils';

interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  if (players.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun joueur ne correspond à vos critères
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {players.map((player) => (
        <div 
          key={player.id}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <UserInitials
              firstName={player.firstName}
              lastName={player.lastName}
              gender={player.gender}
              size="sm"
            />
            
            {/* Informations */}
            <div className="flex-1 min-w-0">
              {/* Nom et classement */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate uppercase">
                    {player.lastName} {player.firstName}
                  </h3>
                </div>
                <div className={`
                  flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${player.gender === 'M' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'bg-pink-50 text-pink-700'
                  }
                `}>
                  {player.fftRanking}
                </div>
              </div>

              {/* Téléphone */}
              <div className="mt-1 flex items-center gap-2">
                <p className="text-sm text-gray-600">
                  {formatPhoneNumber(player.phoneNumber)}
                </p>
                <SmsButton phoneNumber={player.phoneNumber} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}