import React from 'react';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_EMAILS } from '@/lib/constants';
import { Info, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function AnnouncementBanner() {
  const { announcement, error } = useAnnouncement();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.email && ADMIN_EMAILS.includes(currentUser.email);

  if (error) {
    return isAdmin ? (
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                {error}
              </p>
            </div>
            <Link 
              to="/admin/announcements/create"
              className="inline-flex items-center px-3 py-1 rounded-md bg-amber-100 text-amber-700 text-sm hover:bg-amber-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Créer une annonce
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  }

  if (!announcement?.active) return null;

  return (
    <div className={cn(
      "bg-tertiary-50 border-b border-tertiary-100",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <Info className="h-5 w-5 text-tertiary-500 flex-shrink-0" />
          <p className="text-sm text-tertiary-700 text-center">
            {announcement.message}
          </p>
        </div>
      </div>
    </div>
  );
}