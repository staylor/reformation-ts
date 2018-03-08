module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  setupFiles: [
    '<rootDir>/jest/shim.js',
    '<rootDir>/jest/setup.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/*.(ts|tsx|js)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/jest/preprocessor.js'
  },
};
