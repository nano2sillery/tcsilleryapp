import React from 'react';
import { Link } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import { FFT_RANKINGS } from '@/lib/constants';
import { AtSign, Lock, User, Phone, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import PasswordInput from '@/components/ui/PasswordInput';
import Select from '@/components/ui/Select';
import GenderSelect from './GenderSelect';
import type { RegisterFormData } from './types';

interface RegisterFormProps {
  formMethods: UseFormReturn<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isSubmitting: boolean;
  authError: string | null;
}

export default function RegisterForm({
  formMethods,
  onSubmit,
  isSubmitting,
  authError
}: RegisterFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = formMethods;
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Prénom"
          icon={<User className="w-4 h-4" />}
          {...register('firstName', { required: 'Prénom requis' })}
          error={errors.firstName?.message}
        />
        
        <FormField
          label="Nom"
          icon={<User className="w-4 h-4" />}
          {...register('lastName', { required: 'Nom requis' })}
          error={errors.lastName?.message}
        />
      </div>

      <GenderSelect
        register={register}
        error={errors.gender?.message}
      />

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
      />

      <PasswordInput
        label="Mot de passe"
        icon={<Lock className="w-4 h-4" />}
        {...register('password', {
          required: 'Mot de passe requis',
          minLength: {
            value: 6,
            message: 'Le mot de passe doit contenir au moins 6 caractères'
          }
        })}
        error={errors.password?.message}
      />

      <PasswordInput
        label="Confirmer le mot de passe"
        icon={<Lock className="w-4 h-4" />}
        {...register('confirmPassword', {
          required: 'Veuillez confirmer votre mot de passe',
          validate: value => 
            value === password || 'Les mots de passe ne correspondent pas'
        })}
        error={errors.confirmPassword?.message}
      />

      <FormField
        label="Téléphone"
        icon={<Phone className="w-4 h-4" />}
        {...register('phoneNumber', {
          required: 'Numéro de téléphone requis',
          pattern: {
            value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: 'Numéro de téléphone invalide'
          }
        })}
        error={errors.phoneNumber?.message}
        placeholder="06 12 34 56 78"
      />

      <Select
        label="Classement FFT"
        icon={<Trophy className="w-4 h-4" />}
        defaultValue=""
        {...register('fftRanking', { required: 'Classement FFT requis' })}
        error={errors.fftRanking?.message}
      >
        <option value="" disabled>Sélectionnez votre classement</option>
        {FFT_RANKINGS.map((ranking) => (
          <option key={ranking} value={ranking}>{ranking}</option>
        ))}
      </Select>

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
        {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
      </Button>

      <p className="text-sm text-center text-gray-600">
        Déjà inscrit ?{' '}
        <Link to="/login" className="font-medium text-tertiary-500 hover:text-tertiary-600">
          Connectez-vous
        </Link>
      </p>
    </form>
  );
}