'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from 'lucide-react';
import Link from 'next/link';
import { Protocol } from '@/types';
import { getRiskLevel, getRiskColorClass, getRiskBgClass } from '@/lib/utils';

interface ProtocolCardProps extends Protocol {}

export function ProtocolCard({
  name,
  score,
  audits,
  incidents,
  status,
  lastUpdated,
  tvl,
  category,
}: ProtocolCardProps) {
  const riskLevel = getRiskLevel(score);
  const isHighRisk = score >= 71;
  const isMediumRisk = score >= 31 && score < 71;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-2 hover:border-blue-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
              {name}
            </CardTitle>
            {category && (
              <div className="text-xs text-gray-500 font-medium">{category}</div>
            )}
          </div>
          <div className={`w-4 h-4 rounded-full ${getRiskBgClass(score)} shadow-lg animate-pulse`} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Risk Score */}
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-5xl font-bold ${getRiskColorClass(score)}`}>
              {score}
              <span className="text-2xl text-gray-400">/100</span>
            </div>
            <Badge 
              variant={isHighRisk ? 'destructive' : isMediumRisk ? 'secondary' : 'default'}
              className="mt-2"
            >
              {riskLevel}
            </Badge>
          </div>
          
          {/* Icon */}
          <div className="relative">
            {isHighRisk ? (
              <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
            ) : (
              <Shield className="w-16 h-16 text-green-500" />
            )}
            <div className={`absolute inset-0 ${isHighRisk ? 'bg-red-500' : 'bg-green-500'} blur-xl opacity-30`} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-gray-500">Audits</div>
            <div className="font-bold text-lg">{audits}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Incidents</div>
            <div className={`font-bold text-lg ${incidents > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {incidents}
            </div>
          </div>
          {tvl && (
            <div className="space-y-1 col-span-2">
              <div className="text-gray-500">Total Value Locked</div>
              <div className="font-bold text-lg text-purple-600">{tvl}</div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="pt-3 border-t space-y-2">
          <div className="text-sm font-medium text-gray-700">{status}</div>
          <div className="text-xs text-gray-500">Updated: {lastUpdated}</div>
        </div>

        {/* Action Button */}
        <Link href={`/protocol/${name.toLowerCase()}`}>
          <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all">
            View Details →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
