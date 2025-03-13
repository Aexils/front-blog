module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/__tests__/**/*.spec.ts', '**/*.spec.ts'],
  testEnvironment: 'jsdom',
};
