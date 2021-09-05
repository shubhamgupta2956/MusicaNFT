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
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { getDB } from '../api/apis';
import DownloadImg from '../images/download.jpeg';
import Download1Img from '../images/download1.jpeg';
import Download2Img from '../images/download2.jpeg';
import Download3Img from '../images/download3.jpeg';
import Download4Img from '../images/download4.jpeg';
import EastSideImg from '../images/eastSite.jpeg';
import EminemImg from '../images/eminem.jpeg';
import MusicIcon from '../images/index.png';
import PayphoneImg from '../images/payphone.jpeg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    // backgroundSize: 150,
  },
});

const imageList = [
  Download1Img,
  Download2Img,
  Download3Img,
  Download4Img,
  DownloadImg,
];

const ListingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [tracks, setTracks] = useState([]);

  useEffect(async () => {
    const track = await getDB();

    let testTrack = [];
    track.filenameNFT.forEach(element => {
      if (element.fileName.nft) {
        testTrack.push({
          fileName: element.fileName.fileName,
          nft: element.fileName.nft,
          description: element.fileName.desc ? element.fileName.desc : 'null',
        });
      }
    });

    setTracks(testTrack);
  }, []);

  return (
    <Grid container justify="center" spacing={5} style={{ width: '100%' }}>
      <Grid item xs={12}>
        <Button
          style={{ float: 'right' }}
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
              <Card style={{ width: '400px' }} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    // image={MusicIcon}
                    wide
                    image={imageList[Math.floor(Math.random(1) * 5)]}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {track.fileName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {track.description === 'null' ? '' : track.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    style={{ width: '100%' }}
                    color="primary"
                    href={`/nft/${track.nft}/${track.fileName}/${track.description}`}
                  >
                    Show more info
                  </Button>
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
