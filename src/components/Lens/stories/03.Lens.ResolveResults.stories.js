import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Lens from '../';
import Panel from '../../Panel';
import ItemList from '../../ItemList';

const STORY_COMPONENT = 'Lens';
const STORY_NAME = '03 - Resolve Results';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const ARTIFICAL_REQUEST_TIME = 500;

// Lens component sidebar. Gets dynamically rendered
// passing in the Lens APIs as props

const Sidebar = ({ geoSearch = {} }) => {
  const { results = {} } = geoSearch;
  const { features } = results;

  return (
    <Panel header="Results">
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

function handleResolveOnSearch ({ geoJson }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        features: [
          {
            label: `Result #1 from ${JSON.stringify(geoJson)}`,
            to: '#'
          },
          {
            label: `Result #2 from ${JSON.stringify(geoJson)}`,
            to: '#'
          }
        ]
      });
    }, ARTIFICAL_REQUEST_TIME);
  });
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
