import { Hero } from '@/components/hero';
import { StatsBanner } from '@/components/stats-banner';
import { ProtocolCard } from '@/components/protocol-card';
import { ThreatFeed } from '@/components/threat-feed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PROTOCOLS } from '@/lib/constants';
import { Shield, Zap, Brain, Lock } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Banner */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <StatsBanner />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How StacksGuard Works</h2>
            <p className="text-xl text-gray-600">
              Three-layer security powered by AI and on-chain verification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Gemini AI scans Clarity code for malicious patterns like as-contract abuse, 
                  reentrancy, and unauthorized mints in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>On-Chain Registry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Token reputation scores stored on Stacks blockchain. Protocols query 
                  before accepting deposits - malicious tokens get rejected.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Protocol Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  One-line integration for any Stacks DeFi protocol. Add security checks 
                  to deposit functions without changing your architecture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Protocol Health Dashboard */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Protocol Health</h2>
              <p className="text-gray-600">Real-time security scores for Stacks DeFi</p>
            </div>
            <Button variant="outline">View All Protocols</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROTOCOLS.map((protocol) => (
              <ProtocolCard key={protocol.name} {...protocol} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Threat Feed */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ThreatFeed />
        </div>
      </section>

      {/* The Problem: ALEX Hack */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                CRITICAL CASE STUDY
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">
                The $8.3M ALEX Hack Could Have Been Prevented
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                In June 2025, ALEX Protocol was exploited for $8.3M through a malicious token 
                with as-contract abuse. This was the SECOND time - they lost $4.3M in 2023 
                the exact same way.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-gray-700">Malicious token deployed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-gray-700">Fake transfer function with as-contract abuse</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-gray-700">No validation before accepting deposit</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-gray-700">Vault drained in minutes</span>
                </div>
              </div>
              <Link href="/alex-hack">
                <Button size="lg" variant="destructive">
                  Read Full Analysis →
                </Button>
              </Link>
            </div>

            <Card className="bg-white shadow-2xl border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">How StacksGuard Prevents This</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">1</span>
                    </div>
                    <div>
                      <div className="font-semibold">AI Detects Malicious Code</div>
                      <div className="text-sm text-gray-600">
                        StacksGuard AI scans the token contract and flags as-contract abuse pattern
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">2</span>
                    </div>
                    <div>
                      <div className="font-semibold">Token Flagged in Registry</div>
                      <div className="text-sm text-gray-600">
                        Risk score = 95/100 stored on-chain, accessible to all protocols
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">3</span>
                    </div>
                    <div>
                      <div className="font-semibold">ALEX Queries Registry</div>
                      <div className="text-sm text-gray-600">
                        Before accepting deposit, ALEX checks StacksGuard registry
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">4</span>
                    </div>
                    <div>
                      <div className="font-semibold">Transaction Rejected</div>
                      <div className="text-sm text-gray-600">
                        Malicious token blocked. $8.3M saved. Protocol secure.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$0 Lost</div>
                    <div className="text-sm text-gray-600">With StacksGuard</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to Secure Your Protocol?
          </h2>
          <p className="text-xl text-gray-600">
            Join the protocols protecting billions in Bitcoin-backed DeFi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="text-lg px-8 py-6">
                Try Live Demo
              </Button>
            </Link>
            <Link href="/analyze">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Analyze a Token
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
