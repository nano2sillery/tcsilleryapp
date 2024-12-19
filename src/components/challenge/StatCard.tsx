import React, { useEffect, useState } from 'react';
import { useAnimatedValue } from '@/hooks/useAnimatedValue';

interface StatCardProps {
  label: string;
  value: number;
  maxValue: number;
  info: string;
  color: string;
}

export default function StatCard({ label, value, maxValue, info, color }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const animatedValue = useAnimatedValue(isVisible ? value : 0, 1500);
  const percentage = Math.min((animatedValue / maxValue) * 100, 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-card-${label}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [label]);

  return (
    <div className="relative" id={`stat-card-${label}`}>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-base font-semibold">{animatedValue.toFixed(1)}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">{info}</p>
    </div>
  );
}