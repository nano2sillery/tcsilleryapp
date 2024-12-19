import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_EMAILS } from '@/lib/constants';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import AdminBottomNav from './AdminBottomNav';

export default function AdminLayout() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email || '');
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar fixe en haut */}
      <AdminNavbar />
      
      <div className="flex h-full pt-16">
        {/* Sidebar pour desktop */}
        <AdminSidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 lg:pl-64 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Navigation mobile en bas */}
      <AdminBottomNav />
    </div>
  );
}