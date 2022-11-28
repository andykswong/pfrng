import { CoinSide, flipCoin } from '../coin';

describe('flipCoin', () => {
  it('should return head from random bit of 1', () => {
    expect(flipCoin([true, false, true].values())).toBe(CoinSide.Head);
  });

  it('should return tail from random bit of 0', () => {
    expect(flipCoin([false, true].values())).toBe(CoinSide.Tail);
  });
});
