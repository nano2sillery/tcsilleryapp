import React from 'react';
import { Edit2, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ProfileActionsProps {
  isEditing: boolean;
  isDirty: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onLogout: () => void;
  colors: {
    bg: string;
    text: string;
    border: string;
    hover: string;
  };
}

export default function ProfileActions({
  isEditing,
  isDirty,
  onEdit,
  onCancel,
  onLogout,
  colors
}: ProfileActionsProps) {
  if (isEditing) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button 
          type="submit" 
          disabled={!isDirty}
          className={`w-full h-12 ${colors.bg} ${colors.hover}`}
        >
          Enregistrer
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full h-12"
        >
          Annuler
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        type="button"
        onClick={onEdit}
        className={`w-full h-12 ${colors.bg} ${colors.hover} flex items-center justify-center`}
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Modifier
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onLogout}
        className="w-full h-12 border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Se déconnecter
      </Button>
    </div>
  );
}