import { jest } from '@jest/globals';
import { webCryptoRandomByte } from '../web-crypto';

const EXPECTED_BUFFER_SIZE = 256;

const getRandomValues = jest.fn();

global.crypto = {
  subtle: <SubtleCrypto>{},
  getRandomValues: getRandomValues as <T extends ArrayBufferView | null>(array: T) => T,
  randomUUID: () => '',
};

describe('webCryptoRandomByte', () => {
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  beforeEach(() => {
    getRandomValues.mockReset();
  });

  it('should return byte sequence from crypto.getRandomValues', () => {
    BYTE_CHUNKS.forEach(getRandomValues.mockReturnValueOnce);

    for (let i = 0; i < BYTES.length; ++i) {
      expect(webCryptoRandomByte()).toBe(BYTES[i]);
      expect(getRandomValues).toBeCalledTimes((1 + i/2)|0);
    }
    expect(getRandomValues.mock.calls[0][0]).toEqual(new Uint8Array(EXPECTED_BUFFER_SIZE));
    expect(getRandomValues.mock.calls[1][0]).toEqual(new Uint8Array(EXPECTED_BUFFER_SIZE));
  });
});
