import React from 'react';
import { storiesOf } from '@storybook/react';

import MapPreview from '../../components/MapPreview';

const stories = storiesOf('Components|MapPreview', module);

stories.add('Default', () => {
  const ALEXANDRIA = {
    lat: 38.8048,
    lng: -77.0469
  };

  return <MapPreview position={ALEXANDRIA} />;
});
