import React from 'react';
import { cn } from '@/lib/utils';
import { Underline } from './Underline';
import { Dots } from './Dots';
import type { PageTitleProps } from './types';

export default function PageTitle({ 
  children,
  subtitle,
  variant = 'default',
  className 
}: PageTitleProps) {
  return (
    <div className={cn(
      "relative space-y-4 mb-8",
      "px-4 py-6 bg-white/40 backdrop-blur-sm rounded-xl shadow-sm",
      className
    )}>
      <h1 className={cn(
        "text-2xl sm:text-3xl font-bold text-center",
        "relative z-10",
        variant === 'default' ? "text-tertiary-600" : "text-primary-600"
      )}>
        {children}
      </h1>

      {subtitle && (
        <p className="text-sm sm:text-base text-center text-gray-600 relative z-10">
          {subtitle}
        </p>
      )}

      <Underline variant={variant} />
      <Dots variant={variant} />
    </div>
  );
}