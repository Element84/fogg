import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import { handleEarthSearchUseMapEffect } from './lens-story-util';

import Lens from '../';

const STORY_COMPONENT = 'Lens';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div className="story-map">
        <Lens
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={4}
          useMapEffect={handleEarthSearchUseMapEffect}
        />
      </div>
    </Story>
  );
});
