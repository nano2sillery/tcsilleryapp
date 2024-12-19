import React from 'react';
import { UserPlus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PlayerActionsProps {
  onAdd?: () => void;
}

export default function PlayerActions({ onAdd }: PlayerActionsProps) {
  return (
    <div>
      {onAdd && (
        <Button
          onClick={onAdd}
          className="h-10 px-4 text-base"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          + Nouveau Joueur
        </Button>
      )}
    </div>
  );
}