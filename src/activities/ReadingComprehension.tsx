import React from 'react';
import { Activity } from '../curriculum/worlds';
import { speak } from '../audio/speech';

interface Props {
  activity: Activity;
  onComplete: (success: boolean) => void;
}

const getImagePlaceholder = (word: string) => {
    const emojis: Record<string, string> = {
        'sapo_saltando': '🐸 ⬆️',
        'sapo_durmiendo': '🐸 💤',
        'palo': '🪵',
        'paloma_paseando': '🕊️ 🚶',
        'mesa': '🪑',
    };
    return emojis[word] || word.toUpperCase();
}

export const ReadingComprehension: React.FC<Props> = ({ activity, onComplete }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-3xl font-bold mb-8 text-center text-game-text">Lee la frase</h3>
      
      <div 
        className="mb-12 text-6xl font-black text-game-primary tracking-wide text-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => speak(activity.target)}
      >
        "{activity.target}"
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {activity.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => onComplete(opt === activity.correctAnswer)}
            className="text-6xl p-10 bg-yellow-100 text-game-text rounded-3xl hover:bg-yellow-200 hover:scale-105 transition-all shadow-md flex items-center justify-center min-h-[160px]"
          >
            {getImagePlaceholder(opt)}
          </button>
        ))}
      </div>
    </div>
  );
};
