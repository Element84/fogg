import React from 'react';
import { storiesOf } from '@storybook/react';

import BaseForm from '../helpers/BaseForm';
import FormInput from '../../components/FormInput';
import FormRow from '../../components/FormRow';

const stories = storiesOf('Components|FormRow', module);

stories.add('Default', () => {
  return (
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
  );
});
