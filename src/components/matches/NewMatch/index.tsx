import React from 'react';
import { useNewMatch } from './useNewMatch';
import Button from '@/components/ui/Button';
import PlayerSelect from './PlayerSelect';
import DateSelect from './DateSelect';
import ScoreSection from './ScoreSection';
import NewMatchSuccess from '../NewMatchSuccess';

export default function NewMatch() {
  const {
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
  } = useNewMatch();

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Nouveau Match</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 pb-24">
          <PlayerSelect
            players={players}
            value={selectedPlayer}
            onChange={setSelectedPlayer}
          />

          <DateSelect
            value={matchDate}
            onChange={setMatchDate}
          />

          <ScoreSection
            scores={scores}
            onScoreChange={handleScoreChange}
            onAddScore={handleAddScore}
            onRemoveScore={handleRemoveScore}
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button type="submit" className="w-full h-12">
            Enregistrer le match
          </Button>
        </form>
      </div>

      {showSuccess && <NewMatchSuccess />}
    </>
  );
}