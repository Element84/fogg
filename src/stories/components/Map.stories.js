import React from 'react';
import { storiesOf } from '@storybook/react';

import Map from '../../components/Map';

const stories = storiesOf('Components|Map', module);

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

stories.add('Default', () => {
  const mapSettings = {
    center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    zoom: 5
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map {...mapSettings} />
    </div>
  );
});

stories.add('Small Container', () => {
  const mapSettings = {
    center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    zoom: 3
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Map {...mapSettings} />
    </div>
  );
});
