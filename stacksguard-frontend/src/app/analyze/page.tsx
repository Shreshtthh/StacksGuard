'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/risk-gauge';
import { CodeBlock } from '@/components/code-block';
import { Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { DEMO_MALICIOUS_CONTRACT, DEMO_SAFE_CONTRACT } from '@/lib/constants';
import { AnalysisResult } from '@/types';

export default function AnalyzePage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeContract = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractCode: code }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      setResult({
        score: 0,
        threats: ['Analysis failed. Please try again.'],
        reasoning: 'Unable to complete analysis.',
        recommendation: 'MEDIUM RISK',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMaliciousDemo = () => {
    setCode(DEMO_MALICIOUS_CONTRACT);
    setResult(null);
  };

  const loadSafeDemo = () => {
    setCode(DEMO_SAFE_CONTRACT);
    setResult(null);
  };

  const getRiskIcon = (score: number) => {
    if (score >= 71) return <AlertTriangle className="w-6 h-6 text-red-600" />;
    if (score >= 31) return <Info className="w-6 h-6 text-yellow-600" />;
    return <CheckCircle className="w-6 h-6 text-green-600" />;
  };

  const getRiskMessage = (score: number) => {
    if (score >= 71) return '🚫 CRITICAL - DO NOT USE';
    if (score >= 31) return '⚠️ WARNING - Use With Caution';
    return '✅ SAFE - Low Risk Detected';
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 71) return 'bg-red-50 border-red-200';
    if (score >= 31) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Token Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Paste your Clarity contract code and let AI detect vulnerabilities
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Paste Clarity Contract Code</span>
              <Badge variant="outline">Powered by Gemini AI</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your Clarity smart contract code here..."
              className="min-h-[400px] font-mono text-sm bg-gray-50"
            />

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={analyzeContract}
                disabled={loading || !code.trim()}
                size="lg"
                className="flex-1 min-w-[200px]"
              >
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {loading ? 'Analyzing...' : 'Analyze with AI'}
              </Button>
              <Button onClick={loadMaliciousDemo} variant="destructive" size="lg">
                Load Malicious Demo
              </Button>
              <Button onClick={loadSafeDemo} variant="outline" size="lg">
                Load Safe Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Risk Score Card */}
            <Card className={`border-2 ${getRiskBgColor(result.score)}`}>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center">
                    <RiskGauge score={result.score} size="lg" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {getRiskIcon(result.score)}
                      <h3 className="text-2xl font-bold">Security Analysis Complete</h3>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Risk Level</div>
                      <Badge
                        variant={result.score >= 71 ? 'destructive' : result.score >= 31 ? 'secondary' : 'default'}
                        className="text-lg px-4 py-2"
                      >
                        {result.recommendation}
                      </Badge>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${getRiskBgColor(result.score)}`}>
                      <p className="font-bold text-lg">
                        {getRiskMessage(result.score)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threats Detected */}
            {result.threats && result.threats.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Detected Threats ({result.threats.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.threats.map((threat, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <span className="text-red-500 text-xl">⚠️</span>
                        <span className="text-gray-800">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* AI Analysis */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Security Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {result.reasoning}
                </p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.score >= 71 ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">🚫</span>
                        <span>Do NOT deploy or interact with this contract</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">🚫</span>
                        <span>Alert the community about this malicious token</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">📝</span>
                        <span>Report to StacksGuard for immediate flagging</span>
                      </li>
                    </>
                  ) : result.score >= 31 ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">⚠️</span>
                        <span>Review the identified vulnerabilities carefully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">⚠️</span>
                        <span>Consider a professional security audit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">🔧</span>
                        <span>Fix vulnerabilities before deployment</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✅</span>
                        <span>Contract appears safe for use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">📝</span>
                        <span>Consider additional testing and audit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">🔒</span>
                        <span>Monitor for any suspicious activity after deployment</span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* How It Works */}
        {!result && !loading && (
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle>How AI Analysis Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold">Pattern Detection</div>
                    <div className="text-sm text-gray-600">
                      AI scans for known malicious patterns like as-contract abuse, reentrancy, and access control issues
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold">Risk Scoring</div>
                    <div className="text-sm text-gray-600">
                      Each vulnerability is weighted and combined into a 0-100 risk score
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold">Detailed Report</div>
                    <div className="text-sm text-gray-600">
                      Get a comprehensive analysis with specific threats and recommendations
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
