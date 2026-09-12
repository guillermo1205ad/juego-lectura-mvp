import React from 'react';
import { Activity } from '../curriculum/worlds';
import { speak } from '../audio/speech';

interface Props {
  activity: Activity;
  onComplete: (success: boolean) => void;
}

const getImagePlaceholder = (word: string) => {
    const emojis: Record<string, string> = {
        'abeja': '🐝',
        'elefante': '🐘',
        'oso': '🐻',
        'pelo': '💇',
        'lupa': '🔍',
        'pila': '🔋',
        'mesa': '🪑',
        'misa': '⛪',
        'masa': '🥟'
    };
    return emojis[word.toLowerCase()] || word.toUpperCase();
}

export const ReadFind: React.FC<Props> = ({ activity, onComplete }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-3xl font-bold mb-8 text-center text-game-text">Lee y encuentra</h3>
      
      <div className="mb-12 text-8xl font-black text-game-accent uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform" onClick={() => speak(activity.target)}>
        {activity.target}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {activity.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => onComplete(opt === activity.correctAnswer)}
            className="text-6xl p-10 bg-green-100 text-game-text rounded-3xl hover:bg-green-200 hover:scale-105 transition-all shadow-md flex items-center justify-center"
          >
            {getImagePlaceholder(opt)}
          </button>
        ))}
      </div>
    </div>
  );
};
