import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Map from '../';

const STORY_COMPONENT = 'Map';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

stories.add(STORY_NAME, () => {
  const mapSettings = {
    center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    zoom: 5
  };

  // TODO: we should figure out a way to display this nicer, as the original intent
  // of 100% full screen doesn't work with the current Story layout

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Map {...mapSettings} />
      </div>
    </Story>
  );
});
