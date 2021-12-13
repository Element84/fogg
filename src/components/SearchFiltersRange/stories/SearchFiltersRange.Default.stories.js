import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import SearchFiltersRange from '../SearchFiltersRange';

const STORY_COMPONENT = 'Search Filters Range';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add('Default', () => {

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchFiltersRange
        id={'incidence_angle'}
        label={'Incidence Angle'}
        value={{max: 30, min: 7}}
        range={{max: 45, min: 5}}
      />
    </Story>
  );
});
