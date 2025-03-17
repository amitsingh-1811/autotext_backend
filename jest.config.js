export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    // For handling path aliases if you use them
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };