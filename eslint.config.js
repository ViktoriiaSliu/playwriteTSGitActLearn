// eslint.config.js

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {

    ignores: [
      'build/',
      'coverage/',
      '.github/',
      'node_modules/',
      'test-results/',
      '.gitignore',
      '.prettierignore',
      '.prettierrc.json',
      'package-lock.json',
      'package.json',
      'playwright.config.ts',
      '.eslintrc.json',
      'eslint.config.js',
      'playwright-report/',
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        expect: true,
        driver: true,
      },
    },

    rules: {
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off', 
    },
  }
);