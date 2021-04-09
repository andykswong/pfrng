import { randomBytes } from 'crypto';
import { serverRandomByte } from '../server';

const EXPECTED_BUFFER_SIZE = 256;

jest.mock('crypto');

describe('serverRandomByte', () => {
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  it('should return byte sequence from randomBytes', () => {
    BYTE_CHUNKS.forEach((randomBytes as jest.Mock).mockReturnValueOnce);

    for (let i = 0; i < BYTES.length; ++i) {
      expect(serverRandomByte()).toBe(BYTES[i]);
      expect(randomBytes).toBeCalledTimes((1 + i/2)|0);
    }
    expect(randomBytes).toBeCalledWith(EXPECTED_BUFFER_SIZE);
  });
});
