'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface StatProps {
  label: string;
  value: string;
  change?: string;
  color: string;
}

function AnimatedStat({ label, value, change, color }: StatProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    // Animate number counting
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const formatted = value.includes('M') 
          ? `$${Math.floor(current / 1000000)}M`
          : value.includes('K')
          ? `$${Math.floor(current / 1000)}K`
          : Math.floor(current).toString();
        setDisplayValue(formatted);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all group">
      <div className="space-y-2">
        <div className={`text-4xl font-bold ${color} group-hover:scale-110 transition-transform`}>
          {displayValue}
        </div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
        {change && (
          <div className="text-xs text-green-600 font-semibold">
            {change}
          </div>
        )}
      </div>
    </Card>
  );
}

export function StatsBanner() {
  const stats = [
    {
      label: 'Tokens Scanned',
      value: '1247',
      change: '+124 this week',
      color: 'text-blue-600',
    },
    {
      label: 'Threats Detected',
      value: '23',
      change: '+3 today',
      color: 'text-red-600',
    },
    {
      label: 'Protocols Monitored',
      value: '4',
      color: 'text-green-600',
    },
    {
      label: 'Value Secured',
      value: '$45M',
      change: '+$12M this month',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
