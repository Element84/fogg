import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Lat Lng';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview center={ALEXANDRIA} />
    </Story>
  );
});
