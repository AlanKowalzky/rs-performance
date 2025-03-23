module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off', // wyłączamy sprawdzanie prop-types w React
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
