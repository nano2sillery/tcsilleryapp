import React from 'react';
import { Link } from 'react-router-dom';
import { BellRing, Settings, Users, MessageSquare } from 'lucide-react';

const stats = [
  { name: 'Annonces actives', value: '2', icon: BellRing, color: 'bg-blue-500' },
  { name: 'Joueurs inscrits', value: '24', icon: Users, color: 'bg-green-500' },
  { name: 'Messages', value: '12', icon: MessageSquare, color: 'bg-purple-500' }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tableau de bord
        </h1>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/admin/settings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon 
                    className={`h-6 w-6 text-white rounded-md p-1 ${stat.color}`}
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to={`/admin/${stat.name.toLowerCase()}`}
                  className="font-medium text-tertiary-600 hover:text-tertiary-900"
                >
                  Voir plus
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin/announcements/create"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-tertiary-600 hover:bg-tertiary-700"
            >
              Nouvelle annonce
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Exporter les données
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Générer un rapport
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}