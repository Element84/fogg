import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import InputButtonList from '../';

const STORY_COMPONENT = 'Input Button List';
const STORY_NAME = 'Radio';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
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

/**
 * handleRadioOnChange
 */

function handleRadioOnChange (event, selections) {
  action(`${STORY_COMPONENT}::onRadioChange`)(
    event,
    JSON.stringify(selections)
  );
}
