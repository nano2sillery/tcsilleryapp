import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmsButtonProps {
  phoneNumber: string;
  className?: string;
}

export default function SmsButton({ phoneNumber, className }: SmsButtonProps) {
  const handleClick = () => {
    // Nettoyer le numéro de téléphone (enlever les espaces)
    const cleanNumber = phoneNumber.replace(/\s/g, '');
    // Créer l'URL SMS
    const smsUrl = `sms:${cleanNumber}`;
    // Ouvrir l'application SMS native
    window.location.href = smsUrl;
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-full",
        "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
        "transition-colors duration-200",
        className
      )}
      title="Envoyer un SMS"
      aria-label="Envoyer un SMS"
    >
      <MessageCircle className="w-4 h-4" />
    </button>
  );
}