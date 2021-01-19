import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

const STORY_COMPONENT = 'Map Marker';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

// TODO: Requires story. Should be wrapped with Map for example

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <p>Leaflet marker with custom icon</p>
    </Story>
  );
});
