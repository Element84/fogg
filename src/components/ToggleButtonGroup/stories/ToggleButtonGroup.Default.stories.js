import React from 'react';
import { storiesOf } from '@storybook/react';
import { FiClock, FiMoon, FiSun } from 'react-icons/fi';

import Story from '../../../../stories/helpers/Story';
import { action } from '@storybook/addon-actions';

import ToggleButtonGroup from '../ToggleButtonGroup';

const STORY_COMPONENT = 'ToggleButtonGroup';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const defaultOptions = [
  {
    label: 'Any',
    value: 'any'
  },
  {
    label: 'Day',
    value: 'day'
  },
  {
    label: 'Night',
    value: 'night'
  }
];

const toggleButtonOptions = [
  {
    label: 'Any',
    value: 'any',
    subLabel: 'No Preference',
    icon: <FiClock />
  },
  {
    label: 'Day',
    value: 'day',
    subLabel: '6AM - 6PM Local',
    icon: <FiSun />
  },
  {
    label: 'Night',
    value: 'night',
    subLabel: '6PM - 6AM Local',
    icon: <FiMoon />
  }
];

function handleOnChange (value) {
  action(`${STORY_COMPONENT}::${STORY_NAME}::onChange`)(value);
}

const activeValue = defaultOptions[0].value;

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <h5>Button Group Default</h5>
      <p>
        <ToggleButtonGroup
          id="defaultToggleGroup"
          activeValue={activeValue}
          options={defaultOptions}
          onChange={handleOnChange}
        />
      </p>
      <hr />
      <h5>Button Group with Icons & SubLabels</h5>
      <p>
        <ToggleButtonGroup
          id="iconToggleGroup"
          activeValue={activeValue}
          options={toggleButtonOptions}
          onChange={handleOnChange}
        />
      </p>
    </Story>
  );
});
