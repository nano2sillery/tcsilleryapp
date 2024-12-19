import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAnnouncement } from '@/services/announcements/mutations';
import Button from '@/components/ui/Button';
import AdminContentCard from '@/components/admin/AdminContentCard';
import AdminFormActions from '@/components/admin/AdminFormActions';

export default function CreateAnnouncement() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Le message est requis');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      
      await createAnnouncement({
        message: message.trim(),
        active: true
      });

      navigate('/admin/announcements', { 
        state: { success: 'Annonce créée avec succès' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminContentCard>
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Nouvelle annonce
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message de l'annonce
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-tertiary-500 focus:border-transparent"
            placeholder="Saisissez votre message..."
            required
          />
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <AdminFormActions>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/announcements')}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création...' : 'Créer l\'annonce'}
          </Button>
        </AdminFormActions>
      </form>
    </AdminContentCard>
  );
}