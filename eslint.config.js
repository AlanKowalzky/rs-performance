const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const react = require('eslint-plugin-react');
const tseslint = require('typescript-eslint');
const eslintPluginPrettier = require('eslint-plugin-prettier/recommended');
const reactCompiler = require('eslint-plugin-react-compiler');

// Oczyszczenie globalnych zmiennych z białych znaków
const cleanGlobals = {};
Object.entries(globals.browser).forEach(([key, value]) => {
  cleanGlobals[key.trim()] = value;
});

module.exports = tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2020, globals: cleanGlobals },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
    settings: { react: { version: 'detect' } },
  }
);
