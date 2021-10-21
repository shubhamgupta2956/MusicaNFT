# MusicaNFT

## The problem MusicaNFT solves

Currently, the music industry has no way of paying artists proportional to their contribution to a song. So we decided to create a platform that uses ML models to break a song into constituent tracks and determine their percentage contributions. These contributions are then stored into the metadata of a minted NFT which provides authenticity to the operation.

Once this data has been minted as an NFT, this provides artists leverage to demand compensation proportional to the contribution their track made to the song. This allows the music industry to essentially create a stock market-like paradigm where each artist has stocks proportional to their contribution in the song and can hence earn accordingly from the profits made by the song.

## Challenges we ran into

Solana inherently has no way of binding external data with an NFT, we had to look into other third-party providers from their ecosystem to find a suitable implementation(Metaplex) to mint our NFT with the music metadata inside it.

The Solana explorer is not equipped with displaying metadata bound to an NFT, we had to spend a lot of time figuring out a way to display our metadata in a suitable platform and check whether the metadata is actually bound to the token.

Most of our team members were not acquainted with Rust and working with a codebase as challenging as Solana was a huge task for them in the first place.

## Technologies we used
* NFT
* solana
* metaplex
