import { MasteryRecord } from './GameState';

export const isMastered = (record?: MasteryRecord): boolean => {
  if (!record) return false;
  
  if (record.attempts < 3) return false;

  const { recentHistory } = record;
  const recentAttempts = recentHistory.length;
  const recentSuccesses = recentHistory.filter(Boolean).length;

  const successRate = recentSuccesses / recentAttempts;

  if (successRate >= 0.8) return true;
  
  const lastThree = recentHistory.slice(-3);
  if (lastThree.length === 3 && lastThree.every(Boolean)) return true;

  return false;
};

export const getMasteryPercentage = (record?: MasteryRecord): number => {
    if (!record || record.attempts === 0) return 0;
    const { recentHistory } = record;
    const recentAttempts = recentHistory.length;
    const recentSuccesses = recentHistory.filter(Boolean).length;
    return Math.round((recentSuccesses / recentAttempts) * 100);
};
