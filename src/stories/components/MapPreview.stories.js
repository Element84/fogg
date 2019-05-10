import React from 'react';
import { storiesOf } from '@storybook/react';

import MapPreview from '../../components/MapPreview';

const stories = storiesOf('Components|MapPreview', module);

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

stories.add('Default', () => {
  const mapSettings = {
    center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    zoom: 3
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <MapPreview {...mapSettings} />
    </div>
  );
});
