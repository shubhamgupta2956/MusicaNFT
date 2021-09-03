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

import EastSideImg from '../images/eastSite.jpeg';
import EminemImg from '../images/eminem.jpeg';
import PayphoneImg from '../images/payphone.jpeg';

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
    // { name: 'Manas' },
    // { name: 'Manas' },
  ]);

  return (
    <Grid container justify="center" spacing={4} style={{ width: '100%' }}>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            history.push('/building');
          }}
          color="primary"
          variant="contained"
        >
          Build sound track
        </Button>
      </Grid>
      {tracks.map(track => {
        return (
          <>
            <Grid item key={track}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={EminemImg}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lose Yourself
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      The song “Lose Yourself” is an anecdote written by Eminem,
                      as it describes his transition from living in a trailer
                      park on 8 Mile in Detroit Michigan to becoming a rap
                      superstar and signing with Dr. Dre.06-Feb-2015
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button color="primary">Buy</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item key={track}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={PayphoneImg}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Payphone
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      The song 'Payphone' is an anecdote written by Eminem, as
                      it describes his transition from living in a trailer park
                      on 8 Mile in Detroit Michigan to becoming a rap superstar
                      and signing with Dr. Dre.06-Feb-2015
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button color="primary">Buy</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item key={track}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={EastSideImg}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      East Side
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      The song “East Side” is an anecdote written by Eminem, as
                      it describes his transition from living in a trailer park
                      on 8 Mile in Detroit Michigan to becoming a rap superstar
                      and signing with Dr. Dre.06-Feb-2015
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button color="primary">Buy</Button>
                </CardActions>
              </Card>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default ListingPage;
