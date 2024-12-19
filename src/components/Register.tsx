import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createPlayer } from '@/services/players';
import { FFT_RANKINGS } from '@/lib/constants';
import { AtSign, Lock, User, Phone, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AuthCard from '@/components/auth/AuthCard';
import FormField from '@/components/auth/FormField';
import Select from '@/components/ui/Select';

// ... reste du code inchangé ...

<div className="space-y-1">
  <Select
    label="Classement FFT"
    icon={<Trophy className="w-4 h-4" />}
    {...register('fftRanking', { required: 'Classement FFT requis' })}
    error={errors.fftRanking?.message}
  >
    <option value="">Sélectionnez votre classement</option>
    {FFT_RANKINGS.map((ranking) => (
      <option key={ranking} value={ranking}>
        {ranking}
      </option>
    ))}
  </Select>
</div>

// ... reste du code inchangé ...