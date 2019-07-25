import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../../components/Button';
import FormRow from '../../components/FormRow';
import ModInput from '../../components/ModInput';

import ModForm from '../../components/ModForm';

const stories = storiesOf('Integrations|FormModSave', module);

stories.add('Default', () => {
  function handleSubmit (event, fields) {
    action('form-submit')(event, JSON.stringify(fields));
  }

  function handleChange (event) {
    action('form-change')(event);
  }

  return (
    <ModForm onChange={handleChange} onSubmit={handleSubmit}>
      <FormRow>
        <ModInput
          id="firstName"
          label="First Name"
          defaultValue="Homer"
          //   forceDisable={forceDisable}
          //   forceEnable={forceEnable}
        />

        <ModInput
          id="lastName"
          label="Last Name"
          defaultValue="Simpson"
          //   forceDisable={forceDisable}
          //   forceEnable={forceEnable}
        />
      </FormRow>
      <FormRow>
        <Button>Submit</Button>
      </FormRow>
    </ModForm>
  );
});
