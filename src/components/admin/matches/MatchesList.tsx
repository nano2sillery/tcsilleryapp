import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Edit2, Trash2 } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { MatchWithPlayers } from '@/services/matches/types';

interface MatchesListProps {
  matches: MatchWithPlayers[];
  onEdit?: (match: MatchWithPlayers) => void;
  onDelete?: (match: MatchWithPlayers) => void;
}

export default function MatchesList({ matches, onEdit, onDelete }: MatchesListProps) {
  const [matchToDelete, setMatchToDelete] = useState<MatchWithPlayers | null>(null);

  const handleDeleteClick = (match: MatchWithPlayers) => {
    setMatchToDelete(match);
  };

  const handleConfirmDelete = async () => {
    if (matchToDelete && onDelete) {
      await onDelete(matchToDelete);
    }
    setMatchToDelete(null);
  };

  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        Aucun match trouvé
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {matches.map((match) => (
            <div key={match.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col items-center">
                {/* Date et joueurs */}
                <div className="text-center mb-3">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(match.date)}
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {match.player1?.lastName} {match.player1?.firstName}
                  </div>
                  <div className="text-sm text-gray-500 my-1">contre</div>
                  <div className="text-base font-medium text-gray-900">
                    {match.player2?.lastName} {match.player2?.firstName}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex items-center gap-2 mt-2">
                  {onEdit && (
                    <ActionButton
                      icon={Edit2}
                      variant="secondary"
                      onClick={() => onEdit(match)}
                    />
                  )}
                  {onDelete && (
                    <ActionButton
                      icon={Trash2}
                      variant="danger"
                      onClick={() => handleDeleteClick(match)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!matchToDelete}
        title="Supprimer le match"
        message={matchToDelete ? 
          `Êtes-vous sûr de vouloir supprimer le match entre ${matchToDelete.player1?.lastName} et ${matchToDelete.player2?.lastName} ? Cette action est irréversible.` 
          : ''
        }
        confirmLabel="Supprimer"
        onConfirm={handleConfirmDelete}
        onCancel={() => setMatchToDelete(null)}
      />
    </>
  );
}