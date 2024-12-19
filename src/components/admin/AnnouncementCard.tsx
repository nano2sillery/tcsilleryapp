import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { Edit2, Trash2 } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import type { Announcement } from '@/types/announcement';

interface AnnouncementCardProps {
  announcement: Announcement;
  onDelete: (id: string) => Promise<void>;
}

export default function AnnouncementCard({ announcement, onDelete }: AnnouncementCardProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/announcements/${announcement.id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(announcement.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const canModify = announcement.id !== '_init' && announcement.id !== 'default';

  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 break-words">{announcement.message}</p>
        <div className="mt-2 text-sm text-gray-500">
          Créée le {formatDate(announcement.createdAt)}
        </div>
      </div>
      
      <div className="flex items-center gap-3 self-end sm:self-start">
        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          announcement.active 
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {announcement.active ? 'Active' : 'Inactive'}
        </div>

        {canModify && (
          <div className="flex gap-2">
            <ActionButton
              icon={Edit2}
              variant="secondary"
              onClick={handleEdit}
              title="Modifier"
            />
            <ActionButton
              icon={Trash2}
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Supprimer"
            />
          </div>
        )}
      </div>
    </div>
  );
}