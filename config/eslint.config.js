/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'import/no-named-default': 0,
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme'],
        location: 'start',
      },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react', 'react-hooks'],

  extends: ['semistandard', 'plugin:react/recommended'],
};

/* eslint-enable */
