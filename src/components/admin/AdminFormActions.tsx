import React from 'react';
import { cn } from '@/lib/utils';

interface AdminFormActionsProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminFormActions({ children, className }: AdminFormActionsProps) {
  return (
    <div className={cn(
      "mt-auto pt-6 flex flex-col sm:flex-row sm:justify-end gap-3",
      className
    )}>
      {children}
    </div>
  );
}