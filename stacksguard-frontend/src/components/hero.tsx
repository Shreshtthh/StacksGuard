'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-float animation-delay-2000" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Security for Stacks DeFi
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block">Securing Bitcoin DeFi</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Before the Next $8M Hack
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bitcoin's $2 trillion sits idle because people fear losing it. StacksGuard is the 
              missing security layer that unlocks Bitcoin's productive potential without the fear.
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/analyze">
              <Button size="lg" className="text-lg px-8 py-6 shadow-2xl hover:shadow-blue-500/50 group">
                Analyze Token
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                <Shield className="w-5 h-5 mr-2" />
                See Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="space-y-1">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-gray-600">Tokens Scanned</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-red-600">23</div>
              <div className="text-gray-600">Threats Blocked</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-purple-600">$45M</div>
              <div className="text-gray-600">Value Secured</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
