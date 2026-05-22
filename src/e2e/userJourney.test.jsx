import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import App from '../App';

// Mock API service when your App fetches data:
// vi.mock('../services/api.js', () => ({
//   fetchItems: vi.fn().mockResolvedValue([
//     { id: '1', title: 'Test Item', description: 'A test' },
//   ]),
// }));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('User Journey — basic interaction', () => {
  it('renders the app header', () => {
    render(<App />);
    expect(screen.getByText('Claude Vite Starter')).toBeInTheDocument();
  });

  it('renders example items', () => {
    render(<App />);
    expect(screen.getAllByTestId('example-card').length).toBeGreaterThan(0);
  });

  it('clicking a card shows selected output', () => {
    render(<App />);
    fireEvent.click(screen.getAllByTestId('example-card')[0]);
    expect(screen.getByTestId('selected-output')).toBeInTheDocument();
  });
});
