import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { ADMIN_EMAILS } from '@/lib/constants';
import { Settings } from 'lucide-react';
import MobileNav from './MobileNav';
import UserInitials from './ui/UserInitials';
import AnnouncementBanner from './AnnouncementBanner';

export default function Layout() {
  const { currentUser } = useAuth();
  const { profile } = useProfile(currentUser?.uid);
  const location = useLocation();
  const isWelcomePage = location.pathname === '/welcome';
  const isAdmin = currentUser?.email && ADMIN_EMAILS.includes(currentUser.email);

  return (
    <div className="min-h-screen bg-tennis-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/70 -z-10" />
      
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-tertiary-200/20 via-tertiary-200/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-tertiary-200/20 via-tertiary-200/10 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tertiary-200/20 to-transparent" />
      </div>

      {!isWelcomePage && (
        <>
          <AnnouncementBanner />
          <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center space-x-3">
                  <img 
                    src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
                    alt="T.C. SILLERY"
                    className="h-10 w-10 object-contain"
                  />
                  <span className="text-base font-semibold text-tertiary-500 whitespace-nowrap">
                    T.C. SILLERY
                  </span>
                </Link>

                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Link 
                      to="/admin"
                      className="p-2 text-gray-500 hover:text-tertiary-500 transition-colors"
                      title="Administration"
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                  )}
                  
                  {currentUser && profile && (
                    <Link 
                      to="/profile"
                      className="p-1.5 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <UserInitials
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                        gender={profile.gender}
                        size="xs"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}

      <main className={`relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ${!isWelcomePage ? 'mt-16' : ''}`}>
        <Outlet />
      </main>

      {currentUser && !isWelcomePage && <MobileNav />}
    </div>
  );
}