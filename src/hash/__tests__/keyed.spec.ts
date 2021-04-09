import { keyedMessage } from '../keyed';

describe('keyedMessage', () => {
  test.each([
    ['hello', 'world', 123, 'world,hello,123'],
    ['this', 'is', undefined, 'is,this,0'],
    ['', '', undefined, ',,0'],
  ])(
    'given message = "%p", secret = "%p", nonce = %p, returns "%p"',
    (message, secret, nonce, expectedResult) => {
      expect(keyedMessage(message, secret, nonce)).toBe(expectedResult);
    }
  );
});
