import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import SearchFiltersList from '../';

const STORY_COMPONENT = 'Search Filters List';
const STORY_NAME = 'Checklist Showcase';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const searchFilters = [
  {
    label: 'Colors',
    subLabel: 'Default checklist showcase.',
    id: 'colors',
    name: 'properties/fogg:colors',
    type: 'checklist',
    list: ['pink', 'blue', 'green', 'red', 'purple', 'yellow']
  },
  {
    label: 'Emojis',
    subLabel: 'Checklist with friendly display names per item.',
    id: 'fogg-emojis',
    name: 'properties/fogg:emojis',
    type: 'checklist',
    list: ['piggy', 'tiger', 'snake', 'eagle'],
    displayList: {
      piggy: '🐷',
      tiger: '🐯',
      snake: '🐍',
      eagle: '🦅'
    }
  },
  {
    label: 'Trilogies',
    subLabel: 'Checklist with custom default values checked.',
    id: 'trilogies',
    name: 'properties/fogg:movies',
    type: 'checklist',
    list: ['star-wars', 'dark-knight', 'lotr', 'godfather', 'matrix', 'back-to-the-future'],
    displayList: {
      'star-wars': 'Star Wars ',
      'dark-knight': 'Dark Knight',
      lotr: 'The Lord of the Rings',
      godfather: 'Godfather',
      matrix: 'The Matrix',
      'back-to-the-future': 'Back to the Future'
    },
    defaultValue: ['star-wars', 'godfather', 'back-to-the-future']
  },
  {
    label: 'Genres',
    subLabel: 'Checklist with toggle all button instead of all values item.',
    id: 'genres',
    name: 'properties/fogg:genres',
    type: 'checklist',
    list: ['rock', 'metal', 'electronic', 'jazz', 'hip-hop', 'blues'],
    defaultValue: ['rock', 'metal', 'electronic', 'jazz', 'hip-hop', 'blues'],
    shouldToggleItems: true,
    showAllValuesListItem: false
  }
];

stories.add(STORY_NAME, () => {
  function handleFilterChange (e) {
    action(`${STORY_COMPONENT}::onFilterChange`)(e);
  }

  function handleChecklistClear (e) {
    action(`${STORY_COMPONENT}::onChecklistClear`)(e);
  }

  function handleToggleState (e) {
    action(`${STORY_COMPONENT}::onToggleChecklist`)(e);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      {searchFilters.map((filter = {}, index) => {
        const {
          label,
          subLabel,
          id,
          type = 'default',
          value,
          defaultValue = [],
          shouldToggleItems = false,
          showAllValuesListItem = true
        } = filter;
        return (
          <div key={`SearchFilters-Available-${index}`}>
            {(type === 'checklist' || type === 'radiolist') &&
              (() => {
                const { list, displayList } = filter;
                return (
                  <SearchFiltersList
                    id={id}
                    label={label}
                    subLabel={subLabel}
                    list={list}
                    displayList={displayList}
                    activeValues={value || defaultValue}
                    type={type}
                    onChange={handleFilterChange}
                    onClearChecklist={handleChecklistClear}
                    onToggleChecklist={shouldToggleItems ? handleToggleState : undefined}
                    toggleChecklistValue={false}
                    showAllValuesListItem={showAllValuesListItem}
                  />
                );
              })()}
          </div>
        );
      })}
    </Story>
  );
});
