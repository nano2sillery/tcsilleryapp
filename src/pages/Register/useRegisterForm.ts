import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createPlayer } from '@/services/players';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import type { RegisterFormData } from './types';

export function useRegisterForm() {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const formMethods = useForm<RegisterFormData>();
  const { formState: { isSubmitting } } = formMethods;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setAuthError(null);
      const { user } = await registerAuth(data.email, data.password);
      
      await createPlayer({
        id: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        fftRanking: data.fftRanking,
        email: data.email
      });

      navigate('/');
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
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