// Gatsby setup docs: via https://www.gatsbyjs.org/docs/visual-testing-with-storybook/

import {createElement} from 'react';
import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import '../src/assets/stylesheets/storybook.scss';
import '../src/assets/stylesheets/theme.scss';

import Story from '../stories/helpers/Story';

// automatically import all files ending in *.stories.js

const reqDocs = require.context('../docs', true, /.stories.(js|mdx)/);
const reqStories = require.context('../src', true, /.stories.(js|mdx)/);
const reqIntegrations = require.context('../stories', true, /.stories.(js|mdx)/);

function loadStories() {
  reqDocs.keys().forEach(filename => reqDocs(filename));
  reqStories.keys().forEach(filename => reqStories(filename));
  reqIntegrations.keys().forEach(filename => reqIntegrations(filename));
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here

global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment

global.__PATH_PREFIX__ = '';
global.__BASE_PATH__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook

window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
}

configure(loadStories, module);

addDecorator(withInfo({
  source: false,
  propTablesExclude: [ Story ]
}));

addDecorator(createElement);

addParameters({
  info: {}
})