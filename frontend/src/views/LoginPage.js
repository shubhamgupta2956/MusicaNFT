import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const LoginPage = () => {
  const classes = useStyles();

  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Grid
      container
      justify="center"
      direction="column"
      spacing={4}
      style={{ width: '100%' }}
    >
      <Grid item xs={12}>
        <Paper style={{ width: '30vw', margin: 'auto', marginTop: 32 }}>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12}>
              <Typography variant="h6">Login</Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TextField
                value={username}
                label="Username"
                variant="outlined"
                fullWidth
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TextField
                value={password}
                label="Password"
                fullWidth
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (username === 'root' && password === 'toor') {
                    history.push('/listing');
                  }
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
