import React from 'react';
import { Users, Trophy, Target, Activity } from 'lucide-react';
import CircularProgress from '../ui/CircularProgress';
import StatCard from './StatCard';
import { useChallengeStats } from '@/hooks/useChallengeStats';
import StatsSection from './StatsSection';

export default function ChallengeSummary() {
  const { stats, loading, error } = useChallengeStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-tertiary-500">Chargement...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-6 text-red-500">
        {error || 'Données non disponibles'}
      </div>
    );
  }

  const mainStats = [
    {
      icon: <Users className="w-4 h-4" />,
      value: stats.totalPlayers,
      maxValue: 100,
      color: "#324178",
      label: "Joueurs",
      sublabel: "inscrits"
    },
    {
      icon: <Trophy className="w-4 h-4" />,
      value: stats.totalMatches,
      maxValue: 200,
      color: "#b84141",
      label: "Matches",
      sublabel: "joués"
    },
    {
      icon: <Target className="w-4 h-4" />,
      value: stats.totalSets,
      maxValue: 500,
      color: "#4d8b4d",
      label: "Sets",
      sublabel: "joués"
    },
    {
      icon: <Activity className="w-4 h-4" />,
      value: stats.totalGames,
      maxValue: 2000,
      color: "#f59e0b",
      label: "Jeux",
      sublabel: "joués"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="grid gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsSection
            title="Intensité des Matches"
            icon={<Activity className="w-4 h-4 text-primary-500" />}
            stats={[
              {
                label: "Jeux par Set",
                value: stats.averageGamesPerSet,
                maxValue: 12,
                info: "La moyenne idéale est de 8-10 jeux par set",
                color: "bg-primary-500"
              },
              {
                label: "Sets par Match",
                value: stats.averageSetsPerMatch,
                maxValue: 3,
                info: "2 sets en moyenne indique des matches disputés",
                color: "bg-secondary-500"
              }
            ]}
          />

          <StatsSection
            title="Activité du Challenge"
            icon={<Users className="w-4 h-4 text-tertiary-500" />}
            stats={[
              {
                label: "Matches par Joueur",
                value: stats.averageMatchesPerPlayer,
                maxValue: 10,
                info: "Moyenne des nombres de matches par joueur",
                color: "bg-tertiary-500"
              },
              {
                label: "Jeux par Match",
                value: stats.averageGamesPerMatch,
                maxValue: 30,
                info: "Moyenne des nombres de jeux joués par match",
                color: "bg-amber-500"
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}