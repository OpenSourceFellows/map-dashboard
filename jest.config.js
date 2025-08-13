export default {
  testEnvironment: 'node',
  transform: {},
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/test/**/*.test.js',
    '**/test/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};