import React from 'react';
import { useRegisterForm } from './useRegisterForm';
import RegisterForm from './RegisterForm';
import AuthCard from '@/components/auth/AuthCard';

export default function Register() {
  const { formMethods, onSubmit, isSubmitting, authError } = useRegisterForm();

  return (
    <AuthCard 
      title="Inscription" 
      subtitle="Créez votre compte joueur"
    >
      <RegisterForm 
        formMethods={formMethods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        authError={authError}
      />
    </AuthCard>
  );
}