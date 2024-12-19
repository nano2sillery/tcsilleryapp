import React from 'react';
import Button from '@/components/ui/Button';
import ScoreInput from '@/components/ui/ScoreInput';
import type { SetScore } from '@/types/scores';

interface ScoreSectionProps {
  scores: SetScore[];
  onScoreChange: (index: number, score: SetScore) => void;
  onAddScore: () => void;
  onRemoveScore: (index: number) => void;
}

export default function ScoreSection({
  scores,
  onScoreChange,
  onAddScore,
  onRemoveScore
}: ScoreSectionProps) {
  const canAddSet = scores.length < 5 && !scores.some(score => score.isSuperTiebreak);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-700">Score</h2>

      <div className="space-y-6">
        {scores.map((score, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1">
              <ScoreInput
                value={score}
                onChange={(newScore) => onScoreChange(index, newScore)}
                canBeSuperTiebreak={index === 2}
                error={undefined}
              />
            </div>
            {scores.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveScore(index)}
                className="mt-8 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {canAddSet && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddScore}
            className="text-sm w-full"
          >
            Ajouter un set
          </Button>
        )}
      </div>
    </div>
  );
}