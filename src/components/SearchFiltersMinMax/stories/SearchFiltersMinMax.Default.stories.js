import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import SearchFiltersMinMax from '../SearchFiltersMinMax';

const STORY_COMPONENT = 'Search Filters Min/Max';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add('Default', () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchFiltersMinMax
        id={'azimuth_angle'}
        label={'Azimuth Angle'}
        value={{ max: 320, min: 40 }}
        limits={{
          min: {
            min: 0,
            max: 360
          },
          max: {
            min: 0,
            max: 360
          }
        }}
      />
    </Story>
  );
});
