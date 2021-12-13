import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { geocode } from 'esri-leaflet-geocoder';

import Story from '../../../../stories/helpers/Story';

import SearchComplete from '../';

const STORY_COMPONENT = 'Search Complete';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

let activeSearchOption;
let searchDropOption = true;
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

function handleOptionClick (e) {
  action(`${STORY_COMPONENT}::onActionClick`)(e.target.value);
  activeSearchOption = e.target.value; 
}

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchComplete
        onSearch={handleOnSearch}
        resolveQueryComplete={handleFetchQueryComplete}
        searchDropOption={searchDropOption}
        searchDropOptions={searchDropOptions}
      />
    </Story>
  );
});

/**
 * handleOnSearch
 */

function handleOnSearch (query, date, activeSearchOption) {
  action(`${STORY_COMPONENT}::onSearch`)(query, date, activeSearchOption);
}

/**
 * handleFetchQueryComplete
 */

async function handleFetchQueryComplete (query) {
  action(`${STORY_COMPONENT}::resolveQueryComplete::Start`)(query);

  return new Promise((resolve, reject) => {
    geocode()
      .text(query)
      .run((error, body, response) => {
        if (error) {
          action(`${STORY_COMPONENT}::resolveQueryComplete::Reject`)(error);
          reject(error);
        }

        const { candidates = [] } = response;
        const results = candidates.map(({ address, location } = {}) => {
          return {
            label: address,
            sublabel: `Location: ${location.x}, ${location.y}`,
            value: location
          };
        });

        action(`${STORY_COMPONENT}::resolveQueryComplete::Resolve`)(results);
        resolve(results);
      }, this);
  });
}
