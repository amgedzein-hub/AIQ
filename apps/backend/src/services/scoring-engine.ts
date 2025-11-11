import { scoringEngine as engine } from '@iq-test/scoring-engine';

let scoringEngineInstance: any = null;

export async function getScoringEngine() {
  if (!scoringEngineInstance) {
    scoringEngineInstance = engine;
  }
  return scoringEngineInstance;
}
