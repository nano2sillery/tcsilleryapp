import React from 'react';
import Select from '@/components/ui/Select';
import { Users } from 'lucide-react';
import type { Player } from '@/types';

interface PlayerSelectProps {
  players: Player[];
  value: string;
  onChange: (value: string) => void;
}

export default function PlayerSelect({ players, value, onChange }: PlayerSelectProps) {
  return (
    <Select
      label="Adversaire"
      icon={<Users className="w-4 h-4" />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Sélectionnez votre adversaire</option>
      {players.map((player) => (
        <option key={player.id} value={player.id}>
          {`${player.lastName} ${player.firstName} (${player.fftRanking})`}
        </option>
      ))}
    </Select>
  );
}