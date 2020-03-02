import React from 'react';
import { storiesOf } from '@storybook/react';

import ModInputButtonList from './';

const stories = storiesOf('Components|ModInputButtonList', module);

stories.add('Default', () => {
  return (
    <>
      <ModInputButtonList
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
      <ModInputButtonList
        label="Test Label"
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
    </>
  );
});
