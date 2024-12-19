import React from 'react';
import { Trophy, Target, Percent, TrendingUp } from 'lucide-react';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import { useMatches } from '@/hooks/useMatches';
import { useSetDistribution } from '@/hooks/useSetDistribution';
import CircularProgress from '@/components/ui/CircularProgress';
import StatCard from '@/components/challenge/StatCard';
import SetDistribution from '@/components/statistics/SetDistribution';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PlayerStatsProps {
  playerId: string;
  showTitle?: boolean;
}

export default function PlayerStats({ playerId, showTitle = true }: PlayerStatsProps) {
  const { stats, loading: statsLoading, error: statsError } = usePlayerStats();
  const { matches, loading: matchesLoading, error: matchesError } = useMatches(playerId);
  const { scores, totalSets } = useSetDistribution(matches, playerId);

  if (statsLoading || matchesLoading) {
    return <LoadingSpinner />;
  }

  if (statsError || matchesError) {
    return (
      <div className="text-center py-8 text-red-500">
        {statsError || matchesError}
      </div>
    );
  }

  if (!stats) return null;

  const mainStats = [
    {
      icon: <Trophy className="w-4 h-4" />,
      value: stats.totalMatches,
      maxValue: 50,
      color: "#324178",
      label: "Matches",
      sublabel: "joués"
    },
    {
      icon: <Target className="w-4 h-4" />,
      value: stats.wins,
      maxValue: stats.totalMatches,
      color: "#4d8b4d",
      label: "Victoires",
      sublabel: "obtenues"
    },
    {
      icon: <Percent className="w-4 h-4" />,
      value: Math.round(stats.winPercentage),
      maxValue: 100,
      color: "#b84141",
      label: "Victoires",
      sublabel: "en %"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      value: stats.totalSets,
      maxValue: stats.totalMatches * 3,
      color: "#f59e0b",
      label: "Sets",
      sublabel: "joués"
    }
  ];

  return (
    <div className="space-y-4">
      {showTitle && (
        <h2 className="text-xl font-semibold text-gray-800">Mes statistiques</h2>
      )}

      {/* Statistiques principales */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mainStats.map((stat, index) => (
            <CircularProgress 
              key={index} 
              {...stat}
              size={80}
              strokeWidth={4}
            />
          ))}
        </div>
      </div>

      {/* Distribution des sets */}
      <SetDistribution 
        scores={scores}
        totalSets={totalSets}
      />

      {/* Statistiques détaillées */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-base font-semibold text-gray-700 mb-3">
          Performance détaillée
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <StatCard
              label="Jeux Gagnés/Set"
              value={stats.averageGamesWonPerSet}
              maxValue={6}
              info="Moyenne des nombres de jeux gagnés par set"
              color="bg-primary-500"
            />
            <StatCard
              label="Jeux Perdus/Set"
              value={stats.averageGamesLostPerSet}
              maxValue={6}
              info="Moyenne des nombres de jeux perdus par set"
              color="bg-secondary-500"
            />
          </div>
          <div className="space-y-3">
            <StatCard
              label="Ratio V/D"
              value={stats.winLossRatio}
              maxValue={3}
              info="Ratio entre les victoires et les défaites"
              color="bg-tertiary-500"
            />
            <StatCard
              label="Jeux/Match"
              value={stats.averageGamesPerMatch}
              maxValue={30}
              info="Moyenne des nombres de jeux joués par match"
              color="bg-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}