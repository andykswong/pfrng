# pfrng - Provably Fair Random Number Generator

> A library of [provably fair](https://en.wikipedia.org/wiki/Provably_fair_algorithm) random number generators, distributions and helpers.

[![NPM](https://img.shields.io/npm/v/pfrng)](https://www.npmjs.com/package/pfrng) [![build](https://github.com/andykswong/pfrng/actions/workflows/build.yaml/badge.svg)](https://github.com/andykswong/pfrng/actions/workflows/build.yaml)

## Install
```shell
npm install pfrng
```

## Usage
Example provably fair coin flipping game:
```js
import {
  CoinSide, commitment, flipCoin, keyedMessage, nodeRandomByte, randomBit,
  randomByteFromHash, randomSHA512, sha3_512
} from 'pfrng';

// 1. Server generates a seed and send serverCommitment to client
const serverSeed = randomSHA512(nodeRandomByte);
const serverCommitment = commitment(sha3_512, serverSeed);

// 2. Client generates a seed and places a bet
const clientSeed = randomSHA512(nodeRandomByte);
const clientNumHeadsBet = 3;

// 3. Server seeds the random generators with client + server seeds
const randomByte = randomByteFromHash(sha3_512, keyedMessage(clientSeed, serverSeed));

// 4. Server simulates the game
let isWinning = true;
for (let i = 0; i < clientNumHeadsBet; ++i) {
  const isHead = flipCoin(randomBit(randomByte)) === CoinSide.Head;
  isWinning = isWinning && isHead;
  console.log(`Coin flip ${i}: ${isHead ? 'head' : 'tail'}`);
}
console.log(`You ${isWinning ? 'win' : 'lose'}.`);

// 5. Server reveals serverSeed to client for verification
```

## API
TODO

## License
This repository and the code inside it is licensed under the MIT License. Read [LICENSE](./LICENSE) for more information.
