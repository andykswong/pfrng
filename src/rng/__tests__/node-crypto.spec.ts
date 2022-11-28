import { jest } from '@jest/globals';
import crypto from 'crypto';
jest.spyOn(crypto, 'randomBytes');
import { nodeCryptoRandomBytes } from '../node-crypto';

describe('nodeCryptoRandomBytes', () => {
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  it('should return byte sequence from crypto.randomBytes', () => {
    BYTE_CHUNKS.forEach((crypto.randomBytes as jest.Mock).mockReturnValueOnce);

    expect(Array.from(nodeCryptoRandomBytes(BYTES.length))).toStrictEqual(BYTES);
  });
});
