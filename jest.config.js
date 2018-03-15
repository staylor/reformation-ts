module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  moduleNameMapper: {
    '^(utils|components)/(.+)': '<rootDir>/src/$1/$2.ts',
  },
  setupFiles: [
    '<rootDir>/jest/shim.js',
    '<rootDir>/jest/setup.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
};
