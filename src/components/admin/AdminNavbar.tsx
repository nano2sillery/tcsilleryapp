import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Settings } from 'lucide-react';
import UserInitials from '../ui/UserInitials';

export default function AdminNavbar() {
  const { currentUser } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
                alt="T.C. SILLERY"
                className="h-10 w-10 object-contain"
              />
              <span className="text-base font-semibold text-tertiary-500 whitespace-nowrap">
                Administration
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/admin/settings"
              className="p-2 text-gray-500 hover:text-tertiary-500 transition-colors"
              title="Paramètres"
            >
              <Settings className="w-5 h-5" />
            </Link>
            
            {currentUser && (
              <Link 
                to="/profile"
                className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <UserInitials
                  firstName={currentUser.displayName?.split(' ')[0] || ''}
                  lastName={currentUser.displayName?.split(' ')[1] || ''}
                  gender="M"
                  size="xs"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}