import React from 'react';
import { useLoginForm } from './useLoginForm';
import LoginForm from './LoginForm';
import AuthCard from '@/components/auth/AuthCard';

export default function Login() {
  const { formMethods, onSubmit, isSubmitting, authError } = useLoginForm();

  return (
    <AuthCard 
      title="Connexion" 
      subtitle="Accédez à votre espace joueur"
    >
      <LoginForm 
        formMethods={formMethods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        authError={authError}
      />
    </AuthCard>
  );
}