module.exports = {
  parser: '@typescript-eslint/parser', // używamy parsera do TypeScript
  extends: [
    'eslint:recommended', // standardowe zasady ESLint
    'plugin:react/recommended', // zasady React
    'plugin:@typescript-eslint/recommended', // zasady dla TypeScript
  ],
  parserOptions: {
    ecmaVersion: 2020, // ustawienie wersji ECMAScript
    sourceType: 'module', // umożliwia użycie importów
  },
  rules: {
    // Dostosuj reguły do swoich potrzeb
    'react/prop-types': 'off', // wyłączamy sprawdzanie prop-types w React
  },
  settings: {
    react: {
      version: 'detect', // automatyczne wykrywanie wersji React
    },
  },
};
