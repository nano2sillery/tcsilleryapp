import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlayer } from '@/services/players';
import { updatePlayer } from '@/services/players/mutations';
import { FFT_RANKINGS } from '@/lib/constants';
import { AtSign, User, Phone, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Select from '@/components/ui/Select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PlayerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  fftRanking: string;
  gender: 'M' | 'F';
}

export default function EditPlayer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PlayerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    fftRanking: '',
    gender: 'M'
  });

  useEffect(() => {
    if (!id) return;

    const loadPlayer = async () => {
      try {
        const player = await getPlayer(id);
        if (player) {
          setFormData({
            firstName: player.firstName,
            lastName: player.lastName,
            email: player.email,
            phoneNumber: player.phoneNumber,
            fftRanking: player.fftRanking,
            gender: player.gender
          });
        }
      } catch (err) {
        setError('Impossible de charger le joueur');
      } finally {
        setLoading(false);
      }
    };

    loadPlayer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      await updatePlayer(id, formData);
      navigate('/admin/players', { 
        state: { success: 'Joueur modifié avec succès' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleChange = (field: keyof PlayerFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            Modifier le joueur
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/players')}
          >
            Retour
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Prénom"
              icon={<User className="w-4 h-4" />}
              value={formData.firstName}
              onChange={handleChange('firstName')}
              required
            />
            
            <FormField
              label="Nom"
              icon={<User className="w-4 h-4" />}
              value={formData.lastName}
              onChange={handleChange('lastName')}
              required
            />
          </div>

          <FormField
            label="Email"
            type="email"
            icon={<AtSign className="w-4 h-4" />}
            value={formData.email}
            onChange={handleChange('email')}
            required
          />

          <FormField
            label="Téléphone"
            type="tel"
            icon={<Phone className="w-4 h-4" />}
            value={formData.phoneNumber}
            onChange={handleChange('phoneNumber')}
            placeholder="06 12 34 56 78"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Classement FFT"
              icon={<Trophy className="w-4 h-4" />}
              value={formData.fftRanking}
              onChange={handleChange('fftRanking')}
              required
            >
              {FFT_RANKINGS.map((ranking) => (
                <option key={ranking} value={ranking}>{ranking}</option>
              ))}
            </Select>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="M"
                    checked={formData.gender === 'M'}
                    onChange={handleChange('gender')}
                    className="mr-2"
                  />
                  <span className="text-sm">Homme</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="F"
                    checked={formData.gender === 'F'}
                    onChange={handleChange('gender')}
                    className="mr-2"
                  />
                  <span className="text-sm">Femme</span>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}