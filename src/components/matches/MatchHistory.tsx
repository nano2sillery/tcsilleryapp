import React from 'react';
import { formatDate } from '@/lib/utils';
import type { MatchWithPlayers } from '@/services/matches';
import UserInitials from '@/components/ui/UserInitials';
import PlayerName from '@/components/ui/PlayerName';
import ScoreDisplay from './scores/ScoreDisplay';

interface MatchHistoryProps {
  matches: MatchWithPlayers[];
  currentUserId: string;
}

export default function MatchHistory({ matches, currentUserId }: MatchHistoryProps) {
  const playerMatches = matches.filter(match => 
    match.player1Id === currentUserId || match.player2Id === currentUserId
  );

  if (playerMatches.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        Aucun match joué pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {playerMatches.map((match) => {
        const isPlayer1 = currentUserId === match.player1Id;
        const opponent = isPlayer1 ? match.player2 : match.player1;
        const isWinner = currentUserId === match.winnerId;

        if (!opponent) return null;

        return (
          <div key={match.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <UserInitials
                  firstName={opponent.firstName}
                  lastName={opponent.lastName}
                  gender={opponent.gender}
                  size="sm"
                />
                <PlayerName
                  firstName={opponent.firstName}
                  lastName={opponent.lastName}
                  firstNameClassName="text-sm text-gray-600"
                  lastNameClassName="text-base text-gray-900"
                />
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isWinner 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isWinner ? 'Victoire' : 'Défaite'}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(match.date)}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {match.scores.map((score, index) => (
                <ScoreDisplay
                  key={index}
                  score={score}
                  className={`text-sm font-medium ${
                    isWinner 
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  } px-3 py-1 rounded-lg`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}