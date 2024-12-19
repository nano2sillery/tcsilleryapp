import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { deleteAnnouncement } from '@/services/announcements/mutations';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnnouncementCard from '@/components/admin/AnnouncementCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Announcements() {
  const navigate = useNavigate();
  const location = useLocation();
  const { announcements, loading, error, refetch } = useAnnouncements();
  const successMessage = location.state?.success;

  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      await refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des annonces
        </h2>
        <Button onClick={() => navigate('create')}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle annonce
        </Button>
      </div>

      {successMessage && (
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-green-600">{successMessage}</p>
        </div>
      )}

      {error ? (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {announcements.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Aucune annonce pour le moment
            </div>
          ) : (
            announcements.map(announcement => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}