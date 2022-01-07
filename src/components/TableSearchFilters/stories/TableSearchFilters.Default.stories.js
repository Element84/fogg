import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import TableSearchFilters from '../';

const STORY_COMPONENT = 'Table Search Filters';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const FILTER_MENU_OPTIONS = [
  {
    columnId: 'role',
    type: 'checkbox',
    Header: 'Role'
  }
];

const tableData = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed',
    role: ['user', 'cool-guy']
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    role: ['user', 'hero'],
    actions: [
      {
        to: '#',
        label: 'View'
      },
      {
        to: '#',
        label: 'Edit'
      }
    ]
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln',
    role: ['user', 'emancipator']
  }
];

stories.add(STORY_NAME, () => {
  function handleOnChange ({ columnId, selectedOptions } = {}) {
    action(`${STORY_COMPONENT}::onChange`)(columnId, selectedOptions);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          This component is coupled to the expected props when used with the
          Table component.
        </p>
      </StoryNotes>
      <TableSearchFilters
        options={FILTER_MENU_OPTIONS}
        defaultTableData={tableData}
        onChange={handleOnChange}
      />
    </Story>
  );
});
