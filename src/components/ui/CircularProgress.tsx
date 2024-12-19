import React, { useEffect, useState } from 'react';
import { useAnimatedValue } from '@/hooks/useAnimatedValue';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export default function CircularProgress({
  value = 0,
  maxValue = 100,
  size = 80,
  strokeWidth = 4,
  color = '#324178',
  label,
  sublabel,
  icon
}: CircularProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const animatedValue = useAnimatedValue(isVisible ? value : 0, 1500);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min((animatedValue || 0) / maxValue, 1);
  const offset = circumference - (progress * circumference);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`circular-progress-${label}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [label]);

  // Ensure we have valid numbers for display
  const displayValue = Math.round(animatedValue || 0);

  return (
    <div 
      className="flex flex-col items-center" 
      id={`circular-progress-${label}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            stroke={color}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: offset,
              strokeLinecap: 'round'
            }}
          />
        </svg>
        {/* Center content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color }}
        >
          {icon && (
            <div className="mb-[1px]">{icon}</div>
          )}
          <span className={cn(
            "font-bold leading-none",
            size <= 80 ? "text-base" : "text-lg"
          )}>
            {displayValue}
          </span>
          {sublabel && (
            <span className="text-[9px] text-gray-500 leading-none mt-[1px]">
              {sublabel}
            </span>
          )}
        </div>
      </div>
      <span className="mt-1 text-[10px] font-medium text-gray-600 leading-tight">
        {label}
      </span>
    </div>
  );
}