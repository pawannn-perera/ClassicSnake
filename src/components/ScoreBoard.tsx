import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex justify-center gap-8 mb-4">
      <div className="text-center">
        <p className="text-gray-600 font-medium">Score</p>
        <p className="text-2xl font-bold">{score}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium flex items-center gap-1">
          <Trophy size={16} className="text-yellow-500" />
          High Score
        </p>
        <p className="text-2xl font-bold">{highScore}</p>
      </div>
    </div>
  );
}