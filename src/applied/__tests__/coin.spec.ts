import { CoinSide, flipCoin } from '../coin';

describe('flipCoin', () => {
  it('should return head from random bit of 1', () => {
    expect(flipCoin(() => true)).toBe(CoinSide.Head);
  });

  it('should return tail from random bit of 0', () => {
    expect(flipCoin(() => false)).toBe(CoinSide.Tail);
  });
});
