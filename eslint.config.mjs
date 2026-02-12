import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
    parser: tseslintParser,
    parserOptions: {
      project: path.resolve(__dirname, 'tsconfig.json'),
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    unicorn,
    prettier,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...tseslint.configs['recommended-requiring-type-checking'].rules,
    ...unicorn.configs.recommended.rules,
    ...prettierConfig.rules,
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'off' } },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prefer-event-target': 'off',
    'unicorn/no-empty-file': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/number-literal-case': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: { acc: true, env: true, i: true, j: true, props: true, Props: true, arr: true, Arr: true, el: true },
      },
    ],
    'max-lines-per-function': ['error', { max: 80, skipBlankLines: true, skipComments: true }],
    'no-magic-numbers': [
      'error',
      { ignore: [0, 1, -1], ignoreArrayIndexes: true, enforceConst: true, detectObjects: true },
    ],
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/prefer-export-from': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  linterOptions: {
    noInlineConfig: true,
    reportUnusedDisableDirectives: true,
  },
});