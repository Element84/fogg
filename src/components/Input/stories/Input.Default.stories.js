import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import Input from '../';

const STORY_COMPONENT = 'Input';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  function handleOnChange (event) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onChange`)(event);
  }

  function handleOnInput (event) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onInput`)(event);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Input
        className="input-class-name"
        props={{
          name: 'input',
          autoComplete: 'test'
        }}
        onChange={handleOnChange}
        onInput={handleOnInput}
      />
    </Story>
  );
});
