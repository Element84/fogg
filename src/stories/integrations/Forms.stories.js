import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../../components/Button';
import ChildToggle from '../../components/ChildToggle';
import Form from '../../components/Form';
import FormInput from '../../components/FormInput';
import FormRow from '../../components/FormRow';
import InputButton from '../../components/InputButton';
import InputButtonList from '../../components/InputButtonList';

import { regexByFieldName } from '../../lib/input';

const stories = storiesOf('Integrations|Forms', module);

stories.add('Default', () => {
  function handleSubmit (event, fields) {
    action('form-submit')(event, JSON.stringify(fields));
  }

  function handleChange (event) {
    action('form-change')(event);
  }

  // If making changes, please C&P this to the bottom printed output
  // for people to see the rules easily

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
      minLength: 8,
      isValid: value => {
        // Check that the value has "coolbeans" in it
        // for testing purposes
        return value.includes('coolbeans');
      }
    },
    'inputbutton-checkbox': {
      required: true
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onChange={handleChange}
      rules={validationRules}
    >
      <FormRow>
        <p>
          See bottom for active form rules. All fields should be required via
          rules object or via prop for testing purposes. Have fun!
        </p>
      </FormRow>
      <FormRow>
        <FormInput
          id="firstName"
          label="First Name"
          required={true}
          validationMessage="First name is required"
        />

        <FormInput id="lastName" label="Last Name" required={true} />
      </FormRow>

      <FormRow>
        <FormInput id="email" label="Email" type="email" required={true} />

        <FormInput
          id="password"
          label="Password (Must Have 'coolbeans' In It)"
          type="password"
          required={true}
        />
      </FormRow>

      <FormRow>
        <FormInput id="number" label="Number" type="number" required={true} />
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
          required={true}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="shows"
          label="Shows"
          type="select"
          clearable={false}
          searchable={false}
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
          required={true}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="datalist"
          label="Datalist"
          dataList={['Fry', 'Leela', 'Zoidberg', 'Bender']}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="admin-only"
          label="Admin Only"
          defaultValue="oh hai"
          disabled={true}
          reqiured={true}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="comments"
          label="Comments"
          type="textarea"
          required={true}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="datetime"
          label="Datetime"
          type="datetime"
          required={true}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="datetime-2"
          label="Datetime 2"
          type="datetime"
          required={true}
          value="06/07/19 12:00 PM"
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="datetime-3"
          label="Datetime 3"
          type="datetime"
          required={true}
          allowPastDate={false}
        />
      </FormRow>

      <FormRow>
        <InputButtonList
          name="inputbutton-checkbox"
          type="checkbox"
          options={[
            {
              label: 'Input Button Checkbox Default On',
              value: 'inputbutton-checkbox-1',
              isChecked: true
            },
            {
              label: 'Input Button Checkbox 2',
              value: 'inputbutton-checkbox-2'
            }
          ]}
          required={true}
        />
      </FormRow>

      <FormRow>
        <InputButton
          id="inputbutton-radio-a-1"
          name="inputbutton-radio-a"
          label="Input Button Radio A 1"
          type="radio"
          value="inputbutton-radio-a-1"
          required={true}
          isChecked={true}
        />
        <InputButton
          id="inputbutton-radio-a-2"
          name="inputbutton-radio-a"
          label="Input Button Radio A 2"
          type="radio"
          value="inputbutton-radio-a-2"
          required={true}
          isChecked={false}
        />
        <InputButton
          id="inputbutton-radio-a-3"
          name="inputbutton-radio-a"
          label="Input Button Radio A 3"
          type="radio"
          value="inputbutton-radio-a-3"
          required={true}
          isChecked={false}
        />
      </FormRow>

      <FormRow>
        <InputButton
          id="inputbutton-radio-b-1"
          name="inputbutton-radio-b"
          label="Input Button Radio B 1"
          type="radio"
          value="inputbutton-radio-b-1"
          required={true}
        />
        <InputButton
          id="inputbutton-radio-b-2"
          name="inputbutton-radio-b"
          label="Input Button Radio B 2"
          type="radio"
          value="inputbutton-radio-b-2"
          required={true}
        />
        <InputButton
          id="inputbutton-radio-b-3"
          name="inputbutton-radio-b"
          label="Input Button Radio B 3"
          type="radio"
          value="inputbutton-radio-b-3"
          required={true}
        />
      </FormRow>

      <FormRow>
        <ChildToggle
          label="Some Nested Inputs"
          name="nested-inputs"
          id="nested-inputs"
          value="nested-inputs-value"
          isChecked={true}
        >
          <FormRow>
            <FormInput
              id="i-am"
              label="I Am"
              type="number"
              defaultValue={1337}
              required={true}
            />
          </FormRow>
        </ChildToggle>
      </FormRow>

      <FormRow>
        <ChildToggle
          label="Am I checked with more options?"
          name="more-options"
          id="more-options"
          value="more-options-value"
          isChecked={false}
        >
          <FormRow>
            <FormInput
              id="i-am"
              label="I Am"
              type="number"
              defaultValue={1337}
              required={true}
            />
          </FormRow>
        </ChildToggle>
      </FormRow>

      <FormRow>
        <Button>Submit</Button>
      </FormRow>

      <h2>Validation Rules</h2>
      <pre>
        <code>
          {`const validationRules = {
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
    minLength: 8,
    isValid: value => {
      // Check that the value has "coolbeans" in it
      // for testing purposes
      return value.includes('coolbeans');
    }
  },
  'inputbutton-checkbox': {
    required: true
  }
};`}
        </code>
      </pre>
    </Form>
  );
});

stories.add('Compare Fields', () => {
  const FormCompareValues = () => {
    function handleSubmit (event, fields) {
      action('form-submit')(event, JSON.stringify(fields));
    }

    function handleChange (event) {
      action('form-change')(event);
    }

    // If making changes, please C&P this to the bottom printed output
    // for people to see the rules easily

    const validationRules = {
      email: {
        required: true,
        regex: regexByFieldName('email')
      },
      confirmEmail: {
        required: true,
        regex: regexByFieldName('email'),
        dependencies: [
          {
            field: 'email',
            exactMatch: true
          }
        ]
      }
    };
    return (
      <Form
        onSubmit={handleSubmit}
        onChange={handleChange}
        rules={validationRules}
      >
        <FormRow>
          <p>
            See bottom for active form rules. All fields should be required via
            rules object or via prop for testing purposes. Have fun!
          </p>
        </FormRow>

        <FormRow>
          <FormInput id="email" label="Email" type="email" required={true} />
        </FormRow>

        <FormRow>
          <FormInput
            id="confirmEmail"
            label="Confirm Email"
            type="email"
            required={true}
          />
        </FormRow>

        <FormRow>
          <Button>Submit</Button>
        </FormRow>

        <h2>Validation Rules</h2>
        <pre>
          <code>
            {`    const validationRules = {
      email: {
        required: true,
        regex: regexByFieldName('email')
      },
      confirmEmail: {
        required: true,
        regex: regexByFieldName('email'),
        dependencies: [
          {
            field: 'email',
            exactMatch: true
          }
        ]
      }
    };`}
          </code>
        </pre>
      </Form>
    );
  };

  return <FormCompareValues />;
});
