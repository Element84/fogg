import React from 'react';
import ReactDatetime from 'react-datetime';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import Datetime from '../';

const STORY_COMPONENT = 'Datetime';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const optionalSelectDay = ReactDatetime.moment().add(4, 'day');

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

stories.add('Disabled Until Future Default (uses current date)', () => {
  return (
    <Story component={STORY_COMPONENT} name="Disabled Until Future">
      <Datetime
        input={false}
        onChange={handleDateChange}
        disableFrom={{ days: 7 }}
      />
    </Story>
  );
});

stories.add(
  'Disabled Until Future Default (uses optionally provided day)',
  () => {
    return (
      <Story component={STORY_COMPONENT} name="Disabled Until Future">
        <Datetime
          input={false}
          onChange={handleDateChange}
          disableFrom={{ days: 7, from: optionalSelectDay }}
        />
      </Story>
    );
  }
);
