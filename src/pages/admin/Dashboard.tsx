import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, BellRing, Info } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { usePlayers } from '@/hooks/usePlayers';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PageTitle from '@/components/ui/PageTitle';

export default function AdminDashboard() {
  const { matches, loading: matchesLoading } = useMatches();
  const { players, loading: playersLoading } = usePlayers();
  const { announcements, loading: announcementsLoading } = useAnnouncements();

  if (matchesLoading || playersLoading || announcementsLoading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      name: 'Joueurs',
      value: players.length,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/players'
    },
    {
      name: 'Matches',
      value: matches.length,
      icon: Trophy,
      color: 'bg-green-500',
      link: '/admin/matches'
    },
    {
      name: 'Annonces',
      value: announcements.length,
      icon: BellRing,
      color: 'bg-amber-500',
      link: '/admin/announcements'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <PageTitle variant="primary">
          Tableau de bord
        </PageTitle>
        
        <Link
          to="/admin/settings"
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Info className="h-4 w-4 mr-2" />
          Informations
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon 
                    className={`h-10 w-10 text-white rounded-lg p-2 ${stat.color}`}
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}