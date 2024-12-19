import React from 'react';
import { Search, Trophy } from 'lucide-react';
import { FFT_RANKINGS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Select from '@/components/ui/Select';

interface PlayerFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  rankingRange: [string, string];
  onRankingRangeChange: (range: [string, string]) => void;
  className?: string;
}

export default function PlayerFilters({
  searchTerm,
  onSearchChange,
  rankingRange,
  onRankingRangeChange,
  className
}: PlayerFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Recherche par nom */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un joueur..."
          className="block w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg 
                   text-base placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:border-transparent"
        />
      </div>

      {/* Filtres de classement */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Classement minimum"
          icon={<Trophy className="w-4 h-4" />}
          value={rankingRange[0]}
          onChange={(e) => onRankingRangeChange([e.target.value, rankingRange[1]])}
        >
          {FFT_RANKINGS.map((ranking) => (
            <option key={ranking} value={ranking}>{ranking}</option>
          ))}
        </Select>

        <Select
          label="Classement maximum"
          icon={<Trophy className="w-4 h-4" />}
          value={rankingRange[1]}
          onChange={(e) => onRankingRangeChange([rankingRange[0], e.target.value])}
        >
          {FFT_RANKINGS.map((ranking) => (
            <option key={ranking} value={ranking}>{ranking}</option>
          ))}
        </Select>
      </div>
    </div>
  );
}