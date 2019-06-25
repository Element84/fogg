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
