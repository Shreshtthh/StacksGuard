import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timeline } from '@/components/timeline';
import { CodeBlock } from '@/components/code-block';
import { AlertTriangle, Shield, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MALICIOUS_CODE = `
;; Malicious ALEX-like Token
;; This is a SIMPLIFIED example of the attack pattern

(define-fungible-token malicious-token)

(define-public (transfer-from 
  (sender principal) 
  (recipient principal) 
  (amount uint))
  (begin
    ;; CRITICAL VULNERABILITY: as-contract abuse
    ;; This allows the attacker to impersonate the ALEX vault
    ;; and drain funds directly
    (as-contract 
      (stx-transfer? u1000000 'ST1VAULT-ADDRESS tx-sender))
    
    ;; Returns success to trick the protocol
    (ok true)
  ))

(define-public (mint (amount uint) (recipient principal))
  ;; VULNERABILITY 2: No access control
  ;; Anyone can mint unlimited tokens
  (ft-mint? malicious-token amount recipient)
)
`;

const PROTECTED_CODE = `
;; StacksGuard Protected Vault

(define-constant REGISTRY .token-reputation-registry)
(define-constant ERR-TOKEN-FLAGGED (err u403))

(define-public (deposit-token 
  (token-contract principal)
  (amount uint))
  (let (
    (is-flagged (unwrap! 
      (contract-call? REGISTRY is-token-flagged token-contract) 
      ERR-TOKEN-FLAGGED))
    (token-score (unwrap! 
      (contract-call? REGISTRY get-token-score token-contract) 
      ERR-TOKEN-FLAGGED))
  )
    ;; StacksGuard Security Check
    (asserts! (not is-flagged) ERR-TOKEN-FLAGGED)
    (asserts! (< token-score u70) ERR-TOKEN-FLAGGED)
    
    ;; If checks pass, accept deposit
    ;; ... rest of deposit logic
    (ok amount)
  ))
`;

export default function AlexHackPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="destructive" className="text-lg px-4 py-2">
            CRITICAL CASE STUDY
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold">
            The $12.6M ALEX Protocol Hacks
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How the same exploit drained ALEX twice, and why StacksGuard would have prevented both attacks
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">$12.6M</div>
              <div className="text-sm text-gray-700">Total Stolen</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2x</div>
              <div className="text-sm text-gray-700">Same Attack Vector</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">2 Years</div>
              <div className="text-sm text-gray-700">Between Exploits</div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            Attack Timeline
          </h2>
          <Timeline />
        </section>

        {/* How the Attack Worked */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Code className="w-8 h-8 text-blue-600" />
            Technical Breakdown
          </h2>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Attack Execution - Step by Step</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">Attacker Deploys Malicious Token</div>
                    <p className="text-gray-700 mb-3">
                      The attacker creates a fake SIP-010 token contract on Stacks blockchain. 
                      The contract looks legitimate at first glance but contains hidden malicious code.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">Malicious Transfer Function</div>
                    <p className="text-gray-700 mb-3">
                      The token's <code className="bg-gray-100 px-2 py-1 rounded">transfer-from</code> function 
                      contains <code className="bg-gray-100 px-2 py-1 rounded">as-contract</code> abuse - 
                      allowing it to impersonate the ALEX vault contract.
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <p className="text-sm font-semibold text-red-800">
                        🚨 as-contract allows code to execute with the contract's own principal, 
                        bypassing normal authorization checks
                      </p>
                    </div>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">ALEX Accepts Deposit</div>
                    <p className="text-gray-700 mb-3">
                      ALEX protocol has no pre-deposit validation. It blindly accepts any token 
                      claiming to implement the SIP-010 standard. No security checks, no allowlist.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">Malicious Code Executes</div>
                    <p className="text-gray-700 mb-3">
                      When ALEX calls the token's transfer function, the malicious code runs. 
                      Using as-contract, it impersonates ALEX's vault and drains STX directly to the attacker.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">Funds Bridged Away</div>
                    <p className="text-gray-700 mb-3">
                      Attacker bridges stolen STX to Bitcoin. Funds are now completely unrecoverable. 
                      ALEX and users suffer massive losses.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Code Comparison */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">The Malicious Code</h2>
          <CodeBlock code={MALICIOUS_CODE} language="clarity" />
        </section>

        {/* Side by Side Comparison */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-600" />
            How StacksGuard Prevents This
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Without StacksGuard */}
            <Card className="border-2 border-red-200 bg-red-50/50">
              <CardHeader className="bg-red-100">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Without StacksGuard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Malicious token deployed</span>
                      <div className="text-gray-600">No validation before deployment</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Vault accepts token</span>
                      <div className="text-gray-600">No pre-deposit security checks</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Malicious function executes</span>
                      <div className="text-gray-600">as-contract drains vault</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Funds stolen</span>
                      <div className="text-gray-600">Bridged to Bitcoin, unrecoverable</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-red-300">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600">-$8.3M</div>
                      <div className="text-sm text-gray-600 mt-1">Lost</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* With StacksGuard */}
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  With StacksGuard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Malicious token deployed</span>
                      <div className="text-gray-600">Deployment occurs on-chain</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">AI detects malicious patterns</span>
                      <div className="text-gray-600">as-contract abuse flagged immediately</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Token flagged in registry</span>
                      <div className="text-gray-600">Risk score: 95/100 stored on-chain</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✗
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Vault queries registry</span>
                      <div className="text-gray-600">Deposit REJECTED - token flagged</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-green-300">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">$0</div>
                      <div className="text-sm text-gray-600 mt-1">Lost - Attack Prevented</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Protected Implementation */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">StacksGuard Integration Code</h2>
          <p className="text-gray-600">
            One simple check before accepting deposits - that's all it takes to prevent the next ALEX hack
          </p>
          <CodeBlock code={PROTECTED_CODE} language="clarity" />
        </section>

        {/* Lessons Learned */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl">Key Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-bold mb-1">Trust No Token Without Verification</div>
                  <p className="text-sm text-gray-700">
                    Even legitimate-looking tokens can contain malicious code. Always validate before interaction.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-bold mb-1">as-contract is a Critical Vulnerability Vector</div>
                  <p className="text-sm text-gray-700">
                    This Clarity feature is powerful but dangerous. Proper security checks are essential.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-bold mb-1">Security Must Be Proactive, Not Reactive</div>
                  <p className="text-sm text-gray-700">
                    Waiting until after an exploit is too late. Prevention through pre-integration checks is the only answer.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Don't Be the Next ALEX</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Protect your protocol with StacksGuard's AI-powered security infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  See Live Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/analyze">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/50">
                  Analyze Your Token
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
