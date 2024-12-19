import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import { AtSign, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import AuthCard from '@/components/auth/AuthCard';
import FormField from '@/components/auth/FormField';
import PasswordInput from '@/components/ui/PasswordInput';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setAuthError(null);
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setAuthError(getAuthErrorMessage(error.code));
    }
  };

  return (
    <AuthCard 
      title="Connexion" 
      subtitle="Accédez à votre espace joueur"
    >
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
    </AuthCard>
  );
}