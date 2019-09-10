import React from 'react';
import { storiesOf } from '@storybook/react';

import featureCollection from '../../../tests/fixtures/feature-collection.json';

import MapPreview from '../../components/MapPreview';

const stories = storiesOf('Components|MapPreview', module);

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

stories.add('Lat Lng', () => {
  return <MapPreview center={ALEXANDRIA} />;
});

stories.add('GeoJSON', () => {
  return <MapPreview geoJson={featureCollection} zoom={5} />;
});

stories.add('Layer', () => {
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
      tileEndpoint: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
    }
  ];
  return (
    <MapPreview
      geoJson={featureCollection}
      zoom={5}
      map="open_street_map"
      projection="epsg3857"
      availableLayers={layers}
      availableServices={services}
    />
  );
});
