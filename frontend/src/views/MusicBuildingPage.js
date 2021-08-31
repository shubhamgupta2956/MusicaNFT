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
import Dropzone from "react-dropzone";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MusicBuildingPage = () => {
  return <Grid container spacing={4}>
      <Dropzone />
  </Grid>;
};

export default MusicBuildingPage;
