import { randomByteFromHash } from '../hash-stream';

describe('randomByteFromHash', () => {
  const SEED = 'seed';
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  it('should return byte sequence from hash', () => {
    const mockHash = jest.fn();
    BYTE_CHUNKS.forEach(mockHash.mockReturnValueOnce);

    const randFn = randomByteFromHash(mockHash, SEED);

    for (let i = 0; i < BYTES.length; ++i) {
      expect(randFn()).toBe(BYTES[i]);
      expect(mockHash).toBeCalledTimes((1 + i/2)|0);
    }
    expect(mockHash.mock.calls[0][0]).toBe(SEED);
    expect(mockHash.mock.calls[1][0]).toBe(`${SEED},1`);
    expect(randFn.state).toEqual({ n: 1, b: 2 });
  });

  it('should be able to resume the hash byte sequence from state', () => {
    const state = { n: 1, b: 1 };
    const mockHash = jest.fn();
    mockHash.mockReturnValueOnce(BYTE_CHUNKS[1])

    const randFn = randomByteFromHash(mockHash, SEED, state);
    expect(randFn()).toBe(BYTES[3]);

    expect(mockHash).toBeCalledTimes(1);
    expect(mockHash.mock.calls[0][0]).toBe(`${SEED},1`);
    expect(randFn.state).toEqual({ n: 1, b: 2 });
  });
});
