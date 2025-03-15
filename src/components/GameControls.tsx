import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPaused: boolean;
  isGameOver: boolean;
}

export function GameControls({ onStart, onPause, onReset, isPaused, isGameOver }: GameControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-4">
      {!isGameOver && (
        <button
          onClick={isPaused ? onStart : onPause}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
          {isPaused ? 'Start' : 'Pause'}
        </button>
      )}
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <RotateCcw size={20} />
        Reset
      </button>
    </div>
  );
}