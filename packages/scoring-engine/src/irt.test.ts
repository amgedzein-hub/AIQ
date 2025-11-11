import {
  calculateProbability,
  calculateItemInformation,
  updateTheta,
} from './irt';

describe('IRT (Item Response Theory)', () => {
  const testItem = {
    difficulty: 0.5,
    discrimination: 1.5,
  };

  describe('calculateProbability', () => {
    it('should calculate probability correctly using 2-PL model', () => {
      const theta = 0;
      const prob = calculateProbability(theta, testItem);

      // At theta = b (difficulty), probability should be close to 0.73 for 2-PL
      expect(prob).toBeGreaterThan(0.5);
      expect(prob).toBeLessThan(1);
    });

    it('should return 0.5 when theta equals difficulty', () => {
      const theta = testItem.difficulty;
      const prob = calculateProbability(theta, testItem);

      // When θ = b, P(θ) should be exactly 0.5 in 2-PL model
      expect(prob).toBeCloseTo(0.5, 1);
    });
  });

  describe('calculateItemInformation', () => {
    it('should calculate item information correctly', () => {
      const theta = 0;
      const info = calculateItemInformation(theta, testItem);

      expect(info).toBeGreaterThan(0);
      expect(info).toBeLessThan(10);
    });

    it('should have maximum information near difficulty level', () => {
      const infoAtDifficulty = calculateItemInformation(
        testItem.difficulty,
        testItem
      );
      const infoAtExtreme = calculateItemInformation(3, testItem);

      expect(infoAtDifficulty).toBeGreaterThan(infoAtExtreme);
    });
  });

  describe('updateTheta', () => {
    it('should increase theta for correct response', () => {
      const initialTheta = 0;
      const newTheta = updateTheta(initialTheta, true, testItem);

      expect(newTheta).toBeGreaterThan(initialTheta);
    });

    it('should decrease theta for incorrect response', () => {
      const initialTheta = 0;
      const newTheta = updateTheta(initialTheta, false, testItem);

      expect(newTheta).toBeLessThan(initialTheta);
    });

    it('should clamp theta to reasonable range', () => {
      let theta = 5;
      theta = updateTheta(theta, true, { discrimination: 0.5, difficulty: 0.5 });

      expect(theta).toBeLessThanOrEqual(3);
      expect(theta).toBeGreaterThanOrEqual(-3);
    });
  });
});
