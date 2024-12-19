import React from 'react';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetScore {
  label: string;
  value: number;
  type: 'won' | 'lost';
}

interface SetDistributionProps {
  scores: SetScore[];
  totalSets: number;
}

export default function SetDistribution({ scores, totalSets }: SetDistributionProps) {
  if (!scores || scores.length === 0 || totalSets === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-base font-semibold text-gray-700 mb-4 flex items-center">
          <BarChart2 className="w-4 h-4 text-emerald-500 mr-2" />
          Distribution des sets
        </h3>
        <div className="text-center text-sm text-gray-500 py-4">
          Aucun set joué pour le moment
        </div>
      </div>
    );
  }

  const wonScores = scores.filter(score => score.type === 'won');
  const lostScores = scores.filter(score => score.type === 'lost');

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-base font-semibold text-gray-700 mb-4 flex items-center">
        <BarChart2 className="w-4 h-4 text-emerald-500 mr-2" />
        Distribution des sets
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Sets gagnés */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-emerald-600 mb-2">Sets gagnés</div>
          {wonScores.map((score) => (
            <div key={score.label} className="flex items-center gap-2">
              <div className="w-12 text-xs text-gray-600">{score.label}</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.round((score.value / totalSets) * 100)}%` }}
                />
              </div>
              <div className="w-10 text-xs text-gray-500 text-right">
                {score.value > 0 ? `${Math.round((score.value / totalSets) * 100)}%` : '-'}
              </div>
            </div>
          ))}
        </div>

        {/* Sets perdus */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-red-600 mb-2">Sets perdus</div>
          {lostScores.map((score) => (
            <div key={score.label} className="flex items-center gap-2">
              <div className="w-12 text-xs text-gray-600">{score.label}</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{ width: `${Math.round((score.value / totalSets) * 100)}%` }}
                />
              </div>
              <div className="w-10 text-xs text-gray-500 text-right">
                {score.value > 0 ? `${Math.round((score.value / totalSets) * 100)}%` : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}