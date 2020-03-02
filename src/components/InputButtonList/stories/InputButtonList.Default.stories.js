import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import InputButtonList from '../';

const STORY_COMPONENT = 'Input Button List';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

stories.add(STORY_NAME, () => {
  function handleCheckboxOnChange (event, selections) {
    action('inputbuttonlist--checkbox-change')(
      event,
      JSON.stringify(selections)
    );
  }

  function handleRadioOnChange (event, selections) {
    action('inputbuttonlist-radio-change')(event, JSON.stringify(selections));
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <InputButtonList
        name="inputbutton-checkbox"
        type="checkbox"
        options={[
          {
            label: 'Input Button Checkbox Default On',
            value: 'inputbutton-checkbox-1',
            isChecked: true
          },
          {
            label: 'Input Button Checkbox 2',
            value: 'inputbutton-checkbox-2'
          }
        ]}
        required={true}
        onChange={handleCheckboxOnChange}
      />
      <InputButtonList
        name="inputbutton-radio"
        type="radio"
        options={[
          {
            label: 'Input Button Radio Default On',
            value: 'inputbutton-radio-1',
            isChecked: true
          },
          {
            label: 'Input Button radio 2',
            value: 'inputbutton-radio-2'
          }
        ]}
        required={true}
        onChange={handleRadioOnChange}
      />
    </Story>
  );
});
