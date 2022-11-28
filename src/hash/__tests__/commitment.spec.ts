import { jest } from '@jest/globals';
import { commitment } from '../commitment';
import { Hash } from '../../types';

describe('commitment', () => {
  it('should hash given message', () => {
    const message = 'no salt';
    const mockHash = jest.fn().mockReturnValueOnce(new Uint8Array([0xab]));

    expect(commitment(mockHash as Hash, message)).toBe('ab');
    expect(mockHash).toBeCalledWith(message);
  });

  it('should salt and hash given message', () => {
    const message = 'hello world';
    const salt = 'salt';
    const mockHash = jest.fn().mockReturnValueOnce(new Uint8Array([0xba, 0xda, 0x22]));

    expect(commitment(mockHash as Hash, message, salt)).toBe('bada22');
    expect(mockHash).toBeCalledWith(message + salt);
  });
});
