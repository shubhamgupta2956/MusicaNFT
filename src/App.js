import logo from "./logo.svg";
import "./App.css";

import React, { useMemo } from 'react';

// solana imports
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
} from '@solana/wallet-adapter-wallets';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { clusterApiUrl } from '@solana/web3.js';

function App() {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
    ],
    []
  );
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <div className="App">
            <header className="App-header">
              <button>This is a button</button>
            </header>
          </div>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
