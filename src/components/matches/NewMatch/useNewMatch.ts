import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createMatch } from '@/services/matches';
import { getAllPlayers } from '@/services/players';
import { formatSetScore } from '@/lib/scores/format';
import type { Player } from '@/types';
import type { SetScore } from '@/types/scores';

const initialSetScore: SetScore = {
  player1: 0,
  player2: 0
};

export function useNewMatch() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [scores, setScores] = useState<SetScore[]>([{ ...initialSetScore }]);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadPlayers = async () => {
      if (!currentUser) return;
      
      try {
        const allPlayers = await getAllPlayers();
        const otherPlayers = allPlayers
          .filter(p => p.id !== currentUser.uid)
          .sort((a, b) => a.lastName.localeCompare(b.lastName));
        setPlayers(otherPlayers);
      } catch (error) {
        console.error('Erreur lors du chargement des joueurs:', error);
        setError('Impossible de charger la liste des joueurs');
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedPlayer) {
      setError('Veuillez sélectionner un adversaire');
      return;
    }

    if (!matchDate) {
      setError('Veuillez sélectionner une date');
      return;
    }

    try {
      let player1Sets = 0;
      let player2Sets = 0;

      const formattedScores = scores.map(score => {
        let isPlayer1Winner;
        
        if (score.isSuperTiebreak && score.tiebreak) {
          isPlayer1Winner = score.tiebreak.player1 > score.tiebreak.player2;
        } else {
          isPlayer1Winner = score.player1 > score.player2 || 
            (score.tiebreak && score.tiebreak.player1 > score.tiebreak.player2);
        }

        if (isPlayer1Winner) player1Sets++;
        else player2Sets++;

        return formatSetScore(score);
      });

      const winnerId = player1Sets > player2Sets ? currentUser.uid : selectedPlayer;

      await createMatch({
        player1Id: currentUser.uid,
        player2Id: selectedPlayer,
        scores: formattedScores,
        winnerId,
        date: new Date(matchDate)
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/matches');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création du match:', error);
      setError('Impossible de créer le match');
    }
  };

  const handleScoreChange = (index: number, newScore: SetScore) => {
    const newScores = [...scores];
    newScores[index] = newScore;
    setScores(newScores);
  };

  const handleAddScore = () => {
    setScores([...scores, { ...initialSetScore }]);
  };

  const handleRemoveScore = (index: number) => {
    setScores(scores.filter((_, i) => i !== index));
  };

  return {
    players,
    loading,
    selectedPlayer,
    matchDate,
    scores,
    error,
    showSuccess,
    setSelectedPlayer,
    setMatchDate,
    handleSubmit,
    handleScoreChange,
    handleAddScore,
    handleRemoveScore
  };
}