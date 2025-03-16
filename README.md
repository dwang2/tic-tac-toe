# Tic-Tac-Toe Game

A modern, responsive Tic-Tac-Toe game built with React, TypeScript, and TailwindCSS.

## UI Showcase

![Tic-Tac-Toe Game Demo](./demo.gif)

## AI Code Generation Showcase

This project demonstrates the capabilities of AI code generation using Cursor. Below is a demonstration of how Cursor Agent helped develop this application:

![Cursor AI Code Generation Demo](./cursor-demo.gif)

*The AI assistant helped with:*
- Setting up the React TypeScript project structure
- Implementing game logic and AI opponent
- Creating responsive UI components with TailwindCSS
- Resolving grid styling and layout challenges
- Implementing accessibility features 
- Writing comprehensive tests
- Fixing compilation errors and styling issues

## Features

- Customizable grid size (3x3, 4x4, or 5x5)
- Play against an AI opponent
- Responsive design for all device sizes
- Smooth animations and modern UI
- Accessibility features

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tic-tac-toe.git
cd tic-tac-toe
```

2. Generate package-lock.json:
```bash
npm install --package-lock-only
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up -d --build
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

## Game Rules

- The game is played on a grid of size 3x3, 4x4, or 5x5 (selectable before starting)
- Players take turns placing their marks (X or O) in empty squares
- The first player to get n marks in a row (horizontally, vertically, or diagonally) wins
- If all squares are filled and no player has won, the game is a draw

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Docker
- Nginx

## License

This project is licensed under the MIT License - see the LICENSE file for details. 