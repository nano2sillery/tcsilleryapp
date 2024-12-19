import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getPlayer } from '@/services/players';

export function useAuthCheck() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;

    const checkUserExists = async () => {
      try {
        const player = await getPlayer(currentUser.uid);
        if (!player) {
          setError('Votre compte joueur n\'existe plus');
          await logout();
          navigate('/login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du joueur:', error);
        setError('Une erreur est survenue lors de la vérification de votre compte');
        await logout();
        navigate('/login');
      }
    };

    checkUserExists();
  }, [currentUser, logout, navigate]);

  return { error };
}