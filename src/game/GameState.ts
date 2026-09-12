import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MasteryRecord {
  target: string;
  attempts: number;
  successes: number;
  recentHistory: boolean[]; // true for success, false for failure
  lastAttemptAt: number;
}

interface GameState {
  unlockedWorldIndex: number;
  mastery: Record<string, MasteryRecord>;
  unlockNextWorld: () => void;
  recordAttempt: (target: string, success: boolean) => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      unlockedWorldIndex: 0,
      mastery: {},
      unlockNextWorld: () => set((state) => ({ 
        unlockedWorldIndex: Math.min(state.unlockedWorldIndex + 1, 6) 
      })),
      recordAttempt: (target, success) => set((state) => {
        const record = state.mastery[target] || {
          target,
          attempts: 0,
          successes: 0,
          recentHistory: [],
          lastAttemptAt: 0,
        };

        const newHistory = [...record.recentHistory, success].slice(-10); // Keep last 10 attempts
        
        return {
          mastery: {
            ...state.mastery,
            [target]: {
              ...record,
              attempts: record.attempts + 1,
              successes: record.successes + (success ? 1 : 0),
              recentHistory: newHistory,
              lastAttemptAt: Date.now(),
            }
          }
        };
      }),
      resetProgress: () => set({ unlockedWorldIndex: 0, mastery: {} })
    }),
    {
      name: 'leer-game-storage',
    }
  )
);
