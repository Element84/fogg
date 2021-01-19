import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import IconByName from '../';

const STORY_COMPONENT = 'IconByName';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ul>
        <li>
          <IconByName name="FaSatellite" /> FaSatellite
        </li>
        <li>
          <IconByName name="FaRocket" /> FaRocket
        </li>
        <li>
          <IconByName name="FaPen" /> FaPen
        </li>
        <li>
          <IconByName name="FaChevronRight" /> FaChevronRight
        </li>
      </ul>
    </Story>
  );
});
