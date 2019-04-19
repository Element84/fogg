import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Form from '../../components/Form';
import FormInput from '../../components/FormInput';
import FormRow from '../../components/FormRow';
import Button from '../../components/Button';

import { regexByFieldName } from '../../models/validation';

const stories = storiesOf('Integrations|Forms', module);

stories.add('Default', () => {
  function handleSubmit (event, fields) {
    action('form-submit')(event, JSON.stringify(fields));
  }

  function handleChange (event) {
    action('form-change')(event);
  }

  const validationRules = {
    firstName: {
      required: true
    },
    lastName: {
      minLength: 4,
      maxLength: 8
    },
    email: {
      required: true,
      regex: regexByFieldName('email')
    },
    password: {
      minLength: 8
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onChange={handleChange}
      rules={validationRules}
    >
      <FormRow>
        <FormInput id="firstName" label="First Name" required={true} />

        <FormInput id="lastName" label="Last Name" required={true} />
      </FormRow>

      <FormRow>
        <FormInput id="email" label="Email" type="email" required={true} />

        <FormInput id="password" label="Password" type="password" />
      </FormRow>

      <FormRow>
        <FormInput id="number" label="Number" type="number" />
      </FormRow>

      <FormRow>
        <FormInput
          id="organization"
          label="Organization"
          type="select"
          options={[
            {
              label: 'Futurama',
              value: 'futurama'
            },
            {
              label: 'Rick & Morty',
              value: 'rick-morty'
            },
            {
              label: 'Final Space',
              value: 'final-space'
            }
          ]}
        />
      </FormRow>

      <FormRow>
        <FormInput id="admin-only" label="Admin Only" disabled={true} />
      </FormRow>

      <FormRow>
        <FormInput id="comments" label="Comments" type="textarea" />
      </FormRow>

      <FormRow>
        <FormInput id="datetime" label="Datetime" type="datetime" />
      </FormRow>

      <FormRow>
        <Button>Submit</Button>
      </FormRow>

      <h2>Validation Rules</h2>
      <pre>{JSON.stringify(validationRules, undefined, 2)}</pre>
    </Form>
  );
});
