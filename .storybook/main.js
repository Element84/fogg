const path = require('path');

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    "@storybook/addon-essentials"
  ],
  webpackFinal: async config => {

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.

    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)

    config.module.rules[0].use[0].loader = require.resolve('babel-loader')

    // use @babel/preset-react for JSX and env (instead of staged presets)

    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ];

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions

      require.resolve('@babel/plugin-proposal-class-properties'),

      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook

      require.resolve('babel-plugin-remove-graphql-queries'),
    ]

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint

    config.resolve.mainFields = ['browser', 'module', 'main'];

    // Add specific loader rule for CSS (SASS)

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
      exclude: /\.module\.scss$/,
      include: path.resolve(__dirname, '../src')
    })

    return config;
  },
};