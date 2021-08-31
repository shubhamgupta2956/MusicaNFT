import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ListingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [tracks, setTracks] = useState([
    { name: 'Shubham' },
    { name: 'Manas' },
    { name: 'Manas' },
  ]);

  return (
    <Grid container justify="center" spacing={4} style={{ width: '100%' }}>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            history.push('/building');
          }}
          variant="contained"
        >
          Build sound track
        </Button>
      </Grid>
      {tracks.map(track => {
        return (
          <Grid item key={track}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button color="primary">Buy</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ListingPage;
