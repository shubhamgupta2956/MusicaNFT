import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';

import Dropzone from '../components/Dropzone';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MusicBuildingPage = () => {
  const [document, setDocument] = useState([]);
  const [tracks, setTracks] = useState([]);

  return (
    <Grid container justify="center" spacing={4}>
      <Grid item>
        <Paper
          style={{ height: '50vh', width: '50vw', padding: 16 }}
          elevation={0}
        >
          <Grid container spacing={4} justify="center">
            <Grid item className="custom-box" xs={9} style={{ marginTop: 24 }}>
              <Dropzone setDocument={setDocument} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Upload
              </Button>
            </Grid>
            <Grid item xs={9} style={{ marginTop: 100 }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={tracks}
                getOptionLabel={option => option.title}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select tracks to mix"
                    placeholder="Tracks"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Make song
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MusicBuildingPage;
