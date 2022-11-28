import { jest } from '@jest/globals';
import { Hash } from '../../types';
import { randomBytesFromHash } from '../hash';

describe('randomBytesFromHash', () => {
  const SEED = 'seed';
  const BYTES = [0x12, 0x34, 0x56, 0x78] as const;
  const BYTE_CHUNKS = [new Uint8Array([0x12, 0x34]), new Uint8Array([0x56, 0x78])] as const;

  it('should return byte sequence from hash', () => {
    const state = { length: BYTES.length };
    const mockHash = jest.fn();
    BYTE_CHUNKS.forEach(mockHash.mockReturnValueOnce);

    expect(Array.from(randomBytesFromHash(mockHash as Hash, SEED, state))).toStrictEqual(BYTES);

    expect(mockHash.mock.calls[0][0]).toBe(SEED);
    expect(mockHash.mock.calls[1][0]).toBe(`${SEED},1`);
    expect(state).toStrictEqual({ nonce: 1, index: 2, length: 0 });
  });

  it('should be able to resume the hash byte sequence from state', () => {
    const state = { nonce: 1, index: 1, length: 1 };
    const mockHash = jest.fn();
    mockHash.mockReturnValueOnce(BYTE_CHUNKS[1])

    const randFn = randomBytesFromHash(mockHash as Hash, SEED, state);
    expect(randFn.next().value).toBe(BYTES[3]);

    expect(mockHash).toBeCalledTimes(1);
    expect(mockHash.mock.calls[0][0]).toBe(`${SEED},1`);
    expect(state).toEqual({ nonce: 1, index: 2, length: 0 });
  });
});
