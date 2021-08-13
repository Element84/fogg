import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import InputRangeExtended from '../';

const STORY_COMPONENT = 'Input Range Extended';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);
const rangeValue = 25;

stories.add(STORY_NAME, () => {
  function handleOnChange (value) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onChange`)(value);
  }
  function handleOnChangeComplete (value) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onChangeComplete`)(value);
  }
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <InputRangeExtended
        minValue={-100}
        maxValue={150}
        value={rangeValue}
        onChange={handleOnChange}
        onChangeComplete={handleOnChangeComplete}
        step={1}
        metric={'m'}
        onChangeDelay={2}
      />
    </Story>
  );
});
