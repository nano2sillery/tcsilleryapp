import React from 'react';
import { cn } from '@/lib/utils';

interface AdminContentCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminContentCard({ children, className }: AdminContentCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-6",
      "flex flex-col min-h-[calc(100vh-13rem)]",
      className
    )}>
      {children}
    </div>
  );
}