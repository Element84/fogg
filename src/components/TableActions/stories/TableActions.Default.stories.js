import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import TableActions from '../';

const STORY_COMPONENT = 'Table Actions';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const actions = [
  {
    to: '#',
    label: 'Create a New Thingy',
    buttonType: ['text', 'icon-before'],
    icon: 'FaPlusCircle'
  }
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          This component is used to create a row of configurable options. The
          intent is to be used above a Table component.
        </p>
      </StoryNotes>
      <TableActions actions={actions} />
    </Story>
  );
});
