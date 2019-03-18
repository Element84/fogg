const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const Logger = require('./src/lib/logger');

const THEME_NAME = 'dashboard-components';

exports.onCreateWebpackConfig = ({ loaders, actions }) => {
  const logger = new Logger(`${THEME_NAME}:onCreateWebpackConfig`);

  let theme_location;

  logger.log('Adding theme to Webpack compilation');

  try {
    theme_location = require.resolve(THEME_NAME);
  } catch (e) {
    logger.error(`Failed to load theme module: ${theme_location}; ${e}`);
    return;
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(theme_location),
          use: [
            loaders.js()
          ]
        }
      ]
    }
  });
};

// make sure src/pages exists for the filesystem source or it will error
exports.onPreBootstrap = ({ store }) => {
  const logger = new Logger(`${THEME_NAME}:onPreBoostrap`);
  const { program } = store.getState();
  const dir = `${program.directory}/src/pages`;

  logger.log(`Checking if ${dir} exists`);

  if (!fs.existsSync(dir)) {
    logger.log(`Creating ${dir}`);
    mkdirp.sync(dir);
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  const logger = new Logger(`${THEME_NAME}:onCreateBabelConfig`);

  logger.log('Setting babel preset: @babel/preset-react');

  actions.setBabelPreset({
    name: 'babel-preset-gatsby'
  });
};
