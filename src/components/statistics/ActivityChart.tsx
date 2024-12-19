import React from 'react';
import { Calendar } from 'lucide-react';

interface ActivityChartProps {
  matchesByMonth: Record<string, number>;
}

export default function ActivityChart({ matchesByMonth }: ActivityChartProps) {
  const maxMatches = Math.max(...Object.values(matchesByMonth));
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
        <Calendar className="w-4 h-4 text-tertiary-500 mr-2" />
        Activité mensuelle
      </h3>
      
      <div className="grid grid-cols-6 gap-1 h-24">
        {Object.entries(matchesByMonth).map(([month, count]) => {
          const height = `${(count / maxMatches) * 100}%`;
          return (
            <div key={month} className="flex flex-col items-center">
              <div className="flex-1 w-full flex items-end">
                <div 
                  className="w-full bg-tertiary-100 rounded-sm transition-all duration-300"
                  style={{ height }}
                />
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                {month.slice(0, 3)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}