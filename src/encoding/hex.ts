const HEX_PATTERN = /^[0-9A-Fa-f]+$/;

const BYTE_TO_HEX = (() => {
  const byteToHex: string[] = [];
  for (let n = 0; n <= 0xFF; ++n) {
    const hexOctet = n.toString(16).padStart(2, '0');
    byteToHex.push(hexOctet);
  }
  return byteToHex;
})();

const HEX_TO_BYTE = (() => {
  const hexToByte: Record<string, number> = {};
  for (let n = 0; n <= BYTE_TO_HEX.length; ++n) {
    hexToByte[BYTE_TO_HEX[n]] = n;
  }
  return hexToByte;
})();

/**
 * Test if given string is a valid hexadecimal number.
 */
export function isHex(str: string): boolean {
  return (str.length & 1) === 0 && HEX_PATTERN.test(str);
}

/**
 * Converts a Uint8Array buffer to hexadecimal string.
 */
export function toHex(buffer: Uint8Array): string {
  const hexOctets = new Array(buffer.length);
  for (let i = 0; i < buffer.length; ++i) {
    hexOctets[i] = BYTE_TO_HEX[buffer[i]];
  }
  return hexOctets.join('');
}

/**
 * Converts a hexadecimal string to Uint8Array buffer.
 */
export function fromHex(hex: string): Uint8Array | null {
  if (!isHex(hex)) {
    return null;
  }

  const buffer = new Uint8Array(hex.length >>> 1);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = HEX_TO_BYTE[hex.substring(i * 2, i * 2 + 2).toLowerCase()];
  }
  return buffer;
}
