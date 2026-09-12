import React from 'react';
import { Activity } from '../curriculum/worlds';
import { speak } from '../audio/speech';
import { Volume2 } from 'lucide-react';

interface Props {
  activity: Activity;
  onComplete: (success: boolean) => void;
}

export const ListenChoose: React.FC<Props> = ({ activity, onComplete }) => {
  const handlePlaySound = () => {
    speak(activity.target);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-3xl font-bold mb-8 text-center text-game-text">Escucha y elige</h3>
      
      <button 
        onClick={handlePlaySound}
        className="mb-12 p-8 bg-game-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95"
      >
        <Volume2 size={80} />
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {activity.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => onComplete(opt === activity.correctAnswer)}
            className="text-5xl font-bold p-8 bg-blue-100 text-game-primary rounded-3xl hover:bg-blue-200 hover:scale-105 transition-all shadow-md uppercase"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
