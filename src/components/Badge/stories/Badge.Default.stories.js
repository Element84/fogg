import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Badge from '../';

const STORY_COMPONENT = 'Badge';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <p>
        <Badge label='Default' />
      </p>
      <p>
        <Badge label='Info' type='info' />
      </p>
      <p>
        <Badge label='Danger' type='danger' />
      </p>
      <p>
        <Badge label='Success' type='success' />
      </p>
      <br />
      <p>
        <Badge label='Small' size="small" />
      </p>
      <p>
        <Badge label='Large' size="large" />
      </p>
      <br />
      <p>
        <Badge label='Block (full-width)' block={true} />
      </p>
    </Story>
  );
});
