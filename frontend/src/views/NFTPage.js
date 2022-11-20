import { Button, Grid, Paper } from '@material-ui/core';
import splToken from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  IntellectualProperty,
  IntellectualPropertySchema,
  program_id,
  sha256,
  stringConcat,
  stringParser,
} from '../ipr';

const NFTPage = () => {
  const { addr } = useParams();
  const { connection } = useConnection();

  const [nftDetails, setNftDetails] = useState(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [realData, setRealData] = useState({});
  const [realName, setRealName] = useState('');

  console.log(realData);

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

    setRealData(property);

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
  }, [addr, connection]);

  const handleBuyNFT = () => {
    var transaction = new Transaction().add(
      splToken.Token.createTransferInstruction(
        program_id,
        realData.owner,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        1
      )
    );
  };

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item container spacing={4} direction="column">
        {realData.tracks.map(track => {
          return (
            <Grid item key={track.token}>
              <Paper style={{ padding: '16px' }}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignItems="flex-start"
                >
                  <Grid item>
                    <strong>Track name:</strong> {track.name}
                  </Grid>
                  <Grid item>
                    <strong>NFT Token:</strong> {track.token}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleBuyNFT()}
        >
          Buy
        </Button>
      </Grid>
    </Grid>
  );
};

export default NFTPage;
