'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { SimulationVault } from '@/components/simulation';
import { PlayCircle, RotateCcw, Zap } from 'lucide-react';

const INTEGRATION_CODE = `
;; How to integrate StacksGuard (3 lines of code)

(define-public (deposit-tokens (token <ft-trait>) (amount uint))
  (let ((is-flagged (contract-call? 
                      .token-reputation-registry 
                      is-token-flagged 
                      (contract-of token))))
    ;; StacksGuard Security Check
    (asserts! (not is-flagged) (err u403))
    
    ;; Rest of your deposit logic
    (ft-transfer? token amount tx-sender (as-contract tx-sender))
  ))
`;

export default function DemoPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const runSimulation = async () => {
    setIsRunning(true);
    setCurrentStep(0);

    // Run through 6 steps with delays
    for (let i = 1; i <= 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i);
    }

    setIsRunning(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold">
            <Zap className="w-4 h-4" />
            Interactive Demo
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold">
            See StacksGuard in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how StacksGuard prevents the ALEX-style attack in real-time
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={runSimulation}
            disabled={isRunning}
            size="lg"
            className="text-lg px-8 py-6 shadow-xl"
          >
            {isRunning ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-pulse" />
                Simulation Running...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5 mr-2" />
                Run Simulation
              </>
            )}
          </Button>

          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6"
            disabled={isRunning}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Simulation Comparison */}
        <div className="grid lg:grid-cols-2 gap-8">
          <SimulationVault 
            isProtected={false} 
            isRunning={isRunning} 
            currentStep={currentStep} 
          />
          <SimulationVault 
            isProtected={true} 
            isRunning={isRunning} 
            currentStep={currentStep} 
          />
        </div>

        {/* Key Differences */}
        {currentStep >= 6 && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle>What Made the Difference?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="font-bold text-red-700 flex items-center gap-2">
                    <span className="text-2xl">❌</span>
                    Unprotected Vault
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>No token validation before deposit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Blind trust in any SIP-010 token</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Malicious code executed unchecked</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Result: 100,000 STX stolen</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="font-bold text-green-700 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    StacksGuard Protected
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>AI scanned token contract before interaction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Detected as-contract abuse pattern</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Token flagged in on-chain registry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Result: Transaction rejected, $0 lost</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Integration Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold">Simple Integration</h2>
            <p className="text-xl text-gray-600">
              Add StacksGuard protection with just a few lines of code
            </p>
          </div>

          <CodeBlock code={INTEGRATION_CODE} language="clarity" />

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Integration Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1">Import StacksGuard Registry</div>
                    <p className="text-sm text-gray-700">
                      Reference the deployed token-reputation-registry contract
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1">Add Security Check</div>
                    <p className="text-sm text-gray-700">
                      Query the registry before accepting any token deposit
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1">Reject Flagged Tokens</div>
                    <p className="text-sm text-gray-700">
                      If token is flagged or has high risk score, reject the transaction
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1">Deploy & Monitor</div>
                    <p className="text-sm text-gray-700">
                      Your protocol is now protected. StacksGuard continuously monitors threats
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Benefits */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Instant Protection</h3>
              <p className="text-gray-700">
                Start protecting your protocol immediately after integration. No complex setup required.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Always Up-to-Date</h3>
              <p className="text-gray-700">
                StacksGuard AI continuously learns new attack patterns and updates the registry.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Community Powered</h3>
              <p className="text-gray-700">
                All protocols benefit when one reports a threat. Shared security for the entire ecosystem.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Protect Your Protocol?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join the protocols securing billions in Bitcoin-backed DeFi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/50">
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
