import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: 'api',
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
};

export default config;
