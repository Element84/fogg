import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInput from '../';

const STORY_COMPONENT = 'Form Input';
const STORY_NAME = 'Disable Date Input Until Future';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const SELECT_OPTIONS = [
  {
    label: 'Bender',
    value: 'rodriguez'
  },
  {
    label: 'John',
    value: 'zoidberg'
  },
  {
    label: 'Slurms',
    value: 'mckenzie'
  }
];

stories.add(STORY_NAME, () => {
  function handleSelectOnChange (field, selectEvent) {
    action('select :: onchange')(field, selectEvent);
  }

  function handleOnKeyDown (event) {
    action('select :: onchange')(event);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormInput
          id="default-text"
          label="Default Text"
          onKeyDown={handleOnKeyDown}
        />
        <FormInput id="default-email" label="Default Email" type="email" />
        <FormInput
          id="default-password"
          label="Default Password"
          type="password"
        />
        <FormInput id="default-number" label="Default Number" type="number" />
        <FormInput
          id="default-select"
          label="Default Select"
          type="select"
          options={SELECT_OPTIONS}
          onChange={handleSelectOnChange}
        />
        <FormInput
          id="default-textarea"
          label="Default Textarea"
          type="textarea"
        />
        <FormInput
          id="default-datetime-utc"
          label="Datetime UTC (Only allow 7 days in the future)"
          type="datetime"
          utc={true}
          disableUntilFuture={7}
        />
        <FormInput
          id="default-datalist"
          label="Default Datalist"
          dataList={['Fry', 'Leela', 'Zoidberg', 'Bender']}
        />
      </BaseForm>
    </Story>
  );
});
