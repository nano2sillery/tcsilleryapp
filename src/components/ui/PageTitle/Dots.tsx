import React from 'react';
import { cn } from '@/lib/utils';
import type { TitleVariant } from './types';

interface DotsProps {
  variant: TitleVariant;
}

export function Dots({ variant }: DotsProps) {
  const getColor = (variant: TitleVariant) => {
    switch (variant) {
      case 'primary': return 'bg-primary-500/10';
      default: return 'bg-tertiary-500/10';
    }
  };

  return (
    <div className="absolute -z-10 inset-0">
      <div className="absolute -top-4 -left-4 w-24 h-24">
        <div className={cn(
          "w-2 h-2 rounded-full absolute",
          getColor(variant)
        )} style={{ top: '40%', left: '40%' }} />
        <div className={cn(
          "w-2 h-2 rounded-full absolute",
          getColor(variant)
        )} style={{ top: '60%', left: '30%' }} />
        <div className={cn(
          "w-2 h-2 rounded-full absolute",
          getColor(variant)
        )} style={{ top: '30%', left: '60%' }} />
      </div>
      <div className="absolute -top-4 -right-4 w-24 h-24 transform rotate-90">
        <div className={cn(
          "w-2 h-2 rounded-full absolute",
          getColor(variant)
        )} style={{ top: '40%', left: '40%' }} />
        <div className={cn(
          "w-2 h-2 rounded-full absolute",
          getColor(variant)
        )} style={{ top: '60%', left: '30%' }} />
        <div className={cn(
          "w-2 h-2 rounded-full absolute",
          getColor(variant)
        )} style={{ top: '30%', left: '60%' }} />
      </div>
    </div>
  );
}