import { bitIter } from '../bit';

describe('bitIter', () => {
  const BITS = [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0] as const;
  const BYTES = [0b10011101, 0b01100000] as const;

  it('should return bit sequence from random bytes', () => {
    const bits = bitIter(BYTES.values());
    expect(Array.from(bits)).toStrictEqual(BITS.map(v => !!v));
  });
});
