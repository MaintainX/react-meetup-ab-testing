/**
 * Get ranges for variations
 * @param variationCount Number of variations
 * @param traffic Traffic percentage. Default is 1
 * @param weights Weights of variations. Default is equal weights
 * @returns Array of ranges
 */
export function getBucketRanges(variationCount: number, traffic: number = 1, weights?: number[]): [number, number][] {
  traffic = validateTraffic(traffic);
  weights = validateWeights(variationCount, weights);

  // Convert weights to ranges
  let cumulative = 0;
  return weights.map((weight) => {
    const start = cumulative;
    cumulative += weight;
    return [start, start + traffic * weight];
  });
}

/**
 * Ensure traffic is valid, and returns valid traffic
 * @param traffic Traffic percentage
 * @returns Validated traffic percentage
 */
function validateTraffic(traffic: number): number {
  if (traffic < 0) {
    return 0;
  } else if (traffic > 1) {
    return 1;
  }

  return traffic;
}

/**
 * Ensure weights are valid, otherwise return equal weights
 * @param variationCount Number of variations
 * @param weights Weights of variations
 * @returns Validated array of weights
 */
function validateWeights(variationCount: number, weights?: number[]): number[] {
  if (!weights || weights.length !== variationCount) {
    return getEqualWeights(variationCount);
  }

  // If weights don't add up to 1, use equal weights
  const totalWeight = weights.reduce((w, sum) => sum + w, 0);
  if (totalWeight < 0.99 || totalWeight > 1.01) {
    return getEqualWeights(variationCount);
  }

  return weights;
}

/**
 * Get assigned variation index from value. Returns -1 if not in experiment.
 * @param value Hash value between 0 and 1
 * @param ranges Array of ranges
 * @returns Variation index or -1
 */
export function getAssignedIndex(value: number, ranges: [number, number][]): number {
  for (let i = 0; i < ranges.length; i++) {
    if (value >= ranges[i][0] && value < ranges[i][1]) {
      return i;
    }
  }
  return -1;
}

/**
 * Returns an array of weights that are equal to each other.
 * @param n Number of variations
 * @returns Array of weights
 */
export function getEqualWeights(n: number): number[] {
  return !n || n <= 0 ? [] : new Array(n).fill(1 / n);
}
