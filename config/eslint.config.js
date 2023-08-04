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

  settings: {
    react: {
      version: 'detect',
    },
    polyfills: ["Promise"]
  },

  rules: {
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme'],
        location: 'start',
      },
    ],
    'no-console': 'warn',
    // TODO: Remove when is https://github.com/babel/babel-eslint/issues/530 fixed
    // via: https://github.com/babel/babel-eslint/issues/681
    'template-curly-spacing': 'off'
  },

  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react', 'react-hooks'],

  extends: ['semistandard', 'plugin:react/recommended'],
};

/* eslint-enable */
