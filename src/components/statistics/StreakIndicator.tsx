import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakIndicatorProps {
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
}

export default function StreakIndicator({ currentStreak, longestStreak, isActive }: StreakIndicatorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
        <Flame className="w-4 h-4 text-orange-500 mr-2" />
        Séries de victoires
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className={cn(
            "text-2xl font-bold mb-1",
            isActive ? "text-orange-500" : "text-gray-600"
          )}>
            {currentStreak}
          </div>
          <div className="text-xs text-gray-500">Série actuelle</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold mb-1 text-blue-500">
            {longestStreak}
          </div>
          <div className="text-xs text-gray-500">Record</div>
        </div>
      </div>
    </div>
  );
}