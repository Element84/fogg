import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { geocode } from 'esri-leaflet-geocoder';

import Story from '../../../../stories/helpers/Story';

import SearchComplete from '../';

const STORY_COMPONENT = 'Search Complete';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchComplete
        onSearch={handleOnSearch}
        resolveQueryComplete={handleFetchQueryComplete}
      />
    </Story>
  );
});

/**
 * handleOnSearch
 */

function handleOnSearch (query, date) {
  action(`${STORY_COMPONENT}::onSearch`)(query, date);
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
