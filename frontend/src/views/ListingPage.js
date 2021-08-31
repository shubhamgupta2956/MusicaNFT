import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  makeStyles,
  Button,
  CardContent,
  CardActions,
} from "@material-ui/core";
import React, { useState } from "react";

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

  const [tracks, setTracks] = useState([
    { name: "Shubham" },
    { name: "Manas" },
    { name: "Manas" },
  ]);

  console.log(tracks);

  return (
    <Grid container spacing={4}>
      {tracks.map((track) => {
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
