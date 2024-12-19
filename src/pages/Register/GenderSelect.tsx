import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { RegisterFormData } from './types';

interface GenderSelectProps {
  register: UseFormRegister<RegisterFormData>;
  error?: string;
}

export default function GenderSelect({ register, error }: GenderSelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">Genre</label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="M"
            {...register('gender', { required: 'Genre requis' })}
            className="mr-2"
          />
          <span className="text-sm">Homme</span>
        </label>
        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="F"
            {...register('gender', { required: 'Genre requis' })}
            className="mr-2"
          />
          <span className="text-sm">Femme</span>
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}