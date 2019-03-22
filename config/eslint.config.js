/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },

  parserOptions: {
    ecmaVersion: '2017',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react'],

  extends: ['semistandard', 'plugin:react/recommended'],
};

/* eslint-enable */
