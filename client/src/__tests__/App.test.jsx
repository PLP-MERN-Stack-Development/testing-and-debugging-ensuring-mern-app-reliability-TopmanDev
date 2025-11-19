// App.test.jsx - Tests for App component

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the socket hook
vi.mock('../socket/socket', () => ({
  useSocket: vi.fn(() => ({
    isConnected: false,
    currentUser: null,
    connectionError: null,
    reconnectAttempt: 0,
    connect: vi.fn(),
    disconnect: vi.fn(),
    getUnreadCounts: vi.fn(),
  })),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Real-Time Chat/i)).toBeInTheDocument();
  });

  it('should render Login component when not logged in', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
  });
});
