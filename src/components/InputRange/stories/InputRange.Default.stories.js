import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import InputRange from '../';

const STORY_COMPONENT = 'Input Range';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  function handleOnChange (value) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onChange`)(value);
  }
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <InputRange
        minValue={0}
        maxValue={10}
        step={0.1}
        value={{
          min: 4,
          max: 7
        }}
        onChangeComplete={handleOnChange}
      />
    </Story>
  );
});
