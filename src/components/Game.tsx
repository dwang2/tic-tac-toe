import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './Board';

interface GameProps {
  gridSize: number;
  onReset: () => void;
}

type Player = 'X' | 'O' | null;

interface BoardProps {
  squares: Player[];
  gridSize: number;
  winningLine: number[] | null;
  onPlay: (index: number) => void;
  disabled: boolean;
}

const Game: React.FC<GameProps> = ({ gridSize, onReset }) => {
  const [history, setHistory] = useState<Player[][]>([Array(gridSize * gridSize).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [firstPlayerIsX, setFirstPlayerIsX] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [isAITurn, setIsAITurn] = useState(false);

  // Fix 1: Initialize players properly
  const [players, setPlayers] = useState<{
    human: 'X' | 'O';
    ai: 'X' | 'O';
  }>({ human: 'X', ai: 'O' });

  const currentSquares = history[currentMove];
  const isHumanTurn = xIsNext === firstPlayerIsX;

  // Define resetGame and other functions first to avoid circular dependencies
  const resetGame = () => {
    setHistory([Array(gridSize * gridSize).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
    // Alternate who goes first in each new game
    setFirstPlayerIsX(prev => !prev);
    setWinner(null);
    setWinningLine(null);
    // Fix 4: Update new game initialization
    const newStarter = players.human === 'X' ? 'O' : 'X';
    setPlayers({
      human: newStarter,
      ai: newStarter === 'X' ? 'O' : 'X'
    });
    setCurrentPlayer(newStarter);
    setHistory([Array(gridSize * gridSize).fill(null)]);
    setCurrentMove(0);
  };

  // Reset game when grid size changes
  useEffect(() => {
    resetGame();
  }, [gridSize]);

  const handlePlay = (nextSquares: Player[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
    
    // Check for winner
    const result = calculateWinner(nextSquares, gridSize);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  };

  // Move findBestMove and related functions here
  const findWinningMove = (squares: Player[], player: Player, size: number): number => {
    // Check all possible winning lines
    const lines = getAllLines(size);
    
    for (const line of lines) {
      const lineSquares = line.map(i => squares[i]);
      const playerCount = lineSquares.filter(s => s === player).length;
      const nullCount = lineSquares.filter(s => s === null).length;
      
      // If there's only one empty square and the rest are filled by the player
      if (playerCount === size - 1 && nullCount === 1) {
        const emptyIndex = line[lineSquares.findIndex(s => s === null)];
        return emptyIndex;
      }
    }
    
    return -1;
  };

  const getAllLines = (size: number): number[][] => {
    const lines: number[][] = [];
    
    // Rows
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      lines.push(row);
    }
    
    // Columns
    for (let i = 0; i < size; i++) {
      const col: number[] = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      lines.push(col);
    }
    
    // Diagonals
    const diag1: number[] = [];
    const diag2: number[] = [];
    
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
      diag2.push(i * size + (size - 1 - i));
    }
    
    lines.push(diag1);
    lines.push(diag2);
    
    return lines;
  };

  const calculateWinner = (squares: Player[], size: number): { winner: Player; line: number[] } | null => {
    const lines = getAllLines(size);
    
    for (const line of lines) {
      const firstSquare = squares[line[0]];
      if (!firstSquare) continue;
      
      if (line.every(i => squares[i] === firstSquare)) {
        return {
          winner: firstSquare,
          line: line
        };
      }
    }
    
    return null;
  };

  const findBestMove = (
    squares: Player[], 
    aiPlayer: Player, 
    humanPlayer: Player, 
    size: number
  ): number => {
    // Try to win
    const winMove = findWinningMove(squares, aiPlayer, size);
    if (winMove !== -1) return winMove;
    
    // Block opponent from winning
    const blockMove = findWinningMove(squares, humanPlayer, size);
    if (blockMove !== -1) return blockMove;
    
    // Take center if available
    const center = Math.floor(size * size / 2);
    if (squares[center] === null) return center;
    
    // Take corners if available
    const corners = [
      0,
      size - 1,
      size * (size - 1),
      size * size - 1
    ];
    
    const availableCorners = corners.filter(corner => squares[corner] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available square
    const availableMoves = squares
      .map((square, index) => (square === null ? index : -1))
      .filter(index => index !== -1);
      
    if (availableMoves.length > 0) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    return -1;
  };

  const makeAIMove = useCallback(() => {
    const aiSymbol = players.ai;
    const newSquares = [...currentSquares];
    
    // Find best move
    const bestMove = findBestMove(newSquares, aiSymbol, currentPlayer, gridSize);
    
    if (bestMove !== -1) {
      newSquares[bestMove] = aiSymbol;
      handlePlay(newSquares);
      setCurrentPlayer(players.human); // Switch back to human
    }
  }, [currentSquares, players, gridSize, currentPlayer, handlePlay]);

  // AI move logic
  useEffect(() => {
    if (!isHumanTurn && !winner && currentSquares.includes(null)) {
      setIsAIThinking(true);
      // Add a small delay to simulate AI "thinking"
      const timeoutId = setTimeout(() => {
        makeAIMove();
        setIsAIThinking(false);
      }, 600);
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentSquares, isHumanTurn, winner, makeAIMove]);

  const isDraw = !winner && !currentSquares.includes(null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : isAIThinking 
    ? "AI is thinking..." 
    : `Next player: ${currentPlayer}`;

  // Fix 2: Update click handler
  const handleSquareClick = (index: number) => {
    if (currentPlayer !== players.human || currentSquares[index] || winner) return;

    const newSquares = currentSquares.slice();
    newSquares[index] = players.human;
    handlePlay(newSquares);
    setCurrentPlayer(players.ai);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <div className="text-2xl font-semibold mb-4">{status}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={resetGame}
            className="px-5 py-2.5 bg-light-purple rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
            aria-label="New game"
          >
            New Game
          </button>
          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-light-purple rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
            aria-label="Change settings"
          >
            Change Settings
          </button>
        </div>
      </div>
      
      <div className="w-full max-w-2xl flex justify-center">
        <Board 
          squares={currentSquares} 
          gridSize={gridSize}
          winningLine={winningLine}
          onPlay={handleSquareClick}
          disabled={!isHumanTurn || isAIThinking || !!winner}
        />
      </div>
    </div>
  );
};

export default Game; 