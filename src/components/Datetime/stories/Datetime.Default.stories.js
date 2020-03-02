import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import Datetime from '../';

const STORY_COMPONENT = 'Datetime';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

function handleDateChange (date) {
  action(`${STORY_COMPONENT}::onChange`)(JSON.stringify(date));
}

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Datetime
        input={false}
        onChange={handleDateChange}
        value={1582918169553}
      />
    </Story>
  );
});
