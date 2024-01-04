import { stringify } from "../utils";

/**
 * Hashes props to a number between 0 and 1
 * @param experimentKey - The experiment key
 * @param subjectKey - The value of the subject attribute used for assignment
 * @returns A hash value between 0 and 1
 */
export function getHash(experimentKey: string, subjectKey: unknown): number {
  const key = [experimentKey, stringify(subjectKey)].join();

  return hash(key);
}

/**
 * Hashes a string to a number between 0 and 1
 * @param key - The string to hash
 * @returns A hash value between 0 and 1
 */
function hash(key: string): number {
  return (hashFnv32a(key) % 1000) / 1000;
}

/**
 * Fowler–Noll–Vo hash function
 * https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function
 * @param key - The string to hash
 * @returns A hash
 */
function hashFnv32a(key: string): number {
  const offsetBasis = 0x811c9dc5;

  let value = offsetBasis;
  for (let i = 0; i < key.length; i++) {
    value ^= key.charCodeAt(i);
    value += (value << 1) + (value << 4) + (value << 7) + (value << 8) + (value << 24);
  }

  return value >>> 0;
}
