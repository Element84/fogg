module.exports = {
  collectCoverage: true,

  collectCoverageFrom: ['src/**/*.js'],

  coveragePathIgnorePatterns: ['src/stories'],

  rootDir: '../',

  globals: {
    __PATH_PREFIX__: ''
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

  setupFilesAfterEnv: [
    '<rootDir>/config/jest-setup.config.js',
    '<rootDir>/config/jest-loadershim.config.js'
  ],

  transform: {
    '^.+\\.js$': '<rootDir>/config/jest-preprocess.config.js'
  },

  transformIgnorePatterns: ['node_modules/(?!(gatsby|dashboard-components)/)'],

  // Sets up mocks for images and files that the tests either can't handle
  // or doesn't make sense to include

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy'
  }
};
