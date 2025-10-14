'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { LIVE_THREATS } from '@/lib/constants';
import { Threat } from '@/types';

function ThreatItem({ threat }: { threat: Threat }) {
  const getSeverityIcon = () => {
    switch (threat.severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityColor = () => {
    switch (threat.severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getStatusBadge = () => {
    switch (threat.status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'investigating':
        return <Badge variant="secondary">Investigating</Badge>;
      default:
        return <Badge>Resolved</Badge>;
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getSeverityColor()} hover:shadow-md transition-all`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">{getSeverityIcon()}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="font-bold text-sm">{threat.type}</div>
            {getStatusBadge()}
          </div>
          <div className="text-sm text-gray-700">{threat.description}</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{threat.protocol}</span>
            <span className="text-gray-400">{threat.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThreatFeed() {
  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            Live Threat Feed
          </CardTitle>
          <Badge variant="destructive">
            {LIVE_THREATS.filter(t => t.status === 'active').length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
        {LIVE_THREATS.map((threat) => (
          <ThreatItem key={threat.id} threat={threat} />
        ))}
      </CardContent>
    </Card>
  );
}
