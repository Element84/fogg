import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInputDebounced from '../';

const STORY_COMPONENT = 'Form Input Debounced';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  function handleOnChange (event) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onChange`)(event);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormInputDebounced
          id="default-text"
          label="Default Text"
          value=""
          onChange={handleOnChange}
        />
      </BaseForm>
    </Story>
  );
});
