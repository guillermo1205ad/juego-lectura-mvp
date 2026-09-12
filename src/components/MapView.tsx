import React from 'react';
import { useNavigate } from 'react-router-dom';
import { curriculum } from '../curriculum/worlds';
import { useGameStore } from '../game/GameState';
import { isMastered, getMasteryPercentage } from '../game/MasteryEngine';
import { Lock, Star, Settings } from 'lucide-react';

export const MapView: React.FC = () => {
  const navigate = useNavigate();
  const { unlockedWorldIndex, mastery, unlockNextWorld } = useGameStore();

  const handleUnlockDebug = () => {
    unlockNextWorld();
  };

  return (
    <div className="min-h-screen bg-game-bg p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-12">
         <h1 className="text-4xl font-black text-game-primary">El Mundo de las Palabras</h1>
         <button 
           onClick={() => navigate('/adult-dashboard')}
           className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-500"
         >
           <Settings size={24} />
         </button>
      </div>

      <div className="w-full max-w-4xl space-y-8 relative">
        {/* Debug button just in case we need to unlock easily */}
        {process.env.NODE_ENV === 'development' && (
           <button onClick={handleUnlockDebug} className="absolute -top-12 right-0 text-xs text-gray-400">Unlock Next (Dev)</button>
        )}

        {curriculum.map((world, index) => {
          const isUnlocked = index <= unlockedWorldIndex;
          
          return (
            <div 
              key={world.id} 
              className={`p-6 rounded-3xl border-4 ${
                isUnlocked ? 'bg-white border-game-primary shadow-xl' : 'bg-gray-100 border-gray-300 opacity-70'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${isUnlocked ? 'text-game-text' : 'text-gray-400'}`}>
                    {world.title}
                  </h2>
                  <p className="text-gray-500">{world.description}</p>
                </div>
                {!isUnlocked && <Lock className="text-gray-400" size={32} />}
              </div>

              {isUnlocked && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {world.activities.map((act, actIndex) => {
                    const record = mastery[act.target];
                    const mastered = isMastered(record);
                    const pct = getMasteryPercentage(record);
                    
                    return (
                      <button
                        key={act.id}
                        onClick={() => navigate(`/play/${world.id}/${act.id}`)}
                        className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
                          mastered ? 'bg-green-100 border-2 border-green-400' : 'bg-blue-50 border-2 border-blue-200'
                        }`}
                      >
                        <span className="text-lg font-bold text-gray-700 mb-2">Act. {actIndex + 1}</span>
                        <div className="flex items-center space-x-1">
                          {mastered ? (
                            <Star className="text-yellow-500 fill-current" size={24} />
                          ) : (
                            <span className="text-xs text-gray-500">{pct}%</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
