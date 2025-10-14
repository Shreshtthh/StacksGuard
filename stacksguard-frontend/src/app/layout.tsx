import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { GradientBg } from "@/components/gradient-bg";
import { WalletProvider } from "@/lib/wallet-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StacksGuard - Securing Bitcoin DeFi",
  description: "AI-powered security platform protecting Stacks protocols from the next $8M hack",
  keywords: ["Stacks", "Bitcoin", "DeFi", "Security", "Smart Contracts", "sBTC"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <GradientBg />
          <Navigation />
          <main className="relative">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="relative mt-20 border-t border-gray-200/50 bg-white/70 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">StacksGuard</h3>
                  <p className="text-sm text-gray-600">
                    Securing Bitcoin DeFi, one contract at a time.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Product</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/analyze" className="hover:text-blue-600">Token Analyzer</a></li>
                    <li><a href="/demo" className="hover:text-blue-600">Live Demo</a></li>
                    <li><a href="/alex-hack" className="hover:text-blue-600">ALEX Hack</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Resources</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
                    <li><a href="#" className="hover:text-blue-600">API Reference</a></li>
                    <li><a href="#" className="hover:text-blue-600">GitHub</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Community</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Discord</a></li>
                    <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
                    <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                <p>&copy; 2025 StacksGuard. Built for the Stacks ecosystem.</p>
              </div>
            </div>
          </footer>
        </WalletProvider>
      </body>
    </html>
  );
}
