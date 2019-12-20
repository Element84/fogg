const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const Logger = require('./src/lib/logger');

const THEME_NAME = 'fogg';

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  const logger = new Logger(`${THEME_NAME}:onCreateWebpackConfig`);

  let themeLocation;

  logger.log('Adding theme to Webpack compilation');

  try {
    themeLocation = require.resolve(THEME_NAME);
  } catch (e) {
    logger.error(`Failed to load theme module: ${themeLocation}; ${e}`);
    return;
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(themeLocation),
          use: [loaders.js()]
        }
      ]
    }
  });

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /leaflet/,
            use: loaders.null()
          }
        ]
      }
    });
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /proj4/,
            use: loaders.null()
          }
        ]
      }
    });
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /esri-leaflet/,
            use: loaders.null()
          }
        ]
      }
    });
  }
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
