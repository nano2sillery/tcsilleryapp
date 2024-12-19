import React from 'react';
import { cn } from '@/lib/utils';
import type { TitleVariant } from './types';

interface UnderlineProps {
  variant: TitleVariant;
}

export function Underline({ variant }: UnderlineProps) {
  return (
    <div className="flex justify-center">
      <div className={cn(
        "h-1 w-20 rounded-full",
        "bg-gradient-to-r",
        variant === 'default' && "from-tertiary-500 to-tertiary-600",
        variant === 'primary' && "from-primary-500 to-primary-600"
      )} />
    </div>
  );
}