module.exports = {
  collectCoverage: true,

  collectCoverageFrom: ['src/**/*.js', '!src/**/*.stories.js'],

  coverageThreshold: {
    global: {
      branches: 41.5,
      functions: 38.5,
      lines: 48.5,
      statements: 47.5
    }
  },

  rootDir: '../',

  globals: {
    __PATH_PREFIX__: '',
    __BASE_PATH__: ''
  },

  // Ideally this will be kept in sync with the webpack config
  // resolve configuration in config/webpack.common.js

  modulePaths: [
    '<rootDir>/src',
    '<rootDir>/src/components/',
    '<rootDir>/config',
    '<rootDir>/node_modules'
  ],

  testPathIgnorePatterns: ['node_modules', '.cache', '.storybook'],

  testResultsProcessor: 'jest-sonar-reporter',

  setupFilesAfterEnv: [
    '<rootDir>/config/jest-setup.config.js',
    '<rootDir>/config/jest-loadershim.config.js'
  ],

  transform: {
    '^.+\\.jsx?$': '<rootDir>/config/jest-preprocess.config.js'
  },

  transformIgnorePatterns: ['node_modules/(?!(gatsby|fogg)/)'],

  // Sets up mocks for images and files that the tests either can't handle
  // or doesn't make sense to include

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/dist/$1', // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-core-utils/(.*)$': 'gatsby-core-utils/dist/$1', // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-plugin-utils/(.*)$': [
      'gatsby-plugin-utils/dist/$1',
      'gatsby-plugin-utils/$1'
    ] // Workaround for https://github.com/facebook/jest/issues/9771
  }
};
