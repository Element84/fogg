import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import InputButtonList from '../';

const STORY_COMPONENT = 'Input Button List';
const STORY_NAME = 'Checkbox';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
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
    </Story>
  );
});

/**
 * handleCheckboxOnChange
 */

function handleCheckboxOnChange (event, selections) {
  action(`${STORY_COMPONENT}::onCheckboxChange`)(
    event,
    JSON.stringify(selections)
  );
}
