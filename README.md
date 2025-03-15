# Classic Snake Game 🐍

## Features

- 🎮 Classic Snake gameplay with arrow key controls
- 📱 Responsive design that works on both desktop and mobile
- 🏆 High score tracking with localStorage
- 🎯 Progressive difficulty (snake speeds up as you score)
- ⚡ Built with modern React hooks and TypeScript
- 🎨 Sleek UI with Tailwind CSS
- ⏸️ Pause/Resume functionality
- 🔄 Game reset option

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## How to Play

- Use arrow keys (↑, ↓, ←, →) to control the snake's direction
- Eat the red food to grow and score points
- Avoid hitting the walls or the snake's own body
- The snake moves faster as your score increases
- Press the Pause button to pause the game
- Press Reset to start a new game

## Game Controls

- **Arrow Keys**: Control snake direction
- **Start/Pause Button**: Toggle game pause state
- **Reset Button**: Start a new game

## Technical Details

### Built With

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

### Project Structure

```
src/
├── components/         # React components
│   ├── GameBoard.tsx  # Game grid display
│   ├── GameControls.tsx   # Game control buttons
│   ├── GameOver.tsx   # Game over overlay
│   └── ScoreBoard.tsx # Score display
├── hooks/
│   └── useSnakeGame.ts    # Game logic and state management
├── types/
│   └── game.ts       # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

### Key Features Implementation

- **Game State Management**: Uses React's useState and useEffect hooks
- **Snake Movement**: Controlled by setInterval for smooth animation
- **Collision Detection**: Checks for wall and self-collision
- **Score Tracking**: Maintains current score and high score in localStorage
- **Responsive Design**: Tailwind CSS classes for adaptive layout
- **Type Safety**: Full TypeScript implementation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
