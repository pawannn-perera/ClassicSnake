import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { GameOver } from './components/GameOver';
import { useSnakeGame } from './hooks/useSnakeGame';

function App() {
  const {
    snake,
    food,
    score,
    highScore,
    isGameOver,
    isPaused,
    gridSize,
    startGame,
    pauseGame,
    resetGame,
  } = useSnakeGame();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Snake Game</h1>
        
        <ScoreBoard score={score} highScore={highScore} />
        
        <div className="relative flex justify-center">
          <GameBoard
            snake={snake}
            food={food}
            gridSize={gridSize}
          />
          
          {isGameOver && (
            <GameOver
              score={score}
              highScore={highScore}
              onRestart={resetGame}
            />
          )}
        </div>

        <GameControls
          onStart={startGame}
          onPause={pauseGame}
          onReset={resetGame}
          isPaused={isPaused}
          isGameOver={isGameOver}
        />

        <div className="mt-8 text-center text-gray-600">
          <p className="font-medium">How to Play</p>
          <p>Use arrow keys to control the snake</p>
          <p>Eat the red food to grow and score points</p>
          <p>Don't hit the walls or yourself!</p>
        </div>
      </div>
    </div>
  );
}

export default App;