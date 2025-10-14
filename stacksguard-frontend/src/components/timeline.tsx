'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, DollarSign, Shield, TrendingDown } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  amount?: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    date: 'October 2023',
    title: 'First ALEX Exploit',
    description: 'Initial attack through malicious token with as-contract abuse. Community shocked but protocol recovers.',
    amount: '$4.3M Stolen',
    type: 'danger',
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    date: 'Nov 2023 - May 2025',
    title: 'Recovery Period',
    description: 'ALEX rebuilds trust, implements some security measures, TVL gradually recovers to pre-hack levels.',
    type: 'info',
    icon: <TrendingDown className="w-6 h-6" />,
  },
  {
    date: 'June 2025',
    title: 'Second ALEX Exploit',
    description: 'Lightning strikes twice. Same attack vector exploited again. Attacker uses identical malicious token pattern.',
    amount: '$8.3M Stolen',
    type: 'danger',
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    date: 'Current',
    title: 'Post-Mortem Reality',
    description: 'Total damages exceed $12.6M. Trust severely damaged. Institutional capital afraid to enter Stacks DeFi.',
    type: 'warning',
    icon: <DollarSign className="w-6 h-6" />,
  },
];

export function Timeline() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'danger':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'success':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'danger':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'success':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-gray-300" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative flex gap-6">
            {/* Icon */}
            <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${getIconColor(event.type)} flex items-center justify-center shadow-lg`}>
              {event.icon}
            </div>

            {/* Content */}
            <Card className={`flex-1 border-2 ${getTypeColor(event.type)} hover:shadow-xl transition-all`}>
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">
                      {event.date}
                    </div>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </div>
                  {event.amount && (
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {event.amount}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
