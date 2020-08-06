import React from 'react';
import { storiesOf } from '@storybook/react';

const STORY_COMPONENT = 'Getting Started';
const STORY_NAME = 'Examples';

const stories = storiesOf(`${STORY_COMPONENT}`, module).addParameters({
  options: {
    showAddonPanel: false,
  },
  info: {
    disable: true,
  }
});

stories.add(STORY_NAME, () => {
  return (
    <>
      <h1>Examples</h1>
      <h2>Earth Search</h2>
      <p>
        Earth Search is a basic implementation of Fogg that uses the Element 84
        supported <a href="https://www.element84.com/earth-search/">Earth Sarch</a> API
        powered by <a href="https://github.com/sat-utils/sat-api">SAT-API</a>.
      </p>
      <ul>
        <li>
          <a href="https://fogg.element84.com/earth-search">Visit Demo</a>
        </li>
        <li>
          <a href="https://github.com/Element84/fogg/tree/master/packages/earth-search">View Source on Github</a>
        </li>
      </ul>
    </>
  );
});
