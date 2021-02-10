import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Multi Lat Lng';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const geoJson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[4.3155670166015625,51.85783521205157],[4.506797790527344,51.85783521205157],[4.506797790527344,51.93749209045435],[4.3155670166015625,51.93749209045435],[4.3155670166015625,51.85783521205157]]]}}]};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview geoJson={geoJson} />
    </Story>
  );
});
