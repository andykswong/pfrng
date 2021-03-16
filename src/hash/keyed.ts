/**
 * Return a keyed message for KMAC, from original message, secret and optional nonce.
 */
export function keyedMessage(message: string, secret: string, nonce = 0): string {
  return `${secret},${message},${nonce}`;
}
