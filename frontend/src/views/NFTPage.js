import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import * as splToken from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DownloadImg from '../images/download.jpeg';
import Download1Img from '../images/download1.jpeg';
import Download2Img from '../images/download2.jpeg';
import Download3Img from '../images/download3.jpeg';
import Download4Img from '../images/download4.jpeg';
import {
  IntellectualProperty,
  IntellectualPropertySchema,
  program_id,
  sha256,
  stringConcat,
  stringParser,
} from '../ipr';

const imageList = [
  Download1Img,
  Download2Img,
  Download3Img,
  Download4Img,
  DownloadImg,
];

const NFTPage = () => {
  const { addr, desc, name } = useParams();
  const [nftDetails, setNftDetails] = useState(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [realData, setRealData] = useState({});
  const [owner, setOwner] = useState('');
  const [trackOwners, setTrackOwners] = useState(new Set());

  const [realName, setRealName] = useState('');

  const getDataFromNFT = async address => {
    const greetedPubkey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(greetedPubkey);
    if (accountInfo === null) {
      return;
    }
    var string = new TextDecoder().decode(accountInfo.data);

    let test = string.substring(string.indexOf('{') + 1).split('__')[0];

    const property = JSON.parse('{' + test);

    return property.tracks;
  };

  const getAllNodes = async () => {
    let finalTracks = [];
    const nftTokens = new Set();
    let tracksArr = [...realData.tracks];

    for (let track in tracksArr) {
      nftTokens.add(tracksArr[track].token);

      const tracksData = await getDataFromNFT(tracksArr[track].token);

      for (let i in tracksData) {
        finalTracks.push(tracksData[i]);
        tracksArr.push(tracksData[i]);
      }
    }

    for (let track in finalTracks) {
      nftTokens.add(finalTracks[track].token);
    }
    setTrackOwners(nftTokens);
  };

  useEffect(async () => {
    const greetedPubkey = new PublicKey(addr);
    const accountInfo = await connection.getAccountInfo(greetedPubkey);
    if (accountInfo === null) {
      setNftDetails({});
      return;
    }
    var string = new TextDecoder().decode(accountInfo.data);

    let test = string.substring(string.indexOf('{') + 1).split('__')[0];

    const property = JSON.parse('{' + test);

    if (!realData.url) {
      setRealData(property);
    }

    setOwner(accountInfo.owner);

    const parsedData = stringParser(property.url);
    const isPublic = property.is_public === '1';
    var sigs = await connection.getSignaturesForAddress(greetedPubkey);
    sigs = sigs.reverse();
    const milliseconds = sigs[0].blockTime * 1000;
    const d = new Date(milliseconds);
    const ds = d.toLocaleString();
    setNftDetails({
      public: isPublic,
      owner: property.property_owner,
      name: isPublic ? JSON.parse(parsedData).name : '',
      description: isPublic ? JSON.parse(parsedData).description : '',
      files: isPublic ? JSON.parse(parsedData).files : [],
      time: ds,
      hash: property.hash,
      verified: isPublic
        ? property.hash === (await sha256(JSON.parse(parsedData).description))
        : false,
    });
  }, [addr]);

  useEffect(async () => {
    if (realData?.tracks) {
      await getAllNodes();
    }
  }, [realData]);

  console.log(realData);
  const handleBuyNFT = async () => {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: owner,
        lamports: 0 / 100,
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');
      console.log('transaction successful');
    } catch (e) {
      console.log("Same idea made by you already exists. Visit{' '}");
      return;
    }
    for (let owner of trackOwners) {
      const ownerPublicKey = new PublicKey(owner);
      const transaction2 = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: ownerPublicKey,
          lamports: (LAMPORTS_PER_SOL * 50) / trackOwners.size,
        })
      );

      try {
        const signature = await sendTransaction(transaction2, connection);
        await connection.confirmTransaction(signature, 'processed');
        console.log('transaction successful');
      } catch (e) {
        console.log("Same idea made by you already exists. Visit{' '}");
        return;
      }
    }

    window.open(`http://localhost:5000/getMusic/${name}`);
  };
  console.log(trackOwners);
  return (
    <Grid container spacing={4} alignItems="flex-start" justifyContent="center">
      <Grid item xs={12}>
        <Button
          style={{ float: 'right' }}
          variant="contained"
          color="primary"
          onClick={() => handleBuyNFT()}
        >
          Buy Song
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Paper style={{ padding: '16px' }}>
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="flex-start"
          >
            <Grid item>
              <img
                style={{ height: 250, width: '100%', objectFit: 'fill' }}
                src={imageList[Math.floor(Math.random(1) * 5)]}
              />
            </Grid>
            <Grid item>
              <strong>Track name:</strong> {name}
            </Grid>
            <Grid item>
              <strong>Description:</strong> {desc}
            </Grid>
            <Grid item>
              <strong>NFT Token:</strong> {addr}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item container xs={6} direction="column">
        <Paper style={{ padding: '16px' }}>
          <Grid container spacing={4}>
            <Grid item>
              <Typography variant="h5">Linked Songs</Typography>
            </Grid>
            {realData?.tracks?.map(track => {
              return (
                <>
                  <Grid
                    item
                    key={track}
                    container
                    spacing={1}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <strong>Track name:</strong> {track.name}
                    </Grid>
                    <Grid item>
                      <strong>NFT Token:</strong> {track.token}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider style={{ width: '100%' }} />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NFTPage;
