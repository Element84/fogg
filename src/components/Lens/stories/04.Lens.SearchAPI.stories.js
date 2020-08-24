import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Request from '../../../models/request';

import Story from '../../../../stories/helpers/Story';

import Lens from '../';
import Panel from '../../Panel';
import ItemList from '../../ItemList';

import { lensDateToSatTime } from './story-util';

const STORY_COMPONENT = 'Lens';
const STORY_NAME = '04 - Search API';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const API_ENDPOINT = 'https://earth-search.aws.element84.com/v0/search';

// Lens component sidebar. Gets dynamically rendered
// passing in the Lens APIs as props

const Sidebar = ({ geoSearch = {} }) => {
  const { results = {} } = geoSearch;
  const { features, numberOfResults } = results;
  console.log('geoSearch', geoSearch)

  return (
    <Panel header={`Results ${numberOfResults}`}>
      <ItemList items={features} />
    </Panel>
  );
};

Sidebar.propTypes = {
  geoSearch: PropTypes.object
};

// Function that gets used to handle any async lookups
// or search requests. Resolves as a promise. Most
// likely would be used to create a search and resolve
// the results to Lens for consumption

async function handleResolveOnSearch ({ geoJson = {}, page, date }) {
  const { features = [] } = geoJson;
  const { geometry } = features[0] || {};

  const request = new Request(API_ENDPOINT);

  const data = {
    limit: 5,
    time: lensDateToSatTime(date),
    page
  };

  if (geometry) {
    data.intersects = geometry;
  }

  request.setData(data);

  request.setOptions({
    headers: {
      Accept: 'application/geo+json',
      'Content-Type': 'application/json'
    }
  });

  action('Lens::handleResolveOnSearch')({ data });

  let response;

  try {
    response = await request.post();
  } catch (e) {
    throw new Error(`Failed to get search results: ${e}`);
  }

  const { data: responseData = {} } = response;
  const { context = {} } = responseData;

  const featuresExists = Array.isArray(responseData.features);

  return {
    features: featuresExists && responseData.features.map(feature => {
      const { properties, id, collection } = feature;
      return {
        label: `${id}`,
        sublabels: [
          `Collection: ${collection}`,
          `Date: ${properties.datetime}`
        ],
        icon: false
      };
    }),
    numberOfResults: context.matched
  };
}

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div className="story-map">
        <Lens
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={4}
          resolveOnSearch={handleResolveOnSearch}
          SidebarComponents={Sidebar}
        />
      </div>
    </Story>
  );
});
