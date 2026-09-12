import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../game/GameState';
import { getMasteryPercentage, isMastered } from '../game/MasteryEngine';
import { Home, Trash2 } from 'lucide-react';

export const AdultDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { mastery, unlockedWorldIndex, resetProgress } = useGameStore();

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo el progreso? Esta acción no se puede deshacer.')) {
      resetProgress();
      navigate('/');
    }
  };

  const masteryList = Object.values(mastery).sort((a, b) => b.lastAttemptAt - a.lastAttemptAt);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-game-primary hover:underline font-bold"
          >
            <Home size={24} />
            <span>Volver al Juego</span>
          </button>
          <h1 className="text-3xl font-black text-gray-800">Panel para Adultos</h1>
          <button 
            onClick={handleReset}
            className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
          >
            <Trash2 size={20} />
            <span>Reiniciar Progreso</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-bold mb-2">Mundos Desbloqueados</h3>
            <p className="text-4xl font-black text-game-primary">{unlockedWorldIndex + 1} / 7</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-bold mb-2">Habilidades Trabajadas</h3>
            <p className="text-4xl font-black text-game-secondary">{masteryList.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-bold mb-2">Habilidades Dominadas</h3>
            <p className="text-4xl font-black text-game-accent">
              {masteryList.filter(m => isMastered(m)).length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-bold text-gray-600">Habilidad / Objetivo</th>
                <th className="p-4 font-bold text-gray-600">Intentos</th>
                <th className="p-4 font-bold text-gray-600">Aciertos</th>
                <th className="p-4 font-bold text-gray-600">Dominio (%)</th>
                <th className="p-4 font-bold text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {masteryList.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Aún no hay datos. ¡Que comience el juego!
                  </td>
                </tr>
              )}
              {masteryList.map(m => (
                <tr key={m.target} className="border-t border-gray-100">
                  <td className="p-4 font-bold uppercase">{m.target}</td>
                  <td className="p-4">{m.attempts}</td>
                  <td className="p-4 text-green-600 font-bold">{m.successes}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${isMastered(m) ? 'bg-green-500' : 'bg-blue-500'}`} 
                          style={{ width: `${getMasteryPercentage(m)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-600">{getMasteryPercentage(m)}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {isMastered(m) ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Dominado</span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">En progreso</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
