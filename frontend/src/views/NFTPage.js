import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import * as borsh from 'borsh';
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
  const [nftDetails, setNftDetails] = useState(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [realData, setRealData] = useState('');
  const [realName, setRealName] = useState('');

  useEffect(async () => {
    const greetedPubkey = new PublicKey(addr);
    const accountInfo = await connection.getAccountInfo(greetedPubkey);
    if (accountInfo === null) {
      setNftDetails({});
      return;
    }
    const property = borsh.deserialize(
      IntellectualPropertySchema,
      IntellectualProperty,
      accountInfo.data
    );
    const parsedData = stringParser(property.uri);
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

  return <></>;
};

export default NFTPage;
