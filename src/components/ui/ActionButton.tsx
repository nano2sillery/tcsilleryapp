import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
}

export default function ActionButton({ 
  icon: Icon,
  variant = 'primary',
  size = 'sm',
  className,
  ...props 
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors",
        // Variants
        variant === 'primary' && "bg-tertiary-500 text-white hover:bg-tertiary-600",
        variant === 'secondary' && "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
        variant === 'danger' && "bg-white text-red-600 border border-red-200 hover:bg-red-50",
        // Sizes
        size === 'sm' && "p-1",
        size === 'md' && "p-2",
        className
      )}
      {...props}
    >
      <Icon className={cn(
        "flex-shrink-0",
        size === 'sm' && "h-4 w-4",
        size === 'md' && "h-5 w-5"
      )} />
    </button>
  );
}