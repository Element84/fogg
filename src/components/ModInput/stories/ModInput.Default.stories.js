import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import ModInput from '../';

const STORY_COMPONENT = 'Mod Input';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const defaultValue = 'Chookity';

function handleOnSave (value, name) {
  const hasChanged = value !== defaultValue;
  action(`${STORY_COMPONENT}::onSave`)(
    name,
    value,
    `Has changed since load: ${hasChanged}`
  );
}

function handleOnKeyDown (event) {
  action(`${STORY_COMPONENT}::onKeyDown`)(event);
}

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ModInput
        id="test"
        defaultValue={defaultValue}
        onSave={handleOnSave}
        forceDisable={true}
        onKeyDown={handleOnKeyDown}
      />
    </Story>
  );
});
