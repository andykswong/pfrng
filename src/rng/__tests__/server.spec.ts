import { jest } from '@jest/globals';
import crypto from 'crypto';
jest.spyOn(crypto, 'randomBytes');
import { serverRandomByte } from '../server';

const EXPECTED_BUFFER_SIZE = 256;

describe('serverRandomByte', () => {
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  it('should return byte sequence from randomBytes', () => {
    BYTE_CHUNKS.forEach((crypto.randomBytes as jest.Mock).mockReturnValueOnce);

    for (let i = 0; i < BYTES.length; ++i) {
      expect(serverRandomByte()).toBe(BYTES[i]);
      expect(crypto.randomBytes).toBeCalledTimes((1 + i/2)|0);
    }
    expect(crypto.randomBytes).toBeCalledWith(EXPECTED_BUFFER_SIZE);
  });
});
