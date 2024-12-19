import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';

interface MatchActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
}

export default function MatchActions({ onEdit, onDelete, onAdd }: MatchActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {onAdd && (
        <ActionButton
          icon={Plus}
          label="Ajouter un match"
          onClick={onAdd}
        />
      )}
      {onEdit && (
        <ActionButton
          icon={Edit2}
          label="Modifier"
          variant="secondary"
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <ActionButton
          icon={Trash2}
          label="Supprimer"
          variant="danger"
          onClick={onDelete}
        />
      )}
    </div>
  );
}