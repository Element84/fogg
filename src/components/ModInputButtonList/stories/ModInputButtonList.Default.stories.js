import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import ModInputButtonList from '../';

const STORY_COMPONENT = 'Mod Input Button List';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ModInputButtonList
        label="Optional Custom Label"
        name="modinputbuttonlist-checkbox"
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
      />
    </Story>
  );
});
