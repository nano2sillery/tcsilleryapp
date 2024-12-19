import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMatch } from '@/hooks/useMatch';
import { usePlayers } from '@/hooks/usePlayers';
import { updateMatch } from '@/services/matches/mutations';
import { formatSetScore } from '@/lib/scores/format';
import { toISODateString, parseDate } from '@/lib/utils/dates';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import ScoreInput from '@/components/ui/ScoreInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { SetScore } from '@/types/scores';

const initialSetScore: SetScore = {
  player1: 0,
  player2: 0
};

export default function EditMatch() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { match, loading: matchLoading } = useMatch(id);
  const { players, loading: playersLoading } = usePlayers();
  
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [matchDate, setMatchDate] = useState(toISODateString(new Date()));
  const [scores, setScores] = useState<SetScore[]>([{ ...initialSetScore }]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (match) {
      setSelectedPlayer(match.player2Id);
      setMatchDate(toISODateString(match.date));
      
      // Convert string scores to SetScore objects
      const parsedScores = match.scores.map(score => {
        const [score1, score2] = score.split('-').map(Number);
        return {
          player1: score1,
          player2: score2
        };
      });
      setScores(parsedScores);
    }
  }, [match]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !match) return;

    try {
      let player1Sets = 0;
      let player2Sets = 0;

      const formattedScores = scores.map(score => {
        const isPlayer1Winner = score.player1 > score.player2;
        if (isPlayer1Winner) player1Sets++;
        else player2Sets++;
        return formatSetScore(score);
      });

      const winnerId = player1Sets > player2Sets ? match.player1Id : selectedPlayer;

      await updateMatch(id, {
        player1Id: match.player1Id,
        player2Id: selectedPlayer,
        scores: formattedScores,
        winnerId,
        date: parseDate(matchDate)
      });

      navigate('/admin/matches', { 
        state: { success: 'Match modifié avec succès' }
      });
    } catch (error) {
      console.error('Erreur lors de la modification du match:', error);
      setError('Impossible de modifier le match');
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

  if (matchLoading || playersLoading) {
    return <LoadingSpinner />;
  }

  if (!match) {
    return (
      <div className="text-center py-8 text-red-500">
        Match introuvable
      </div>
    );
  }

  const otherPlayers = players.filter(p => 
    p.id !== match.player1Id
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            Modifier le match
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/matches')}
          >
            Retour
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Adversaire"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            required
          >
            <option value="">Sélectionnez l'adversaire</option>
            {otherPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.lastName} {player.firstName} ({player.fftRanking})
              </option>
            ))}
          </Select>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date du match
            </label>
            <input
              type="date"
              value={matchDate}
              onChange={(e) => setMatchDate(e.target.value)}
              max={toISODateString(new Date())}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-tertiary-500 focus:ring-tertiary-500 sm:text-sm"
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Score</h3>
            {scores.map((score, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <ScoreInput
                    value={score}
                    onChange={(newScore) => handleScoreChange(index, newScore)}
                    canBeSuperTiebreak={index === 2}
                  />
                </div>
                {scores.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveScore(index)}
                    className="mt-8 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {scores.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAddScore}
                className="w-full"
              >
                Ajouter un set
              </Button>
            )}
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