import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuthCheck } from './hooks/useAuthCheck';
import AppRoutes from './routes';
import ConnectionStatus from './components/ConnectionStatus';

function AuthCheck({ children }: { children: React.ReactNode }) {
  useAuthCheck();
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthCheck>
          <ConnectionStatus />
          <AppRoutes />
        </AuthCheck>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;