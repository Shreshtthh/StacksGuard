'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Search, BookOpen, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/wallet-context';

export function Navigation() {
  const pathname = usePathname();
  const { isConnected, connectWallet, disconnectWallet, address } = useWallet();

  const links = [
    { href: '/', label: 'Dashboard', icon: Activity },
    { href: '/analyze', label: 'Analyze', icon: Search },
    { href: '/alex-hack', label: 'ALEX Hack', icon: BookOpen },
    { href: '/demo', label: 'Demo', icon: Shield },
  ];

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    console.log('🖱️ Connect button clicked in Navigation');
    connectWallet();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors" />
              <div className="absolute inset-0 bg-blue-600/20 blur-xl group-hover:bg-purple-600/20 transition-colors" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              StacksGuard
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                      'gap-2',
                      isActive && 'shadow-lg'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Connect Wallet Button */}
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">
                  {truncateAddress(address || '')}
                </span>
              </div>
              <Button variant="outline" onClick={disconnectWallet} size="sm">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleConnect} 
              className="gap-2"
              type="button"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
