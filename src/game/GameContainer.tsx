import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { curriculum } from '../curriculum/worlds';
import { useGameStore } from './GameState';
import { ListenChoose } from '../activities/ListenChoose';
import { ReadFind } from '../activities/ReadFind';
import { BuildSyllable } from '../activities/BuildSyllable';
import { BuildWord } from '../activities/BuildWord';
import { CompleteWord } from '../activities/CompleteWord';
import { ReadingComprehension } from '../activities/ReadingComprehension';
import { playSuccessSound, playEncourageSound } from '../audio/speech';
import { Home } from 'lucide-react';

export const GameContainer: React.FC = () => {
  const { worldId, activityId } = useParams<{ worldId: string; activityId: string }>();
  const navigate = useNavigate();
  const { recordAttempt } = useGameStore();
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  const world = curriculum.find(w => w.id === worldId);
  const activity = world?.activities.find(a => a.id === activityId);

  if (!world || !activity) {
    return <div>Actividad no encontrada</div>;
  }

  const handleComplete = (success: boolean) => {
    recordAttempt(activity.target, success);
    if (success) {
      setFeedback('success');
      playSuccessSound();
      setTimeout(() => {
        setFeedback(null);
        navigate('/'); // Volver al mapa o a la siguiente actividad
      }, 2000);
    } else {
      setFeedback('error');
      playEncourageSound();
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const renderActivity = () => {
    switch (activity.type) {
      case 'ListenChoose':
        return <ListenChoose activity={activity} onComplete={handleComplete} />;
      case 'ReadFind':
        return <ReadFind activity={activity} onComplete={handleComplete} />;
      case 'BuildSyllable':
        return <BuildSyllable activity={activity} onComplete={handleComplete} />;
      case 'BuildWord':
        return <BuildWord activity={activity} onComplete={handleComplete} />;
      case 'CompleteWord':
        return <CompleteWord activity={activity} onComplete={handleComplete} />;
      case 'ReadingComprehension':
        return <ReadingComprehension activity={activity} onComplete={handleComplete} />;
      default:
        return <div>Tipo de actividad desconocido</div>;
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
         <button 
           onClick={() => navigate('/')}
           className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 text-game-primary"
         >
           <Home size={32} />
         </button>
         <h2 className="text-2xl font-bold text-game-text">{world.title}</h2>
         <div className="w-10"></div> {/* Spacer */}
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
        {feedback === 'success' && (
           <div className="absolute inset-0 bg-green-100 z-50 flex items-center justify-center animate-pulse">
              <span className="text-6xl font-bold text-green-600">¡Muy bien!</span>
           </div>
        )}
        {feedback === 'error' && (
           <div className="absolute inset-0 bg-orange-50 z-50 flex items-center justify-center">
              <span className="text-5xl font-bold text-orange-500">¡Casi! Probemos otra vez</span>
           </div>
        )}

        {renderActivity()}
      </div>
    </div>
  );
};
