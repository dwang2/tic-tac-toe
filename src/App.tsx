import React, { useState } from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(3);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value);
    if (size >= 3 && size <= 5) {
      setGridSize(size);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in">Tic-Tac-Toe</h1>
      
      {!gameStarted ? (
        <div className="bg-light-purple p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-center">Game Settings</h2>
          
          <div className="mb-6">
            <label htmlFor="gridSize" className="block mb-2 font-medium">
              Grid Size: {gridSize}x{gridSize}
            </label>
            <input
              type="range"
              id="gridSize"
              min="3"
              max="5"
              value={gridSize}
              onChange={handleSizeChange}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
              aria-label="Select grid size"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>3x3</span>
              <span>4x4</span>
              <span>5x5</span>
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="w-full py-3 bg-white text-dark-purple font-bold rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Start game"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="animate-fade-in w-full max-w-lg">
          <Game gridSize={gridSize} onReset={resetGame} />
        </div>
      )}
    </div>
  );
};

export default App; 