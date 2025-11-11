/**
 * Item Response Theory (IRT) - 2PL Model
 * Implements the two-parameter logistic model for adaptive testing
 */

export interface IRTItem {
  difficulty: number; // b parameter (item difficulty)
  discrimination: number; // a parameter (item discrimination)
}

/**
 * Calculate the probability of a correct response using 2-PL model
 * P(θ) = 1 / (1 + e^(-a(θ - b)))
 */
export function calculateProbability(
  theta: number,
  item: IRTItem
): number {
  const exponent = item.discrimination * (theta - item.difficulty);
  return 1 / (1 + Math.exp(-exponent));
}

/**
 * Calculate item information using 2-PL model
 * I(θ) = a²P(θ)(1-P(θ))
 */
export function calculateItemInformation(
  theta: number,
  item: IRTItem
): number {
  const p = calculateProbability(theta, item);
  return Math.pow(item.discrimination, 2) * p * (1 - p);
}

/**
 * Calculate test information at a given theta level
 */
export function calculateTestInformation(
  theta: number,
  items: IRTItem[]
): number {
  return items.reduce(
    (sum, item) => sum + calculateItemInformation(theta, item),
    0
  );
}

/**
 * Update theta using Maximum Likelihood Estimation (MLE)
 * Based on the response pattern
 */
export function updateTheta(
  previousTheta: number,
  correct: boolean,
  item: IRTItem,
  learningRate: number = 0.5
): number {
  const p = calculateProbability(previousTheta, item);
  const response = correct ? 1 : 0;
  const itemInfo = calculateItemInformation(previousTheta, item);

  // Adjust theta based on performance
  const adjustment = item.discrimination * (response - p) * learningRate;
  return previousTheta + adjustment;
}

/**
 * Select next question based on maximum information criterion
 */
export function selectNextQuestion(
  theta: number,
  items: IRTItem[],
  usedIndices: Set<number>
): number {
  let maxInfo = -Infinity;
  let bestIndex = 0;

  items.forEach((item, index) => {
    if (!usedIndices.has(index)) {
      const info = calculateItemInformation(theta, item);
      if (info > maxInfo) {
        maxInfo = info;
        bestIndex = index;
      }
    }
  });

  return bestIndex;
}
