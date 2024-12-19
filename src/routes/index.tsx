import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/admin/AdminLayout';

// Public pages
import Welcome from '@/pages/Welcome';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// Protected pages
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Matches from '@/pages/Matches';
import NewMatch from '@/pages/NewMatch';
import Players from '@/pages/Players';
import Rankings from '@/pages/Rankings';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminPlayers from '@/pages/admin/Players';
import CreatePlayer from '@/pages/admin/CreatePlayer';
import EditPlayer from '@/pages/admin/EditPlayer';
import AdminMatches from '@/pages/admin/Matches';
import EditMatch from '@/pages/admin/EditMatch';
import Announcements from '@/pages/admin/Announcements';
import CreateAnnouncement from '@/pages/admin/CreateAnnouncement';
import EditAnnouncement from '@/pages/admin/EditAnnouncement';
import AdminSettings from '@/pages/admin/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-tertiary-500">Chargement...</div>
    </div>;
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/welcome" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-tertiary-500">Chargement...</div>
    </div>;
  }
  
  return !currentUser ? <>{children}</> : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="welcome" element={
          <PublicRoute>
            <Welcome />
          </PublicRoute>
        } />
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Protected routes */}
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="matches" element={
          <PrivateRoute>
            <Matches />
          </PrivateRoute>
        } />
        <Route path="matches/new" element={
          <PrivateRoute>
            <NewMatch />
          </PrivateRoute>
        } />
        <Route path="players" element={
          <PrivateRoute>
            <Players />
          </PrivateRoute>
        } />
        <Route path="rankings" element={
          <PrivateRoute>
            <Rankings />
          </PrivateRoute>
        } />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="players" element={<AdminPlayers />} />
        <Route path="players/create" element={<CreatePlayer />} />
        <Route path="players/:id/edit" element={<EditPlayer />} />
        <Route path="matches" element={<AdminMatches />} />
        <Route path="matches/:id/edit" element={<EditMatch />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="announcements/create" element={<CreateAnnouncement />} />
        <Route path="announcements/:id/edit" element={<EditAnnouncement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;