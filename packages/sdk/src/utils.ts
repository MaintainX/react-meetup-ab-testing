/**
 * Converts a value to a string representation.
 * @param value - The value
 * @returns A string representation of the value
 */
export function stringify(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
}
