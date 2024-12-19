import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import UserInitials from '@/components/ui/UserInitials';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ActionButton from '@/components/ui/ActionButton';
import type { Player } from '@/types';

interface PlayersListProps {
  players: Player[];
  onEdit?: (player: Player) => void;
  onDelete?: (player: Player) => void;
}

export default function PlayersList({ players, onEdit, onDelete }: PlayersListProps) {
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);

  const handleDeleteClick = (player: Player) => {
    setPlayerToDelete(player);
  };

  const handleConfirmDelete = async () => {
    if (playerToDelete && onDelete) {
      await onDelete(playerToDelete);
    }
    setPlayerToDelete(null);
  };

  if (players.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        Aucun joueur trouvé
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {players.map((player) => (
            <div key={player.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col items-center">
                {/* Avatar et nom */}
                <div className="flex flex-col items-center mb-3">
                  <UserInitials
                    firstName={player.firstName}
                    lastName={player.lastName}
                    gender={player.gender}
                    size="md"
                  />
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {player.firstName}
                    </div>
                    <div className="text-base font-semibold text-gray-900 uppercase">
                      {player.lastName}
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex items-center gap-2 mt-2">
                  {onEdit && (
                    <ActionButton
                      icon={Edit2}
                      label="Modifier"
                      variant="secondary"
                      onClick={() => onEdit(player)}
                    />
                  )}
                  {onDelete && (
                    <ActionButton
                      icon={Trash2}
                      label="Supprimer"
                      variant="danger"
                      onClick={() => handleDeleteClick(player)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!playerToDelete}
        title="Supprimer le joueur"
        message={`Êtes-vous sûr de vouloir supprimer ${playerToDelete?.firstName} ${playerToDelete?.lastName} ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPlayerToDelete(null)}
      />
    </>
  );
}