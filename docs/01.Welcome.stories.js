import React from 'react';
import { storiesOf } from '@storybook/react';

const STORY_COMPONENT = 'Getting Started';
const STORY_NAME = 'Welcome';

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
      <h1>Welcome!</h1>
    </>
  );
});
