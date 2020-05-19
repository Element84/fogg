import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

import featureCollection from '../../../../tests/fixtures/feature-collection.json';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'GeoJSON';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview geoJson={featureCollection} zoom={5} />
    </Story>
  );
});
