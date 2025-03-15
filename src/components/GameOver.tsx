import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export function GameOver({ score, highScore, onRestart }: GameOverProps) {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        
        {isNewHighScore && (
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4">
            <Trophy size={24} />
            <p className="text-lg font-semibold">New High Score!</p>
          </div>
        )}
        
        <p className="text-xl mb-2">Score: {score}</p>
        <p className="text-gray-600 mb-6">High Score: {highScore}</p>
        
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}