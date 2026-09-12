import React from 'react';
import { Activity } from '../curriculum/worlds';
import { speak } from '../audio/speech';

interface Props {
  activity: Activity;
  onComplete: (success: boolean) => void;
}

export const CompleteWord: React.FC<Props> = ({ activity, onComplete }) => {
  const parts = activity.target.split('__');
  const prefix = parts[0] || '';
  const suffix = parts[1] || '';

  const handleSelect = (opt: string) => {
    speak(opt);
    const success = opt === activity.correctAnswer;
    if (success) {
        speak(prefix + opt + suffix);
    }
    setTimeout(() => {
        onComplete(success);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-3xl font-bold mb-8 text-center text-game-text">Completa la palabra</h3>
      
      <div className="flex items-center justify-center mb-12 h-32">
        <span className="text-7xl font-black text-game-text uppercase">{prefix}</span>
        <span className="text-7xl font-black text-gray-300 mx-2 border-b-8 border-gray-300 w-24 inline-block"></span>
        <span className="text-7xl font-black text-game-text uppercase">{suffix}</span>
      </div>

      <div className="flex space-x-6">
        {activity.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="text-5xl font-bold p-8 bg-purple-100 text-purple-600 rounded-3xl hover:bg-purple-200 hover:scale-110 active:scale-95 transition-all shadow-md uppercase"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
