import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// import L from 'leaflet';
// import * as E from 'esri-leaflet';
import { geocode } from 'esri-leaflet-geocoder';

import SearchComplete from '../../components/SearchComplete';

const stories = storiesOf('Components|SearchComplete', module);

function handleOnSearch (query) {
  action('SearchComplete::onSearch')(query);
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
            location
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
