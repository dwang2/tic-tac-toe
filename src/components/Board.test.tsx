import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './Board';

describe('Board Component', () => {
  test('renders correct number of squares based on grid size', () => {
    const mockPlay = jest.fn();
    const { container } = render(
      <Board 
        squares={Array(9).fill(null)} 
        gridSize={3} 
        winningLine={null} 
        onPlay={mockPlay} 
        disabled={false} 
      />
    );
    
    const squares = container.querySelectorAll('button');
    expect(squares.length).toBe(9);
  });
  
  test('calls onPlay when a square is clicked', () => {
    const mockPlay = jest.fn();
    const { container } = render(
      <Board 
        squares={Array(9).fill(null)} 
        gridSize={3} 
        winningLine={null} 
        onPlay={mockPlay} 
        disabled={false} 
      />
    );
    
    const firstSquare = container.querySelector('button');
    if (firstSquare) {
      fireEvent.click(firstSquare);
      expect(mockPlay).toHaveBeenCalled();
    }
  });
  
  test('does not call onPlay when disabled', () => {
    const mockPlay = jest.fn();
    const { container } = render(
      <Board 
        squares={Array(9).fill(null)} 
        gridSize={3} 
        winningLine={null} 
        onPlay={mockPlay} 
        disabled={true} 
      />
    );
    
    const firstSquare = container.querySelector('button');
    if (firstSquare) {
      fireEvent.click(firstSquare);
      expect(mockPlay).not.toHaveBeenCalled();
    }
  });
}); 