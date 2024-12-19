import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BellRing, Users, Trophy, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Annonces', href: '/admin/announcements', icon: BellRing },
  { name: 'Joueurs', href: '/admin/players', icon: Users },
  { name: 'Matches', href: '/admin/matches', icon: Trophy },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings }
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-gray-200">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                "transition-colors duration-200",
                isActive
                  ? "bg-tertiary-50 text-tertiary-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "flex-shrink-0 h-5 w-5 mr-3",
                isActive ? "text-tertiary-500" : "text-gray-400 group-hover:text-gray-500"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}