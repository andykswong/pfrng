import { randomPermutation, permute } from '../permutation';

describe('randomPermutation', () => {
  test.each([-1, 1.5])(
    'throw on invalid inputs length = %p',
    (length) => expect(() => randomPermutation([].values(), length)).toThrow()
  );

  test.each([
    [0, [], []],
    [1, [false], [0]],
    [2, [true], [0, 1]],
    [2, [false], [1, 0]],
    [3, [false, false, true], [1, 2, 0]],
  ])(
    'given length = %p, random uints = %p, returns %p',
    (length, randomBits, expectedResult) => {
      expect(randomPermutation(randomBits.values(), length)).toEqual(expectedResult);
    }
  );
});

describe('permute', () => {
  it('throws when data and permutation arrays have different lengths', () => {
    expect(() => permute(['a'], [0, 1])).toThrow()
  });

  test.each([
    [[], [], []],
    [['a'], [0], ['a']],
    [['a', 'b'], [0, 1], ['a', 'b']],
    [['a', 'b'], [1, 0], ['b', 'a']],
    [['a', 'b', 'c'], [2, 0, 1], ['b', 'c', 'a']],
  ])(
    'given data = %p, permutation = %p, returns data = %p without modifying permutation',
    (data, permutation, expectedResult) => {
      const permCopy = [...permutation];
      expect(permute(data, permCopy)).toEqual(expectedResult);
      expect(data).toEqual(expectedResult);
      expect(permCopy).toEqual(permutation);
    }
  );
});
