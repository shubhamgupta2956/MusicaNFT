import { Grid } from '@material-ui/core';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import React from 'react';

import logoImg from '../images/logo.png';

const Header = () => {
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      style={{
        height: 80,
        width: '100%',
        padding: '0 80px',
        top: 0,
        backgroundColor: 'black',
        color: 'white',
        marginTop: 0,
      }}
    >
      <Grid item>
        <img src={logoImg} style={{ height: 80 }} />
      </Grid>
      <Grid item>
        <WalletMultiButton />
      </Grid>
    </Grid>
  );
};

export default Header;
