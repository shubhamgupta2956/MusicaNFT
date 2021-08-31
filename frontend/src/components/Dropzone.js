import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import SitesIcon from '../images/Sites.svg';
import UploadDocumentIcon from '../images/UploadDocumentIcon.svg';

const TDropZone = ({ setDocument }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    setDocument(acceptedFiles);
  }, [acceptedFiles]);

  const files = acceptedFiles.map(file => (
    <Grid
      item
      container
      spacing={2}
      alignItems="center"
      justify="space-between"
      key={file}
    >
      <Grid item>
        <img src={SitesIcon} />
      </Grid>
      <Grid item xs>
        <Grid item key={file.path} className="fw-semibold">
          {file.path}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            acceptedFiles.splice(file, 1);
            setDocument([]);
          }}
        >
          <Delete color="action" />
        </IconButton>
      </Grid>
    </Grid>
  ));

  return (
    <Grid container>
      {acceptedFiles.length ? null : (
        <Grid
          item
          direction="column"
          xs={12}
          spacing={2}
          {...getRootProps({ className: 'dropzone' })}
          style={{ cursor: 'pointer' }}
        >
          <input {...getInputProps()} />
          <img src={UploadDocumentIcon} />
          <Typography className="d-flex flex-column align-items-center fw-semibold">
            Drag 'n' drop to upload
            <div style={{ color: '#008CFF', fontWeight: 'bold' }}>
              or browse
            </div>
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        {acceptedFiles.length ? (
          <Paper className="p-2 custom-box-small">{files}</Paper>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TDropZone;
