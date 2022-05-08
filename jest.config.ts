import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  roots: ['<rootDir>/server/src/tests', '<rootDir>/client/src/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/src/**/*.test.ts', '**/src/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(test/.*.mock).(jsx?|tsx?)$'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  verbose: true,
  projects: ['<rootDir>'],
  coverageDirectory: '<rootDir>/coverage/',
};

export default config;
