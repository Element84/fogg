import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

const STORY_COMPONENT = 'Mod Form';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

// TODO: Requires story. Should include 1 of each type of Mod input-like component

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <p>Mod Form component</p>
    </Story>
  );
});
