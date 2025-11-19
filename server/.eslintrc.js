// .eslintrc.js - ESLint configuration for server

module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'commonjs',
  },
  rules: {
    'no-console': 'off', // Allow console in server
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
