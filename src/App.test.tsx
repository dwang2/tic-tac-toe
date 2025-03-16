import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders tic-tac-toe title', () => {
  render(<App />);
  const titleElement = screen.getByText(/tic-tac-toe/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders grid size selector', () => {
  render(<App />);
  const gridSizeLabel = screen.getByText(/grid size/i);
  expect(gridSizeLabel).toBeInTheDocument();
});

test('renders start game button', () => {
  render(<App />);
  const startButton = screen.getByText(/start game/i);
  expect(startButton).toBeInTheDocument();
}); 