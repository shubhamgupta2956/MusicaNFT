import { Grid } from '@material-ui/core';
import React from 'react';

const Header = () => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{
        height: 80,
        top: 0,
        backgroundColor: 'black',
        color: 'white',
        marginTop: 0,
      }}
    >
      <Grid item>NFT-san</Grid>
    </Grid>
  );
};

export default Header;
