import React from 'react';
import { Position } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
}

export function GameBoard({ snake, food, gridSize }: GameBoardProps) {
  const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill('empty'));
  
  // Place snake on grid
  snake.forEach((pos, index) => {
    if (pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize) {
      grid[pos.y][pos.x] = index === 0 ? 'head' : 'body';
    }
  });

  // Place food on grid
  if (food.x >= 0 && food.x < gridSize && food.y >= 0 && food.y < gridSize) {
    grid[food.y][food.x] = 'food';
  }

  return (
    <div className="grid gap-1" style={{ 
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      width: '100%',
      maxWidth: '500px',
      aspectRatio: '1/1'
    }}>
      {grid.map((row, y) => 
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`
              rounded-sm
              ${cell === 'empty' ? 'bg-gray-200' : ''}
              ${cell === 'head' ? 'bg-green-600' : ''}
              ${cell === 'body' ? 'bg-green-500' : ''}
              ${cell === 'food' ? 'bg-red-500' : ''}
            `}
          />
        ))
      )}
    </div>
  );
}