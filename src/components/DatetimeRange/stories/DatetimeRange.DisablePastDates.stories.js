import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatetimeRange from '../';

const STORY_COMPONENT = 'Datetime Range';
const STORY_NAME = 'Disable Past Dates';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

function handleDateChange (date) {
  action('DatetimeRange::onChange')(JSON.stringify(date));
}

stories.add(STORY_NAME, () => {
  return (
    <>
      <h1>{STORY_COMPONENT}</h1>
      <h2>{STORY_NAME}</h2>

      <DatetimeRange onChange={handleDateChange} allowPastDate={false} />
    </>
  );
});
