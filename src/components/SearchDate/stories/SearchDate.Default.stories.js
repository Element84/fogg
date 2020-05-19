import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import SearchDate from '../';

const STORY_COMPONENT = 'Search Date';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

// TODO: the state and change of state isn't consistent here. Inspect the on date change event

stories.add('Default', () => {
  const [date, setDate] = useState({
    dateIsOpen: false,
    date: {}
  });

  function handleDateChange (newDate) {
    action(`${STORY_COMPONENT}::onChange`)(JSON.stringify(newDate));
    setDate(newDate);
  }

  useEffect(() => {
    action(`${STORY_COMPONENT}::useEffect`)(JSON.stringify(date.date));
  }, [date.date]);

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchDate defaultDate={date} onChange={handleDateChange} />
    </Story>
  );
});
