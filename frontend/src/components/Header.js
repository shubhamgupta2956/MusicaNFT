import { Grid } from '@material-ui/core';
import React from 'react';

import logoImg from '../images/logo.png';

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
      <Grid item>
        <img src={logoImg} style={{ height: 80 }} />
      </Grid>
    </Grid>
  );
};

export default Header;
