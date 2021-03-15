import {isHex} from './hex';

describe('isHex', () => {
  it('should return true for hex string', () => {
    expect(isHex('0123456789abcdef')).toBeTruthy();
  });

  it('should return false for empty string', () => {
    expect(isHex('')).toBeFalsy();
  });

  it('should return false for non-hex string', () => {
    expect(isHex('abcdehex')).toBeFalsy();
  });

  it('should return false for odd lengthed string', () => {
    expect(isHex('12345')).toBeFalsy();
  });
});
