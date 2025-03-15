import { useState, useEffect, useCallback } from 'react';
import { Direction, Position, GameState } from '../types/game';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;
const MIN_SPEED = 50;

const INITIAL_STATE: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 15, y: 10 },
  direction: 'RIGHT',
  isGameOver: false,
  score: 0,
  highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
  isPaused: true,
};

export function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback((): Position => {
    const newFood: Position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    // Ensure food doesn't spawn on snake
    if (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }

    return newFood;
  }, [gameState.snake]);

  const checkCollision = (head: Position): boolean => {
    // Wall collision
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    // Self collision (skip head)
    return gameState.snake.slice(1).some(
      segment => segment.x === head.x && segment.y === head.y
    );
  };

  const moveSnake = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver) return;

    const newSnake = [...gameState.snake];
    const head = { ...newSnake[0] };

    switch (gameState.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      const newHighScore = Math.max(gameState.score, gameState.highScore);
      localStorage.setItem('snakeHighScore', newHighScore.toString());
      
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        highScore: newHighScore,
      }));
      return;
    }

    newSnake.unshift(head);

    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      // Snake ate food
      setGameState(prev => ({
        ...prev,
        food: generateFood(),
        score: prev.score + 1,
      }));
      
      // Increase speed
      setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREASE));
    } else {
      newSnake.pop();
    }

    setGameState(prev => ({
      ...prev,
      snake: newSnake,
    }));
  }, [gameState, generateFood]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.isGameOver) return;

    const keyDirections: { [key: string]: Direction } = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
    };

    const newDirection = keyDirections[event.key];
    if (!newDirection) return;

    // Prevent default scrolling behavior
    event.preventDefault();

    // Prevent 180-degree turns
    const oppositeDirections: { [key in Direction]: Direction } = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (oppositeDirections[newDirection] !== gameState.direction) {
      setGameState(prev => ({ ...prev, direction: newDirection }));
    }
  }, [gameState.direction, gameState.isGameOver]);

  useEffect(() => {
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [moveSnake, speed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPaused: false }));
  };

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  };

  const resetGame = () => {
    setSpeed(INITIAL_SPEED);
    setGameState({
      ...INITIAL_STATE,
      highScore: gameState.highScore,
      food: generateFood(),
    });
  };

  return {
    ...gameState,
    gridSize: GRID_SIZE,
    startGame,
    pauseGame,
    resetGame,
  };
}