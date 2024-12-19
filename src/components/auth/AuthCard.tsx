import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 bg-tennis-pattern">
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/70 -z-10" />
      
      <div className={cn("w-full max-w-md", className)}>
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img 
              src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
              alt="Tennis Club de Sillery"
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto object-contain"
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-tertiary-500">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="mt-8 bg-white/90 backdrop-blur-sm py-8 px-6 shadow-sm rounded-xl">
          {children}
        </div>
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-tertiary-200/20 via-tertiary-200/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-tertiary-200/20 via-tertiary-200/10 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tertiary-200/20 to-transparent" />
      </div>
    </div>
  );
}