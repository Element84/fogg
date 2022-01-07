import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import SearchDropOptions from '../';

const STORY_COMPONENT = 'Search Drop Options';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

function handleOptionClick (e) {
  action(`${STORY_COMPONENT}::onActionClick`)(e);
}

let searchDropOptions = [
    {
        label: 'Map Location',
        id: 'search-radio-1',
        onClick: handleOptionClick,
        value: 'default',
        isChecked: true
    },
    {
        label: 'Collect ID',
        id: 'search-radio-2',
        onClick: handleOptionClick,
        value: 'collect-id-007',
        isChecked: false
    },
    {
        label: 'Granule ID',
        id: 'search-radio-3',
        onClick: handleOptionClick,
        value: 'granule-id-007',
        isChecked: false
    }
  ];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          The Search Option Drop Box is used in combination with the Search Box Drop Open Component.
        </p>
      </StoryNotes>

      <SearchDropOptions options={searchDropOptions} onOptionClick={handleOptionClick} />

    </Story>
  );
});
