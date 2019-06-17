import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ModInput from '../../components/ModInput';
import Form from '../../components/Form';
import Button from '../../components/Button';

const stories = storiesOf('Components|ModInput', module);

const defaultValue = 'Chookity';

const FormWrapper = () => {
  const [saveButtonDisabled, updateSaveButtonDisabled] = useState(true);

  const [modInputDisabled, updateModInputDisabled] = useState(true);

  const user = {
    firstName: 'Test',
    lastName: 'McTest',
    organization: 'Element 84',
    plan: 'Testing out this feature'
  };

  function handleFormSave (e, fields) {
    e.preventDefault();

    Object.entries(fields).forEach(entry => {
      console.log(entry);
      let name = entry[0];
      let value = entry[1].value;
      handleModInputSave(value, name);
    });
    updateSaveButtonDisabled(true);
    updateModInputDisabled(true);
    console.log(modInputDisabled);
  }

  function handleFormInputChange (e) {
    updateModInputDisabled(false);
    updateSaveButtonDisabled(false);
  }

  function handleModInputSave (value, name) {
    const hasChanged = value !== user[name];
    action('ModInput::onSave')(
      name,
      value,
      `Has changed since load: ${hasChanged}`
    );
  }

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <Form
        className="profile-update-form"
        onSubmit={handleFormSave}
        onChange={handleFormInputChange}
      >
        <div>
          <p>First Name:</p>
          <ModInput
            id="firstName"
            defaultValue={user.firstName}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <div>
          <p>Last Name:</p>
          <ModInput
            id="lastName"
            defaultValue={user.lastName}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <div>
          <p>Organization:</p>
          <ModInput
            id="organization"
            defaultValue={user.organization}
            onSave={handleModInputSave}
            forceDisable={modInputDisabled}
          />
        </div>
        <div>
          <p>Plan:</p>
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
