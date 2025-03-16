import React from 'react';

type Player = 'X' | 'O' | null;

interface SquareProps {
  value: Player;
  isWinningSquare: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, isWinningSquare, onClick, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  const getPlayerClass = () => {
    if (!value) return '';
    
    return value === 'X' 
      ? 'text-player-x' 
      : 'text-player-o';
  };

  const getAnimationClass = () => {
    if (!value) return '';
    
    return isWinningSquare 
      ? 'animate-bounce-once' 
      : 'animate-scale-in';
  };

  return (
    <button
      className={`
        w-full h-full flex items-center justify-center
        text-3xl md:text-4xl font-bold border-2 border-gray-300
        focus:outline-none focus:ring-2 focus:ring-light-purple
        transition-colors min-h-[64px] aspect-square
        ${isWinningSquare ? 'bg-yellow-100' : 'bg-white hover:bg-gray-100'}
        ${getPlayerClass()}
        ${getAnimationClass()}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      tabIndex={0}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
};

export default Square; 