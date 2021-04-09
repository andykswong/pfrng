/**
 * Assert function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Assert = (value: any, message: string | Error) => asserts value;

/**
 * The assert function.
 * @internal
 */
export let assert: Assert = console.assert;

/**
 * Set the assert function to use.
 */
export function setAssert(assertFn: Assert): void {
  assert = assertFn;
}
