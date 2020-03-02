import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaTimes } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';

import InputButton from '../';

const STORY_COMPONENT = 'Input Button';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <p>
        <InputButton
          id="inputbutton-checkbox"
          name="inputbutton-checkbox"
          label="InputButton Checkbox"
          type="checkbox"
          value="inputbutton-checkbox"
        />
      </p>
      <ul>
        <li>
          <InputButton
            id="inputbutton-radio-1"
            name="inputbutton-radio"
            label="InputButton Radio 1"
            type="radio"
            value="inputbutton-radio-1"
          />
        </li>
        <li>
          <InputButton
            id="inputbutton-radio-2"
            name="inputbutton-radio"
            label="InputButton Radio 2"
            type="radio"
            value="inputbutton-radio-2"
          />
        </li>
        <li>
          <InputButton
            id="inputbutton-radio-3"
            name="inputbutton-radio"
            label="InputButton Radio 3"
            type="radio"
            value="inputbutton-radio-3"
            icon={<FaTimes />}
          />
        </li>
      </ul>
    </Story>
  );
});
