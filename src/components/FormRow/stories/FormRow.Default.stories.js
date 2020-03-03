import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import FormRow from '../';
import FormInput from '../../FormInput';
import BaseForm from '../../../../stories/helpers/BaseForm';

const STORY_COMPONENT = 'Form Row';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormRow>
          <FormInput id="default-text" label="Default Text" />
          <FormInput id="default-text" label="Default Text" />
        </FormRow>
        <FormRow>
          <FormInput id="default-text" label="Default Text" />
          <FormInput id="default-text" label="Default Text" />
        </FormRow>
        <FormRow>
          <FormInput id="default-text" label="Default Text" />
          <FormInput id="default-text" label="Default Text" />
        </FormRow>
      </BaseForm>
    </Story>
  );
});
