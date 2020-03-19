import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import SearchPanelFilters from '../';

const STORY_COMPONENT = 'Search Panel Filters';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const filters = {
  isOpen: true,
  unsaved: [],
  active: [],
  available: [
    {
      label: 'Collection',
      id: 'properties/collection',
      type: 'radiolist',
      list: ['sentinel-2-l1c']
    },
    {
      label: 'Sentinel Grid Square',
      id: 'properties/sentinel:grid_square',
      type: 'radiolist',
      list: ['EG', 'FV', 'GL']
    },
    {
      label: 'Cloud Cover',
      id: 'properties/eo:cloud_cover',
      type: 'range',
      range: {
        min: 0.1,
        max: 0.9
      },
      defaultValue: {
        min: 0.2,
        max: 0.8
      },
      value: {
        min: 0.2,
        max: 0.8
      }
    }
  ]
};
stories.add(STORY_NAME, () => {
  function handleOnOpenFilters (e) {
    action(`${STORY_COMPONENT}::onOpenFilters`)(e);
  }

  function handleOnSaveFiltersChanges (e) {
    action(`${STORY_COMPONENT}::onSaveFiltersChanges`)(e);
  }

  function handleOnCancelFilterChanges (e) {
    action(`${STORY_COMPONENT}::onCancelFilterChanges`)(e);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchPanelFilters
        filters={filters}
        onOpenFilters={handleOnOpenFilters}
        onSaveFiltersChanges={handleOnSaveFiltersChanges}
        onCancelFilterChanges={handleOnCancelFilterChanges}
      />
    </Story>
  );
});
