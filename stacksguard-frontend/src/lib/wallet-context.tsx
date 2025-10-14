'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

interface WalletContextType {
  userSession: UserSession;
  userData: any;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  address: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export function WalletProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData();
      setUserData(data);
      setIsConnected(true);
      setAddress(data.profile.stxAddress.testnet || data.profile.stxAddress.mainnet);
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'StacksGuard',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        const data = userSession.loadUserData();
        setUserData(data);
        setIsConnected(true);
        setAddress(data.profile.stxAddress.testnet || data.profile.stxAddress.mainnet);
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
    setIsConnected(false);
    setAddress(null);
    window.location.reload();
  };

  return (
    <WalletContext.Provider
      value={{
        userSession,
        userData,
        isConnected,
        connectWallet,
        disconnectWallet,
        address,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
