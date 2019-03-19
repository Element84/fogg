import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Form from '../../components/Form';
import FormInput from '../../components/FormInput';
import FormRow from '../../components/FormRow';
import Button from '../../components/Button';

const stories = storiesOf('Integrations|Forms', module);

stories.add('Default', () => {
  function handleSubmit (event) {
    event.persist();
    event.preventDefault();
    action('form-submit')(event);
  }

  function handleChange (event) {
    event.persist();
    action('form-change')(event);
  }

  return (
    <Form onSubmit={handleSubmit} onChange={handleChange}>
      <FormRow>
        <FormInput id="name" label="Name" required={true} />

        <FormInput id="email" label="Email" type="email" required={true} />
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
        <Button>Submit</Button>
      </FormRow>
    </Form>
  );
});
