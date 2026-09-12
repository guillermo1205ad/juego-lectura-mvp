import { describe, it, expect } from 'vitest';
import { isMastered, getMasteryPercentage } from './MasteryEngine';
import { MasteryRecord } from './GameState';

describe('MasteryEngine', () => {
  it('should not be mastered if attempts < 3', () => {
    const record: MasteryRecord = {
      target: 'a',
      attempts: 2,
      successes: 2,
      recentHistory: [true, true],
      lastAttemptAt: Date.now()
    };
    expect(isMastered(record)).toBe(false);
  });

  it('should be mastered if 80% success in recent history', () => {
    const record: MasteryRecord = {
      target: 'a',
      attempts: 5,
      successes: 4,
      recentHistory: [true, true, true, false, true],
      lastAttemptAt: Date.now()
    };
    expect(isMastered(record)).toBe(true);
    expect(getMasteryPercentage(record)).toBe(80);
  });

  it('should be mastered if last 3 are all correct', () => {
    const record: MasteryRecord = {
      target: 'a',
      attempts: 5,
      successes: 3,
      recentHistory: [false, false, true, true, true],
      lastAttemptAt: Date.now()
    };
    expect(isMastered(record)).toBe(true);
  });

  it('should not be mastered if below 80% and last 3 not all correct', () => {
    const record: MasteryRecord = {
      target: 'a',
      attempts: 5,
      successes: 3,
      recentHistory: [true, true, false, true, false],
      lastAttemptAt: Date.now()
    };
    expect(isMastered(record)).toBe(false);
    expect(getMasteryPercentage(record)).toBe(60);
  });
});
