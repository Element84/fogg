import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import { handleEarthSearchUseMapEffect } from './lens-story-util';

import Lens from '../';

const STORY_COMPONENT = 'Lens';
const STORY_NAME = 'Custom Basemap';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const layers = [
  {
    name: 'Open Street Maps',
    serviceName: 'open_street_map',
    type: 'service'
  }
];

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

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div className="story-map">
        <Lens
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={4}
          projection="epsg3857"
          availableLayers={layers}
          useMapEffect={handleEarthSearchUseMapEffect}
          availableServices={services}
          map="open_street_map"
        />
      </div>
    </Story>
  );
});
