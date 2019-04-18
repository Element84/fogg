import React from 'react';
import { storiesOf } from '@storybook/react';

import L from 'leaflet'
import * as E from 'esri-leaflet';
import { geocode } from 'esri-leaflet-geocoder'

import SearchComplete from '../../components/SearchComplete';

const stories = storiesOf('Components|SearchComplete', module);

function handleSearch(query) {

  console.log('search!!', query);

}

async function handleFetchQueryComplete(query) {
  return new Promise((resolve, reject) => {

    geocode()
      .text(query)
      .run((error, body, response) => {

        if ( error ) {
          console.log('error', error);
          reject(error);
        }

        const { candidates = [] } = response;
        const results = candidates.map(({ address, location } = {}) => {
          return {
            label: address,
            location
          }
        })

        resolve(results);

      }, this);

  })
}

stories.add('Default', () => <SearchComplete onSearch={handleSearch} resolveQueryComplete={handleFetchQueryComplete} />);