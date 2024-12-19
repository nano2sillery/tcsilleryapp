import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Medal, Users, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isNewMatchPage = location.pathname === '/matches/new';

  return (
    <>
      {/* Bouton flottant pour ajouter un match */}
      {!isNewMatchPage && (
        <Link
          to="/matches/new"
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 
                   flex h-14 w-14 items-center justify-center 
                   rounded-full bg-tertiary-500 text-white 
                   shadow-lg hover:bg-tertiary-600 transition-all
                   hover:scale-110 active:scale-95
                   ring-4 ring-white"
          aria-label="Ajouter un match"
        >
          <Plus className="h-7 w-7" />
        </Link>
      )}

      {/* Navigation mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white px-4 pb-2 pt-2">
        <div className="grid grid-cols-4 gap-1">
          <Link
            to="/"
            className={cn(
              'flex flex-col items-center pt-2 pb-1',
              isActive('/') ? 'text-tertiary-500' : 'text-gray-500'
            )}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Accueil</span>
          </Link>

          <Link
            to="/matches"
            className={cn(
              'flex flex-col items-center pt-2 pb-1',
              isActive('/matches') ? 'text-tertiary-500' : 'text-gray-500'
            )}
          >
            <Trophy className="h-6 w-6" />
            <span className="text-xs mt-1">Matches</span>
          </Link>

          <Link
            to="/players"
            className={cn(
              'flex flex-col items-center pt-2 pb-1',
              isActive('/players') ? 'text-tertiary-500' : 'text-gray-500'
            )}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Joueurs</span>
          </Link>

          <Link
            to="/rankings"
            className={cn(
              'flex flex-col items-center pt-2 pb-1',
              isActive('/rankings') ? 'text-tertiary-500' : 'text-gray-500'
            )}
          >
            <Medal className="h-6 w-6" />
            <span className="text-xs mt-1">Classement</span>
          </Link>
        </div>
      </nav>
    </>
  );
}