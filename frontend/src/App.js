import './App.css';

import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
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
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import logo from './logo.svg';
import ListingPage from './views/ListingPage';
import LoginPage from './views/LoginPage';
import MusicBuildingPage from './views/MusicBuildingPage';

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
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <div className="App">
            <Router>
              <Header />
              <div style={{ width: '70vw', margin: 'auto', marginTop: 32 }}>
                <Switch>
                  <Route exact path="/" component={LoginPage} />
                  <Route exact path="/listing" component={ListingPage} />
                  <Route exact path="/building" component={MusicBuildingPage} />
                </Switch>
              </div>
            </Router>
          </div>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
