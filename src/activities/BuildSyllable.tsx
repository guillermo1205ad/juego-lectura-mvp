import React, { useState } from 'react';
import { Activity } from '../curriculum/worlds';
import { speak } from '../audio/speech';

interface Props {
  activity: Activity;
  onComplete: (success: boolean) => void;
}

export const BuildSyllable: React.FC<Props> = ({ activity, onComplete }) => {
  const [combined, setCombined] = useState(false);

  const parts = activity.parts || [];
  const c = parts[0]?.toUpperCase() || '';
  const v = parts[1]?.toUpperCase() || '';

  const handleCombine = () => {
    setCombined(true);
    speak(activity.correctAnswer);
    setTimeout(() => {
        onComplete(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-3xl font-bold mb-12 text-center text-game-text">Junta las letras</h3>
      
      <div className="flex items-center justify-center space-x-4 mb-12 h-40">
        {!combined ? (
            <>
                <div className="text-8xl font-black text-blue-500 hover:scale-110 cursor-pointer" onClick={() => speak(c)}>{c}</div>
                <div className="text-6xl font-bold text-gray-400">+</div>
                <div className="text-8xl font-black text-red-500 hover:scale-110 cursor-pointer" onClick={() => speak(v)}>{v}</div>
            </>
        ) : (
            <div className="text-9xl font-black text-purple-600 animate-bounce">{c}{v}</div>
        )}
      </div>

      {!combined && (
        <button
            onClick={handleCombine}
            className="text-3xl font-bold px-12 py-6 bg-game-secondary text-white rounded-full shadow-lg hover:bg-emerald-600 hover:scale-105 transition-all"
        >
            ¡Unir!
        </button>
      )}
    </div>
  );
};
