import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

import featureCollection from '../../../../tests/fixtures/feature-collection-colors.json';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Shape Options';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  // Define an AOI
  featureCollection.features[0].properties.featureType = 'aoi';

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview geoJson={featureCollection} />
    </Story>
  );
});
