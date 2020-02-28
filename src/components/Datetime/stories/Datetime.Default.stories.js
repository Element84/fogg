import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
    <>
      <h1>{STORY_COMPONENT}</h1>
      <h2>{STORY_NAME}</h2>

      <Datetime
        input={false}
        onChange={handleDateChange}
        value={1582918169553}
      />
    </>
  );
});
