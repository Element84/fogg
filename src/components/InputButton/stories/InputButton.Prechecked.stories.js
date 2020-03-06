import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import InputButton from '../';

const STORY_COMPONENT = 'Input Button';
const STORY_NAME = 'Prechecked';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <p>
        Why can&apos;t I uncheck you? 🤔
        <InputButton
          name="inputbutton-checkbox"
          label="InputButton Checkbox"
          type="checkbox"
          isChecked={true}
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
            isChecked={true}
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
      </ul>
    </Story>
  );
});
