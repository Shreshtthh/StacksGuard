'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface SimulationStep {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  vaultBalance?: number;
  attackerBalance?: number;
}

interface SimulationProps {
  isProtected: boolean;
  isRunning: boolean;
  currentStep: number;
}

export function SimulationVault({ isProtected, isRunning, currentStep }: SimulationProps) {
  const [balance, setBalance] = useState(100000);
  const [attackerBalance, setAttackerBalance] = useState(0);
  const [logs, setLogs] = useState<SimulationStep[]>([]);

  useEffect(() => {
    if (!isRunning) {
      setBalance(100000);
      setAttackerBalance(0);
      setLogs([]);
      return;
    }

    const steps: SimulationStep[] = isProtected ? [
      { id: 1, message: 'Attacker deploys malicious token', type: 'info' },
      { id: 2, message: 'Attempting deposit to vault...', type: 'info' },
      { id: 3, message: 'StacksGuard AI analyzing contract...', type: 'warning' },
      { id: 4, message: 'AI detected: as-contract abuse pattern', type: 'danger' },
      { id: 5, message: 'Registry check: Token FLAGGED (Score: 95/100)', type: 'danger' },
      { id: 6, message: 'Transaction REJECTED by StacksGuard', type: 'success', vaultBalance: 100000, attackerBalance: 0 },
    ] : [
      { id: 1, message: 'Attacker deploys malicious token', type: 'info' },
      { id: 2, message: 'Attempting deposit to vault...', type: 'info' },
      { id: 3, message: 'No validation - token accepted', type: 'warning', vaultBalance: 100000 },
      { id: 4, message: 'Malicious transfer function executing...', type: 'danger' },
      { id: 5, message: 'VAULT DRAINED via as-contract abuse!', type: 'danger', vaultBalance: 0, attackerBalance: 100000 },
      { id: 6, message: 'Attack successful - funds stolen', type: 'danger', vaultBalance: 0, attackerBalance: 100000 },
    ];

    if (currentStep > 0 && currentStep <= steps.length) {
      const step = steps[currentStep - 1];
      setLogs(prev => [...prev, step]);
      
      if (step.vaultBalance !== undefined) {
        setBalance(step.vaultBalance);
      }
      if (step.attackerBalance !== undefined) {
        setAttackerBalance(step.attackerBalance);
      }
    }
  }, [currentStep, isRunning, isProtected]);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'danger':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <Loader2 className="w-4 h-4 text-yellow-600 animate-spin" />;
      default:
        return <Shield className="w-4 h-4 text-blue-600" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'danger':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <Card className={`border-2 ${isProtected ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
      <CardHeader className={isProtected ? 'bg-green-100' : 'bg-red-100'}>
        <CardTitle className="flex items-center gap-2">
          {isProtected ? (
            <>
              <Shield className="w-6 h-6 text-green-600" />
              <span className="text-green-700">StacksGuard Protected Vault</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <span className="text-red-700">Unprotected Vault</span>
            </>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Balance Display */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono shadow-inner">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Vault Balance:</span>
              <motion.span 
                key={balance}
                initial={{ scale: 1.2, color: '#22c55e' }}
                animate={{ scale: 1, color: balance === 0 ? '#ef4444' : '#22c55e' }}
                className="text-2xl font-bold"
              >
                {balance.toLocaleString()} STX
              </motion.span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Attacker Balance:</span>
              <motion.span 
                key={attackerBalance}
                initial={{ scale: 1.2, color: '#ef4444' }}
                animate={{ scale: 1, color: attackerBalance > 0 ? '#ef4444' : '#6b7280' }}
                className="text-2xl font-bold"
              >
                {attackerBalance.toLocaleString()} STX
              </motion.span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="text-center">
          {balance === 100000 && attackerBalance === 0 && currentStep >= 6 && (
            <Badge className="bg-green-600 text-white text-lg px-6 py-2">
              ✅ VAULT SECURE
            </Badge>
          )}
          {balance === 0 && attackerBalance === 100000 && (
            <Badge variant="destructive" className="text-lg px-6 py-2">
              🚨 VAULT COMPROMISED
            </Badge>
          )}
        </div>

        {/* Activity Log */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-700 mb-3">Activity Log</div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 max-h-[300px] overflow-y-auto space-y-2">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2 text-sm"
                >
                  {getLogIcon(log.type)}
                  <span className={getLogColor(log.type)}>{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {logs.length === 0 && (
              <div className="text-gray-400 text-sm text-center py-4">
                No activity yet. Click "Run Simulation" to start.
              </div>
            )}
          </div>
        </div>

        {/* Final Result */}
        {currentStep >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg border-2 ${
              isProtected 
                ? 'bg-green-50 border-green-300' 
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="text-center space-y-2">
              {isProtected ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <div className="text-2xl font-bold text-green-700">ATTACK PREVENTED</div>
                  <div className="text-sm text-gray-700">
                    StacksGuard detected and blocked the malicious token
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-red-600 mx-auto" />
                  <div className="text-2xl font-bold text-red-700">ATTACK SUCCESSFUL</div>
                  <div className="text-sm text-gray-700">
                    100,000 STX stolen due to lack of security measures
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
