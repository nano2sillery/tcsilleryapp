import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BellRing, Users, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Annonces', href: '/admin/announcements', icon: BellRing },
  { name: 'Joueurs', href: '/admin/players', icon: Users },
  { name: 'Matches', href: '/admin/matches', icon: Trophy },
];

export default function AdminBottomNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1",
                "text-[0.65rem] font-medium transition-colors",
                isActive 
                  ? "text-tertiary-600" 
                  : "text-gray-500 hover:text-tertiary-500"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 mb-1 transition-transform",
                isActive && "scale-110"
              )} />
              <span className="truncate">{item.name}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-tertiary-500 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}