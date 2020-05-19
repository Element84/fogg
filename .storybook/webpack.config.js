const path = require('path');

// Setup via https://www.gatsbyjs.org/docs/visual-testing-with-storybook/

module.exports = async ({ config, mode }) => {

  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader");

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ];

  // use @babel/plugin-proposal-class-properties for class arrow functions
  config.module.rules[0].use[0].options.plugins = [
    require.resolve("@babel/plugin-proposal-class-properties"),
  ];

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ["browser", "module", "main"];

  // Add specific loader rule for CSS (SASS)

  config.module.rules.push({
    test: /\.scss$/,
    loaders: [
      "style-loader",
      "css-loader",
      "sass-loader",
    ],
    exclude: /\.module\.scss$/,
    include: path.resolve(__dirname, '../src')
  })

  // Return the altered config

  return config;

};