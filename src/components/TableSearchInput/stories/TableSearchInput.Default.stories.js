import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import TableSearchInput from '../';

const STORY_COMPONENT = 'Table Search Input';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const defaultValue = '';
  const [value, setValue] = useState(defaultValue);

  function handleOnChange ({currentTarget = {}} = {}) {
    const { value } = currentTarget;
    setValue(value)
    action(`${STORY_COMPONENT}::onChange`)(value);
  }

  function handleOnClear() {
    setValue(defaultValue)
    action(`${STORY_COMPONENT}::onClear`)();
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          This component is coupled to the expected props when used with the
          Table component.
        </p>
      </StoryNotes>
      <TableSearchInput
        value={value}
        onChange={handleOnChange}
        onClear={handleOnClear}
      />
    </Story>
  );
});
