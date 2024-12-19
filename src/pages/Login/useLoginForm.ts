import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import type { LoginFormData } from './types';

export function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const formMethods = useForm<LoginFormData>();
  const { formState: { isSubmitting } } = formMethods;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError(null);
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setAuthError(getAuthErrorMessage(error.code));
    }
  };

  return {
    formMethods,
    onSubmit,
    isSubmitting,
    authError
  };
}