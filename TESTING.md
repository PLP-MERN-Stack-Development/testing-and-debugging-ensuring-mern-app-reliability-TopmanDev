# Testing Guide

## Overview
This project includes comprehensive tests for both server and client components.

## Running Tests

### Server Tests
```bash
cd server

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
```

### Client Tests
```bash
cd client

# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

### Server Tests (`server/server.test.js`)
- **Connection Tests**: Socket connection and disconnection
- **User Tests**: User joining, authentication
- **Room Management**: Creating, joining, leaving rooms
- **Message Tests**: Sending, receiving, validating messages
- **Typing Indicators**: Broadcasting typing status
- **Private Messages**: Direct messaging between users
- **Reactions**: Adding reactions to messages
- **Read Receipts**: Marking messages as read
- **Search**: Message search functionality
- **Pagination**: Loading older messages
- **Error Handling**: Graceful error handling
- **Unread Counts**: Tracking unread messages
- **Security**: Input validation and sanitization

### Client Tests

#### App Tests (`client/src/__tests__/App.test.jsx`)
- Component rendering based on login state
- Login/logout functionality
- User authentication flow

#### Login Tests (`client/src/__tests__/Login.test.jsx`)
- Form rendering and validation
- Username input handling
- Avatar generation
- Connection status display
- Error message display

#### Socket Tests (`client/src/__tests__/socket.test.js`)
- Socket configuration
- Connection management
- Event handlers
- Error handling

## Test Coverage Goals

### Minimum Coverage Targets
- **Statements**: 70%
- **Branches**: 60%
- **Functions**: 70%
- **Lines**: 70%

### Current Coverage
Run `npm run test:coverage` to see current coverage reports.

## Writing New Tests

### Server Test Example
```javascript
test('should handle new feature', (done) => {
  const testData = { /* test data */ };
  
  clientSocket.on('feature_response', (response) => {
    expect(response).toBeDefined();
    done();
  });
  
  clientSocket.emit('feature_request', testData);
});
```

### Client Test Example
```javascript
it('should render new component', () => {
  render(<NewComponent prop="value" />);
  expect(screen.getByText(/expected text/i)).toBeInTheDocument();
});
```

## Continuous Integration

Tests are automatically run on:
- Push to main or develop branches
- Pull requests
- Manual workflow dispatch

See `.github/workflows/ci-cd.yml` for CI configuration.

## Debugging Tests

### Server Tests
```bash
# Run specific test file
npm test -- server.test.js

# Run tests matching pattern
npm test -- --testNamePattern="Connection"

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Client Tests
```bash
# Run specific test file
npm test -- App.test.jsx

# Run tests matching pattern
npm test -- -t "should render"

# Open UI for debugging
npm run test:ui
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up after tests
3. **Descriptive Names**: Use clear test descriptions
4. **Mock External Dependencies**: Don't test external services
5. **Test Edge Cases**: Include error scenarios
6. **Keep Tests Fast**: Optimize test execution time
7. **Maintain Tests**: Update tests when code changes

## Common Issues

### "Cannot find module" errors
```bash
npm install
```

### Tests timeout
Increase timeout in test configuration or optimize test code.

### Flaky tests
- Add proper wait conditions
- Clean up state between tests
- Check for race conditions

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Socket.io Testing Guide](https://socket.io/docs/v4/testing/)
