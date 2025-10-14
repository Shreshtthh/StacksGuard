'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RiskGauge({ score, size = 'md', showLabel = true }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (score: number) => {
    if (score >= 71) return 'text-red-600';
    if (score >= 31) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 71) return '#dc2626';
    if (score >= 31) return '#ca8a04';
    return '#16a34a';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 71) return 'HIGH RISK';
    if (score >= 31) return 'MEDIUM RISK';
    return 'LOW RISK';
  };

  const sizes = {
    sm: { width: 120, strokeWidth: 8, fontSize: 'text-xl' },
    md: { width: 200, strokeWidth: 12, fontSize: 'text-4xl' },
    lg: { width: 280, strokeWidth: 16, fontSize: 'text-6xl' },
  };

  const { width, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width, height: width }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={width} height={width}>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated progress circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getStrokeColor(score)}40)`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn(fontSize, 'font-bold', getColor(score))}>
            {Math.round(animatedScore)}
          </div>
          <div className="text-xs text-gray-500 font-medium">/ 100</div>
        </div>
      </div>

      {showLabel && (
        <div className={cn('text-sm font-bold px-4 py-1.5 rounded-full', getColor(score))}>
          {getRiskLevel(score)}
        </div>
      )}
    </div>
  );
}
