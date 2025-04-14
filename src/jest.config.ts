import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/src/user/__tests__'], // Adiciona a pasta de testes
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Se você usa aliases de importação
  },
  transform: {
      "^.+.tsx?$": "ts-jest"
  },
};

export default config;
