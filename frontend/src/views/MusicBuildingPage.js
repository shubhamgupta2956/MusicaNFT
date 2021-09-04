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
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { Buffer } from 'buffer';
import React, { useCallback, useEffect, useState } from 'react';

import {
  addAudio,
  getDB,
  getMusic,
  mergeAudio,
  uploadAudio,
} from '../api/apis';
import Dropzone from '../components/Dropzone';
import {
  IntellectualProperty_Size,
  program_id,
  sha256,
  stringConcat,
  underscoreGenerator,
} from '../ipr';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MusicBuildingPage = () => {
  const { connection } = useConnection();
  // console.log((connection);

  const [newNftAddr, setNewNftAddr] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  // console.log((publicKey);

  const [document, setDocument] = useState([]);

  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [songName, setSongName] = useState('');

  useEffect(async () => {
    const track = await getDB();

    let testTrack = [];
    let testDisplayTrack = [];
    track.filenameNFT.forEach(element => {
      if (element.fileName.nft) {
        testTrack.push({
          fileName: element.fileName.fileName,
          nft: element.fileName.nft,
        });
      }
    });

    setTracks(testTrack);
  }, [newNftAddr]);

  const handleUploadFiles = useCallback(
    async document => {
      const form = new FormData();

      form.append('audio', document[0], document[0].name);

      const uploaded = await uploadAudio(form);

      let musicFile = '';
      if (uploaded) {
        musicFile = await getMusic(document[0].name);
      }

      if (!publicKey) throw new WalletNotConnectedError();
      setSubmitting(true);

      const reader2 = new FileReader();
      const fileData = new Blob([document[0]]);
      // console.log((fileData);
      reader2.readAsText(fileData);

      let sha256str = '';
      reader2.onload = event => {
        sha256str = event.target.result;
      };

      let hash = '';
      if (document.length > 0) {
        hash = await sha256(document[0].name + Math.random(3200));
        // console.log((hash);
      }

      // console.log((hash);
      const newAccountPubkey = await PublicKey.createWithSeed(
        publicKey,
        hash.substr(0, 10),
        program_id
      );

      const lamports = await connection.getMinimumBalanceForRentExemption(
        IntellectualProperty_Size
      );

      const instruction = SystemProgram.createAccountWithSeed({
        fromPubkey: publicKey,
        basePubkey: publicKey,
        seed: hash.substr(0, 10),
        newAccountPubkey: newAccountPubkey,
        lamports: lamports,
        space: IntellectualProperty_Size,
        programId: program_id,
      });

      const transaction = new Transaction().add(instruction);
      try {
        const signature = await sendTransaction(transaction, connection);
        // console.log(('created nft account');
        await connection.confirmTransaction(signature, 'processed');
      } catch (e) {
        console.log(
          "Same idea made by you already exists. Visit{' '}",
          `/#/nft/${newAccountPubkey.toBase58()}`
        );
        return;
      }

      const initAccount = new TransactionInstruction({
        programId: program_id,
        keys: [
          { pubkey: newAccountPubkey, isSigner: false, isWritable: true },
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          },
        ],
        data: Buffer.from(
          Uint8Array.of(
            1,
            ...Array.from(
              new TextEncoder().encode(
                stringConcat(
                  JSON.stringify({
                    documentHash: hash,
                    url: `http://localhost:5000/getMusic/${document[0].name}`,
                  }),
                  500
                )
              )
            )
          )
        ),
      });
      const transaction2 = new Transaction().add(initAccount);
      try {
        const signature2 = await sendTransaction(transaction2, connection);
        await connection.confirmTransaction(signature2, 'processed');
      } catch (e) {
        // console.log((`/#/nft/${newAccountPubkey.toBase58()}`);
        return;
      }

      setNewNftAddr(newAccountPubkey.toBase58());
      setSubmitting(false);

      addAudio({
        fileName: document[0].name,
        nft: newAccountPubkey.toBase58(),
      });
    },
    [publicKey, sendTransaction, connection]
  );

  const handleUploadFilesWithoutFile = useCallback(
    async document => {
      if (!publicKey) throw new WalletNotConnectedError();
      setSubmitting(true);

      let hash = '';
      if (document.length > 0) {
        hash = await sha256(document[0].name + Math.random(3200));
      }

      // console.log((hash);
      const newAccountPubkey = await PublicKey.createWithSeed(
        publicKey,
        hash.substr(0, 10),
        program_id
      );

      const lamports = await connection.getMinimumBalanceForRentExemption(
        IntellectualProperty_Size
      );

      const instruction = SystemProgram.createAccountWithSeed({
        fromPubkey: publicKey,
        basePubkey: publicKey,
        seed: hash.substr(0, 10),
        newAccountPubkey: newAccountPubkey,
        lamports: lamports,
        space: IntellectualProperty_Size,
        programId: program_id,
      });

      const transaction = new Transaction().add(instruction);
      try {
        const signature = await sendTransaction(transaction, connection);
        // console.log(('created nft account');
        await connection.confirmTransaction(signature, 'processed');
      } catch (e) {
        console.log(
          "Same idea made by you already exists. Visit{' '}",
          `/#/nft/${newAccountPubkey.toBase58()}`
        );
        return;
      }

      const initAccount = new TransactionInstruction({
        programId: program_id,
        keys: [
          { pubkey: newAccountPubkey, isSigner: false, isWritable: true },
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          },
        ],
        data: Buffer.from(
          Uint8Array.of(
            1,
            ...Array.from(
              new TextEncoder().encode(
                stringConcat(
                  JSON.stringify({
                    documentHash: hash,
                    url: `http://localhost:5000/getMusic/${document[0].name}`,
                    tracks: JSON.stringify(document[0].tracksInfo),
                  }),
                  500
                )
              )
            )
          )
        ),
      });
      const transaction2 = new Transaction().add(initAccount);
      try {
        const signature2 = await sendTransaction(transaction2, connection);
        await connection.confirmTransaction(signature2, 'processed');
      } catch (e) {
        // console.log((`/#/nft/${newAccountPubkey.toBase58()}`);
        return;
      }

      setNewNftAddr(newAccountPubkey.toBase58());
      setSubmitting(false);

      addAudio({
        fileName: document[0].name,
        nft: newAccountPubkey.toBase58(),
      });
    },
    [publicKey, sendTransaction, connection]
  );

  const handleMergeAudio = () => {
    let temp = [];
    let tracksInfo = [];

    for (let track in selectedTracks) {
      temp.push(selectedTracks[track].fileName);
      tracksInfo.push({
        name: selectedTracks[track].fileName,
        token: selectedTracks[track].nft,
        owner: '',
        contribution: '',
      });
    }

    mergeAudio(temp, songName);
    setTimeout(async () => {
      const musicFile = await getMusic(songName);

      handleUploadFilesWithoutFile([
        { name: songName, tracksInfo: tracksInfo },
      ]);

      addAudio({
        fileName: songName,
        nft: newNftAddr,
      });
    }, 2000);
  };

  return (
    <Grid container justify="center" spacing={4}>
      <Grid item>
        <Paper
          style={{ height: 'fit-content', width: '50vw', padding: 16 }}
          elevation={0}
        >
          <Grid container spacing={4} justify="center">
            <Grid item className="custom-box" xs={9} style={{ marginTop: 24 }}>
              <Dropzone setDocument={setDocument} />
            </Grid>
            {!publicKey && (
              <Grid item xs={12}>
                <div fontSize="sm" color="#FF5B37">
                  Wallet not connected
                </div>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                onClick={() => handleUploadFiles(document)}
                variant="contained"
                color="primary"
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ marginTop: 100 }} variant="h4">
                Build Song
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={tracks}
                getOptionLabel={option => option.fileName}
                onChange={(event, value) => setSelectedTracks(value)}
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
            <Grid item xs={9}>
              <TextField
                value={songName}
                variant="outlined"
                label="Song Name"
                fullWidth
                onChange={e => setSongName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => handleMergeAudio()}
                variant="contained"
                color="primary"
              >
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
