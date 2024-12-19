import React from 'react';
import { cn } from '@/lib/utils';
import { validateSetScore } from '@/lib/scores/validation';
import TiebreakInput from './TiebreakInput';
import Select from './Select';
import type { SetScore } from '@/types/scores';

interface ScoreInputProps {
  value: SetScore;
  onChange: (score: SetScore) => void;
  canBeSuperTiebreak?: boolean;
  error?: string;
}

export default function ScoreInput({
  value,
  onChange,
  canBeSuperTiebreak = false,
  error
}: ScoreInputProps) {
  const validation = validateSetScore(value);
  const scores = ['0', '1', '2', '3', '4', '5', '6', '7'];

  const handleSuperTiebreakToggle = () => {
    onChange({
      ...value,
      isSuperTiebreak: !value.isSuperTiebreak,
      player1: 0,
      player2: 0,
      tiebreak: { player1: 0, player2: 0 }
    });
  };

  return (
    <div className="space-y-2">
      {canBeSuperTiebreak && (
        <div className="flex items-center justify-center mb-2">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={value.isSuperTiebreak || false}
              onChange={handleSuperTiebreakToggle}
              className="rounded text-primary-500 focus:ring-primary-500"
            />
            <span className="text-gray-600">Super tie-break</span>
          </label>
        </div>
      )}

      {!value.isSuperTiebreak && (
        <div className="flex items-center justify-center space-x-4">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 mb-1">Vous</label>
            <Select
              value={value.player1.toString()}
              onChange={(e) => onChange({
                ...value,
                player1: parseInt(e.target.value),
                tiebreak: undefined
              })}
              className="w-24"
            >
              {scores.map(score => (
                <option key={score} value={score}>{score}</option>
              ))}
            </Select>
          </div>

          <span className="text-lg font-medium text-gray-400">-</span>

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 mb-1">Adversaire</label>
            <Select
              value={value.player2.toString()}
              onChange={(e) => onChange({
                ...value,
                player2: parseInt(e.target.value),
                tiebreak: undefined
              })}
              className="w-24"
            >
              {scores.map(score => (
                <option key={score} value={score}>{score}</option>
              ))}
            </Select>
          </div>
        </div>
      )}

      {(validation.needsTiebreak || validation.canHaveTiebreak || value.isSuperTiebreak) && (
        <TiebreakInput
          value={value.tiebreak || { player1: 0, player2: 0 }}
          onChange={(tiebreak) => onChange({ ...value, tiebreak })}
          isSuperTiebreak={value.isSuperTiebreak}
          error={error}
        />
      )}

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}