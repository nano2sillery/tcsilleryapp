import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '@/services/players/mutations';
import { FFT_RANKINGS } from '@/lib/constants';
import { AtSign, User, Phone, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Select from '@/components/ui/Select';
import AdminContentCard from '@/components/admin/AdminContentCard';
import AdminFormActions from '@/components/admin/AdminFormActions';

// ... rest of the imports

export default function CreatePlayer() {
  // ... existing state and handlers

  return (
    <AdminContentCard>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Nouveau joueur
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="space-y-6">
          {/* ... existing form fields ... */}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <AdminFormActions>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/players')}
            className="w-full sm:w-auto"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création...' : 'Créer le joueur'}
          </Button>
        </AdminFormActions>
      </form>
    </AdminContentCard>
  );
}