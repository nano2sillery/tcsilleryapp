import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DateSelect({ value, onChange, error }: DateSelectProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
        Date du match
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={today}
        className={cn(
          "block w-full h-10 rounded-md border-gray-300 shadow-sm",
          "focus:border-primary-500 focus:ring-primary-500 sm:text-sm",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500"
        )}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}