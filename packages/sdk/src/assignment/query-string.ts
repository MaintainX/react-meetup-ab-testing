/**
 * Get the variation key from the query string.
 * @param url The URL to parse.
 * @param experimentKey The experiment key to look for.
 * @returns The variation key if found, otherwise null.
 */
export function getQueryStringVariation(url: string | undefined, experimentKey: string): string | null {
  if (!url) {
    return null;
  }

  const searchParams = url.split("?")[1];
  if (!searchParams) {
    return null;
  }

  const match = searchParams
    .replace(/#.*/, "") // Get rid of anchor
    .split("&") // Split into key/value pairs
    .map((pairs) => pairs.split("=", 2)) // Split key/value pairs into [key, value]
    .filter(([key]) => key === experimentKey) // Look for key that matches the experiment key
    .map(([, value]) => value); // Return the variation key

  if (match.length > 0 && !!match[0]) {
    return match[0];
  }

  return null;
}
