import React from 'react';
import Square from './Square';

type Player = 'X' | 'O' | null;

interface BoardProps {
  squares: Player[];
  gridSize: number;
  winningLine: number[] | null;
  onPlay: (index: number) => void;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, gridSize, winningLine, onPlay, disabled }) => {
  const handleClick = (index: number) => {
    if (!disabled && !squares[index]) {
      onPlay(index);
    }
  };

  // Calculate appropriate size based on grid size
  const getGridSize = () => {
    // Base size for each square (in pixels)
    const baseSquareSize = 80;
    // Padding for each square (in pixels)
    const squarePadding = 8;
    // Total size for each square including padding
    const totalSquareSize = baseSquareSize + (squarePadding * 2);
    // Calculate total width needed for the grid
    return (totalSquareSize * gridSize) + 32; // 32px for container padding
  };

  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-lg animate-fade-in"
      style={{ 
        width: `${getGridSize()}px`,
        maxWidth: '100%'
      }}
    >
      <div 
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {squares.map((value, i) => {
          const isWinningSquare = winningLine?.includes(i) || false;
          
          return (
            <div key={i} className="aspect-square">
              <Square
                value={value}
                isWinningSquare={isWinningSquare}
                onClick={() => handleClick(i)}
                disabled={disabled || !!value}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board; 