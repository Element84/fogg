import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

import featureCollection from '../../../../tests/fixtures/feature-collection-colors-marker-aoi.json';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Feature Events';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const features = {
  ...featureCollection,
  features: featureCollection.features.map((feature, index) => {
    return {
      ...feature,
      properties: {
        ...feature.properties,
        onClick: function () {
          console.log(`Click: ${index}`, feature);
        },
        onMouseover: function () {
          console.log(`Mouse Over: ${index}`, feature);
        },
        onMouseout: function () {
          console.log(`Mouse Out: ${index}`, feature);
        }
      }
    };
  })
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview geoJson={features} />
    </Story>
  );
});
