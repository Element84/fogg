import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { geocode } from 'esri-leaflet-geocoder';

import SearchComplete from '../../components/SearchComplete';

const stories = storiesOf('Components|SearchComplete', module);

function handleOnSearch (query, date) {
  action('SearchComplete::onSearch')(query, date);
}

async function handleFetchQueryComplete (query) {
  action('SearchComplete::resolveQueryComplete::Start')(query);

  return new Promise((resolve, reject) => {
    geocode()
      .text(query)
      .run((error, body, response) => {
        if (error) {
          action('SearchComplete::resolveQueryComplete::Reject')(error);
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

        action('SearchComplete::resolveQueryComplete::Resolve')(results);
        resolve(results);
      }, this);
  });
}

stories.add('Default', () => (
  <SearchComplete
    onSearch={handleOnSearch}
    resolveQueryComplete={handleFetchQueryComplete}
  />
));
