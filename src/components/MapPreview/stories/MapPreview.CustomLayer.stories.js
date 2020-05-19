import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

import featureCollection from '../../../../tests/fixtures/feature-collection.json';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Custom Layer';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const layers = {
    base: [
      {
        name: 'Open Street Maps',
        serviceName: 'open_street_map',
        type: 'service'
      }
    ]
  };

  const services = [
    {
      name: 'open_street_map',
      format: 'png',
      attribution: '&copy; OpenStreetMap contributors',
      projections: 'epsg3857',
      maxZoom: 18,
      nativeZoom: 18,
      tileSize: 256,
      tileEndpoint: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  ];
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview
        geoJson={featureCollection}
        zoom={5}
        map="open_street_map"
        projection="epsg3857"
        availableLayers={layers}
        availableServices={services}
      />
    </Story>
  );
});
