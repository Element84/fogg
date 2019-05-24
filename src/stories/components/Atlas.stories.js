import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Atlas from '../../components/Atlas';
import ItemList from '../../components/ItemList';
import Panel from '../../components/Panel';
import Button from '../../components/Button';

import Request from '../../models/request';

const stories = storiesOf('Components|Atlas', module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

stories.add('Default', () => {
  function handleResolveOnSearch ({ geoJson, page }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            label: `#1 from ${JSON.stringify(geoJson)}`,
            to: '#'
          },
          {
            label: `#2 from ${JSON.stringify(geoJson)} 2`,
            to: '#'
          }
        ]);
      }, 1000);
    });
  }

  function testPatchTextQuery (args) {
    const { textInput } = args;
    action('test-testPatchTextQuery')(textInput);
    return handleResolveOnSearch(args);
  }

  return (
    <>
      <Atlas
        defaultCenter={DEFAULT_CENTER}
        zoom={2}
        resolveOnSearch={testPatchTextQuery}
        SidebarComponents={SidebarPanels}
      />
    </>
  );
});

stories.add('Open Street Map - No Search', () => {
  const services = [
    {
      name: 'open_street_map',
      format: 'png',
      attribution: '&copy; OpenStreetMap contributors',
      tileEndpoint: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
    }
  ];
  return (
    <>
      <Atlas
        defaultCenter={DEFAULT_CENTER}
        zoom={2}
        services={services}
        map="open_street_map"
        search={false}
      />
    </>
  );
});

stories.add('Earth Search', () => {
  async function handleResolveOnSearch ({ geoJson = {}, page, filters } = {}) {
    console.log('filters', filters);
    const { features = [] } = geoJson;
    const { geometry } = features[0] || {};
    let response;
    let responseFeatures;
    let responseMeta;

    const request = new Request(
      'https://earth-search.aws.element84.com/stac/search'
    );

    if (!geometry) {
      return [];
    }

    request.setData({
      intersects: geometry,
      limit: 5,
      page
    });

    request.setOptions({
      headers: {
        Accept: 'application/geo+json',
        'Content-Type': 'application/json'
      }
    });

    try {
      response = await request.post();
    } catch (e) {
      throw new Error(`Failed to get search results: ${e}`);
    }

    responseFeatures = response && response.data && response.data.features;
    responseMeta = response && response.data && response.data.meta;

    if (Array.isArray(responseFeatures)) {
      responseFeatures = responseFeatures.map((feature = {}) => {
        const { properties, id } = feature;
        const { collection } = properties;
        return {
          label: `${id}`,
          sublabels: [
            `Collection: ${collection}`,
            `GeoJSON: ${JSON.stringify(geoJson)}`,
            `Sentinel Grid Square: ${properties['sentinel:grid_square']}`
          ],
          to: '#'
        };
      });
    }

    return {
      features: responseFeatures || [],
      hasMoreResults: responseHasMoreResults(responseMeta)
    };
  }

  return (
    <>
      <Atlas
        defaultCenter={DEFAULT_CENTER}
        zoom={2}
        resolveOnSearch={handleResolveOnSearch}
        SidebarComponents={SidebarPanels}
        placeholder="Look stuffs on Earth Data"
        availableFilters={[
          {
            label: 'Is Sentinel',
            id: 'properties/collection',
            defaultValue: false
          },
          {
            label: 'Sentinel Grid Square',
            id: 'properties/sentinel:grid_square',
            type: 'list',
            list: [
              'UH',
              'UJ',
              'MD',
              'VT',
              'ND',
              'FV',
              'PD',
              'WT',
              'VU',
              'WU',
              'NC',
              'PC'
            ],
            defaultValue: false
          }
        ]}
      />
    </>
  );
});

const SidebarPanels = ({ results, loadMoreResults }) => {
  const hasResults = Array.isArray(results) && results.length > 0;
  const moreResultsAvailable = typeof loadMoreResults === 'function';

  function handleLoadMore (e) {
    if (moreResultsAvailable) {
      loadMoreResults(e);
    }
  }

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
          {moreResultsAvailable && (
            <p>
              <Button onClick={handleLoadMore}>Load More</Button>
            </p>
          )}
        </Panel>
      )}
    </>
  );
};

SidebarPanels.propTypes = {
  results: PropTypes.array,
  loadMoreResults: PropTypes.func
};

function responseHasMoreResults ({ page, limit, found } = {}) {
  if (page * limit < found) return true;
  return false;
}
