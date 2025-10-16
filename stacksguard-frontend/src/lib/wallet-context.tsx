'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface WalletContextType {
  userSession: UserSession | null;
  userData: any;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  address: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔧 Initializing wallet session...');
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    const session = new UserSession({ appConfig });
    setUserSession(session);

    if (session.isUserSignedIn()) {
      console.log('✅ User already signed in');
      const data = session.loadUserData();
      setUserData(data);
      setIsConnected(true);
      const addr = data.profile.stxAddress.testnet || data.profile.stxAddress.mainnet;
      setAddress(addr);
      console.log('📍 Address:', addr);
    } else {
      console.log('ℹ️ No user signed in yet');
    }
  }, []);

  const connectWallet = () => {
    console.log('🔌 Connect wallet clicked!');
    
    if (!userSession) {
      console.error('❌ UserSession not initialized');
      alert('Wallet session not initialized. Please refresh the page.');
      return;
    }

    console.log('🚀 Calling showConnect...');

    try {
      showConnect({
        appDetails: {
          name: 'StacksGuard',
          icon: window.location.origin + '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          console.log('✅ Connection finished!');
          if (!userSession) return;
          
          const data = userSession.loadUserData();
          setUserData(data);
          setIsConnected(true);
          const addr = data.profile.stxAddress.testnet || data.profile.stxAddress.mainnet;
          setAddress(addr);
          console.log('📍 Connected address:', addr);
        },
        onCancel: () => {
          console.log('❌ Connection cancelled by user');
        },
        userSession,
      });
      console.log('📞 showConnect called successfully');
    } catch (error) {
      console.error('❌ Error calling showConnect:', error);
      alert('Error connecting wallet: ' + error);
    }
  };

  const disconnectWallet = () => {
    console.log('🔌 Disconnecting wallet...');
    if (!userSession) return;
    
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
