import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';

// Mock the useEffect that triggers AI moves
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useEffect: (callback: () => void | (() => void), deps?: React.DependencyList) => {
      // Only run effects that don't depend on isHumanTurn
      if (!deps || !deps.includes(originalReact.useState()[0])) {
        originalReact.useEffect(callback, deps);
      }
    }
  };
});

describe('Game Component', () => {
  test('renders game board with correct grid size', () => {
    const mockReset = jest.fn();
    const { container } = render(<Game gridSize={3} onReset={mockReset} />);
    
    // Count the number of square buttons (9 for a 3x3 grid)
    // Note: There are also 2 control buttons (New Game and Change Settings)
    const buttons = container.querySelectorAll('button');
    const squareButtons = Array.from(buttons).filter(button => 
      button.getAttribute('aria-label')?.includes('square')
    );
    expect(squareButtons.length).toBe(9);
  });

  test('renders game status', () => {
    const mockReset = jest.fn();
    render(<Game gridSize={3} onReset={mockReset} />);
    
    // The status could be "AI is thinking..." or "Next player: X"
    const statusElement = screen.getByText(/AI is thinking|Next player/i);
    expect(statusElement).toBeInTheDocument();
  });

  test('renders game control buttons', () => {
    const mockReset = jest.fn();
    render(<Game gridSize={3} onReset={mockReset} />);
    
    const newGameButton = screen.getByText(/new game/i);
    const changeSettingsButton = screen.getByText(/change settings/i);
    
    expect(newGameButton).toBeInTheDocument();
    expect(changeSettingsButton).toBeInTheDocument();
  });
}); 