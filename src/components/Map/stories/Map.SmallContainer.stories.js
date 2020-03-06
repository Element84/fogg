import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Map from '../';

const STORY_COMPONENT = 'Map';
const STORY_NAME = 'Small Container';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

stories.add(STORY_NAME, () => {
  const mapSettings = {
    center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    zoom: 3
  };

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div style={{ width: '300px', height: '300px' }}>
        <Map {...mapSettings} />
      </div>
    </Story>
  );
});
