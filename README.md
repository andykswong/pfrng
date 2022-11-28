# pfrng - Provably Fair Random Number Generator

[![NPM](https://img.shields.io/npm/v/pfrng)](https://www.npmjs.com/package/pfrng) [![build](https://github.com/andykswong/pfrng/actions/workflows/build.yaml/badge.svg)](https://github.com/andykswong/pfrng/actions/workflows/build.yaml)

> A library of [provably fair](https://en.wikipedia.org/wiki/Provably_fair_algorithm) random number generators, distributions and helpers.

## Install
```shell
npm install pfrng
```

## Usage
Example provably fair coin flipping game:
```js
import {
  bitIter, CoinSide, commitment, flipCoin, keyedMessage, 
  nodeCryptoRandomBytes, nodeHash, randomBytesFromHash, sha512Iter
} from '.';

// 1. Server generates a seed and send serverCommitment to client
const serverRandomIter = sha512Iter(nodeCryptoRandomBytes());
const serverSeed = serverRandomIter.next().value;
const serverCommitment = commitment(nodeHash.sha3_512, serverSeed);

// 2. Client generates a seed and places a bet
const clientRandomIter = sha512Iter(nodeCryptoRandomBytes());
const clientSeed = clientRandomIter.next().value;
const clientNumHeadsBet = 3;

// 3. Server seeds the random generators with client + server seeds
const randomBytes = randomBytesFromHash(nodeHash.sha3_512, keyedMessage(clientSeed, serverSeed));
const randomBits = bitIter(randomBytes);

// 4. Server simulates the game
let isWinning = true;
for (let i = 0; i < clientNumHeadsBet; ++i) {
  const isHead = flipCoin(randomBits) === CoinSide.Head;
  isWinning = isWinning && isHead;
  console.log(`Coin flip ${i}: ${isHead ? 'head' : 'tail'}`);
}
console.log(`You ${isWinning ? 'win' : 'lose'}.`);

// 5. Server reveals serverSeed to client for verification
```

## API
TSDoc: http://andykswong.github.io/pfrng

## License
This repository and the code inside it is licensed under the MIT License. Read [LICENSE](./LICENSE) for more information.
