// Login.test.jsx - Tests for Login component

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';

describe('Login Component', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    render(<Login onLogin={mockOnLogin} isConnected={true} />);
    
    expect(screen.getByText(/Real-Time Chat/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join Chat/i })).toBeInTheDocument();
  });

  it('should update username input', async () => {
    render(<Login onLogin={mockOnLogin} isConnected={false} />);
    
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    await userEvent.type(usernameInput, 'TestUser');
    
    expect(usernameInput.value).toBe('TestUser');
  });

  it('should disable submit button when username is empty', () => {
    render(<Login onLogin={mockOnLogin} isConnected={true} />);
    
    const submitButton = screen.getByRole('button', { name: /Join Chat/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when username is provided', async () => {
    render(<Login onLogin={mockOnLogin} isConnected={true} />);
    
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    await userEvent.type(usernameInput, 'TestUser');
    
    const submitButton = screen.getByRole('button', { name: /Join Chat/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should call onLogin with username on submit', async () => {
    render(<Login onLogin={mockOnLogin} isConnected={true} />);
    
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    await userEvent.type(usernameInput, 'TestUser');
    
    const submitButton = screen.getByRole('button', { name: /Join Chat/i });
    await userEvent.click(submitButton);
    
    expect(mockOnLogin).toHaveBeenCalledWith('TestUser', undefined);
  });

  it('should generate avatar when button is clicked', async () => {
    render(<Login onLogin={mockOnLogin} isConnected={false} />);
    
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    await userEvent.type(usernameInput, 'TestUser');
    
    const generateButton = screen.getByText(/Generate Avatar/i);
    await userEvent.click(generateButton);
    
    const avatarInput = screen.getByPlaceholderText(/https:\/\/example.com\/avatar.jpg/i);
    expect(avatarInput.value).toContain('ui-avatars.com');
  });

  it('should display connected status', () => {
    render(<Login onLogin={mockOnLogin} isConnected={true} />);
    
    expect(screen.getByText(/Connected to server/i)).toBeInTheDocument();
  });

  it('should display reconnecting status', () => {
    render(
      <Login 
        onLogin={mockOnLogin} 
        isConnected={false} 
        reconnectAttempt={3} 
      />
    );
    
    expect(screen.getByText(/Reconnecting/i)).toBeInTheDocument();
  });

  it('should enforce max length on username', () => {
    render(<Login onLogin={mockOnLogin} isConnected={false} />);
    
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    expect(usernameInput).toHaveAttribute('maxLength', '20');
  });
});
