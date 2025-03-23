import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders World Countries heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/World Countries/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders subtitle text', () => {
  render(<App />);
  const subtitleElement = screen.getByText(/Browse, filter and mark visited countries/i);
  expect(subtitleElement).toBeInTheDocument();
});
