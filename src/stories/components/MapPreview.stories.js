import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import MapPreview from '../../components/MapPreview';

const stories = storiesOf('Components|MapPreview', module);

const SidebarPanels = ({ results }) => {
  const hasResults = Array.isArray(results) && results.length > 0;

  return (
    <>
      {!hasResults && (
        <>
          <Panel header="Explore">
            <p>Explore stuff</p>
          </Panel>
          <Panel header="Past Searches">
            <ItemList
              items={[
                {
                  label: 'Alexandria, VA',
                  to: '#'
                },
                {
                  label: 'Montes Claros, MG',
                  to: '#'
                }
              ]}
            />
          </Panel>
        </>
      )}

      {hasResults && (
        <Panel header="Results">
          <ItemList items={results} />
        </Panel>
      )}
    </>
  );
};

SidebarPanels.propTypes = {
  results: PropTypes.array
};

stories.add('Default', () => {
  const ALEXANDRIA = {
    lat: 38.8048,
    lng: -77.0469
  };

  function handleResolveOnSearch (coordinates) {
    const coordinatesString = JSON.stringify(coordinates);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            label: `#1 from ${coordinatesString}`,
            to: '#'
          },
          {
            label: `#2 from ${coordinatesString} 2`,
            to: '#'
          }
        ]);
      }, 1000);
    });
  }

  return (
    <>
      <MapPreview
        defaultCenter={ALEXANDRIA}
        zoom={3}
        resolveOnSearch={handleResolveOnSearch}
        SidebarComponents={SidebarPanels}
      />
    </>
  );
});
