import { jest } from '@jest/globals';
import { webCryptoRandomBytes } from '../web-crypto';

describe('webCryptoRandomBytes', () => {
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  it('should return byte sequence from crypto.getRandomValues', () => {
    const getRandomValues = jest.fn();
    const crypto = {
      getRandomValues,
      subtle: <SubtleCrypto>{},
      randomUUID: () => '',
    } as Crypto;

    BYTE_CHUNKS.forEach(getRandomValues.mockReturnValueOnce);

    expect(Array.from(webCryptoRandomBytes(BYTES.length, crypto))).toStrictEqual(BYTES);
  });
});
