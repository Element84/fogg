const babelOptions = {
  presets: ['babel-preset-gatsby'],
  plugins: ['require-context-hook']
};

module.exports = require('babel-jest').createTransformer(babelOptions);
