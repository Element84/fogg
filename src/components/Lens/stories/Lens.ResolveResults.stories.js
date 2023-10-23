import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { handleEarthSearchUseMapEffect } from './lens-story-util';
import Story from '../../../../stories/helpers/Story';

import Lens from '../';

const STORY_COMPONENT = 'Lens';
const STORY_NAME = 'Resolve Results';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};
const ARTIFICAL_REQUEST_TIME = 500;

const Sidebar = ({ geoSearch = {} }) => {
  const { results = {} } = geoSearch;
  const { features } = results;
  const styles = {
    backgroundColor: 'white'
  };
  return (
    <div style={styles}>
      <strong>Results</strong>
      {Array.isArray(features) && (
        <ul>
          {features.map(({ label } = {}) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  geoSearch: PropTypes.object
};

stories.add(STORY_NAME, () => {
  // Function that gets used to handle any async lookups
  // or search requests. Resolves as a promise. Most
  // likely would be used to create a search and resolve
  // the results to Lens for consumption

  function handleResolveOnSearch ({ geoJson }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          features: [
            {
              label: `#1 from ${JSON.stringify(geoJson)}`,
              to: '#'
            },
            {
              label: `#2 from ${JSON.stringify(geoJson)} 2`,
              to: '#'
            }
          ]
        });
      }, ARTIFICAL_REQUEST_TIME);
    });
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div className="story-map">
        <Lens
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={4}
          resolveOnSearch={handleResolveOnSearch}
          SidebarComponents={Sidebar}
          useMapEffect={handleEarthSearchUseMapEffect}
        />
      </div>
    </Story>
  );
});
