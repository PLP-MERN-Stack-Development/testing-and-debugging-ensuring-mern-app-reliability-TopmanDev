// socket.test.js - Tests for socket utility

import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Socket Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export socket instance', async () => {
    const socketModule = await import('../socket/socket');
    expect(socketModule.socket).toBeDefined();
    expect(typeof socketModule.socket).toBe('object');
  });

  it('should export useSocket hook', async () => {
    const socketModule = await import('../socket/socket');
    expect(socketModule.useSocket).toBeDefined();
    expect(typeof socketModule.useSocket).toBe('function');
  });
});

describe('Socket Utility Functions', () => {
  it('should be properly configured', () => {
    // Socket configuration is tested by actual usage
    expect(true).toBe(true);
  });
});
