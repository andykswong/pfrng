import { fromHex, isHex, toHex } from '../hex';

describe('isHex', () => {
  it('should return true for hex string', () => {
    expect(isHex('0123456789abcdef')).toBeTruthy();
  });

  test.each(['', 'abcdehex', '12345'])(
    'given string input of "%p", returns false',
    (str) => expect(isHex(str)).toBeFalsy()
  );
});

describe('toHex', () => {
  it('should convert buffer to hex string', () => {
    expect(toHex(new Uint8Array([0x0a, 0xce, 0x12, 0x30]))).toBe('0ace1230');
  });
});

describe('fromHex', () => {
  it('should return null for non-hex string', () => {
    expect(fromHex('hello!')).toBe(null);
  });

  it('should convert hex string to buffer', () => {
    expect(fromHex('1337c0de')).toEqual(new Uint8Array([0x13, 0x37, 0xc0, 0xde]));
  });
});
