module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  // setupFilesAfterEnv: ['./src/tests/test-setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
