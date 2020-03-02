import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ModInput from './';
import Form from '../Form';
import Button from '../Button';

const stories = storiesOf('Components|ModInput', module);

const defaultValue = 'Chookity';

const user = {
  firstName: 'Test',
  lastName: 'McTest',
  organization: 'Element 84',
  plan: 'Plan - Testing out this feature'
};

const FormWrapper = () => {
  const [saveButtonDisabled, updateSaveButtonDisabled] = useState(true);
  const [modInputDisabled, updateModInputDisabled] = useState(true);

  function handleFormSave (e, fields) {
    e.preventDefault();

    Object.entries(fields).forEach(entry => {
      const name = entry[0];
      const value = entry[1].value;
      handleModInputSave(value, name);
    });

    updateSaveButtonDisabled(true);
    updateModInputDisabled(false);
  }

  function handleFormInputChange (e) {
    updateSaveButtonDisabled(false);
  }

  function handleModInputSave (value, name) {
    const hasChanged = value !== user[name];
    action('ModInput::onSave')(
      name,
      value,
      `Has changed since load: ${hasChanged}`
    );
    if (hasChanged) {
      user[name] = value;
    }
  }

  useEffect(() => {
    if (modInputDisabled === false) {
      updateModInputDisabled(true);
    }
  }, [modInputDisabled]);

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <Form
        className="profile-update-form"
        onSubmit={handleFormSave}
        onChange={handleFormInputChange}
      >
        <div>
          <ModInput
            id="firstName"
            label="First Name"
            defaultValue={user.firstName}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <div>
          <ModInput
            id="lastName"
            label="Last Name"
            defaultValue={user.lastName}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <div>
          <ModInput
            id="organization"
            label="Organization"
            defaultValue={user.organization}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <div>
          <ModInput
            id="plan"
            defaultValue={user.plan}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <Button className="profile-update-button" disabled={saveButtonDisabled}>
          Save
        </Button>
      </Form>
    </div>
  );
};

function handleOnSave (value, name) {
  const hasChanged = value !== defaultValue;
  action('ModInput::onSave')(
    name,
    value,
    `Has changed since load: ${hasChanged}`
  );
}

stories.add('Default', () => (
  <ModInput
    id="test"
    defaultValue={defaultValue}
    onSave={handleOnSave}
    forceDisable={true}
  />
));

stories.add('Form', () => <FormWrapper />);
