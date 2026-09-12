import React, { useState, useEffect } from 'react';
import { Activity } from '../curriculum/worlds';
import { speak } from '../audio/speech';
import { RotateCcw } from 'lucide-react';

interface Props {
  activity: Activity;
  onComplete: (success: boolean) => void;
}

export const BuildWord: React.FC<Props> = ({ activity, onComplete }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [shuffledParts, setShuffledParts] = useState<{id: number, text: string}[]>([]);

  useEffect(() => {
    if (activity.parts) {
      const partsWithId = activity.parts.map((p, i) => ({ id: i, text: p }));
      setShuffledParts(partsWithId.sort(() => Math.random() - 0.5));
    }
  }, [activity]);

  const handleSelect = (index: number, text: string) => {
    speak(text);
    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === activity.parts?.length) {
      const builtWord = newSelected.map(i => shuffledParts[i].text).join('').toLowerCase();
      if (builtWord === activity.correctAnswer.toLowerCase()) {
        setTimeout(() => onComplete(true), 1000);
      } else {
        setTimeout(() => {
          setSelectedIndices([]);
          onComplete(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-3xl font-bold mb-8 text-center text-game-text">Ordena las sílabas</h3>
      
      <div className="flex items-center justify-center mb-8 h-32 w-full max-w-2xl bg-gray-100 rounded-3xl border-4 border-dashed border-gray-300 relative">
        <div className="text-6xl font-black text-game-primary uppercase tracking-widest cursor-pointer" onClick={() => speak(selectedIndices.map(i => shuffledParts[i].text).join(''))}>
          {selectedIndices.map(i => shuffledParts[i].text).join('')}
        </div>
        {selectedIndices.length > 0 && (
          <button 
             onClick={() => setSelectedIndices([])}
             className="absolute right-4 text-gray-400 hover:text-red-500"
          >
             <RotateCcw size={32} />
          </button>
        )}
      </div>

      <div className="flex space-x-6 mb-8">
        {shuffledParts.map((part, i) => {
            const isUsed = selectedIndices.includes(i);
            return (
              <button
                key={part.id}
                onClick={() => !isUsed && handleSelect(i, part.text)}
                disabled={isUsed}
                className={`text-5xl font-bold p-8 rounded-3xl shadow-md uppercase transition-all ${
                  isUsed ? 'bg-gray-200 text-gray-400 opacity-50 scale-95' : 'bg-orange-100 text-game-accent hover:bg-orange-200 hover:scale-110 active:scale-95'
                }`}
              >
                {part.text}
              </button>
            );
        })}
      </div>
    </div>
  );
};
