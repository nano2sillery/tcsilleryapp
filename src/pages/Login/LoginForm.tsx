import React from 'react';
import { Link } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import { AtSign, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import PasswordInput from '@/components/ui/PasswordInput';
import type { LoginFormData } from './types';

interface LoginFormProps {
  formMethods: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => Promise<void>;
  isSubmitting: boolean;
  authError: string | null;
}

export default function LoginForm({
  formMethods,
  onSubmit,
  isSubmitting,
  authError
}: LoginFormProps) {
  const { register, handleSubmit, formState: { errors } } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Email"
        type="email"
        icon={<AtSign className="w-4 h-4" />}
        {...register('email', { 
          required: 'Email requis',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email invalide'
          }
        })}
        error={errors.email?.message}
        autoComplete="email"
      />

      <PasswordInput
        label="Mot de passe"
        icon={<Lock className="w-4 h-4" />}
        {...register('password', { 
          required: 'Mot de passe requis'
        })}
        error={errors.password?.message}
        autoComplete="current-password"
      />

      {authError && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600 text-center">{authError}</p>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-tertiary-500 hover:bg-tertiary-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </Button>

      <p className="text-sm text-center text-gray-600">
        Pas encore de compte ?{' '}
        <Link to="/register" className="font-medium text-tertiary-500 hover:text-tertiary-600">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}