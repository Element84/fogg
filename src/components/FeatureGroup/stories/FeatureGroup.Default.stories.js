import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

const STORY_COMPONENT = 'Feature Group';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);
const parameters = {
  actions: {
    disabled: true
  }
};

stories.add(
  STORY_NAME,
  () => {
    return (
      <Story component={STORY_COMPONENT} name={STORY_NAME}>
        <p>
          The Feature Group component is a wrapper around the react-leaflet
          basically recreating the component functionality with the added
          capability of passing a prop of `featureGroup`, which will allow the
          user to override and set the Leaflet feature group used within the
          component.
        </p>

        <p>
          This can be particularly useful in instances where the feature group
          needs to be created at a higher scope, but still provide the
          capability to use MapDraw.
        </p>

        <h3>Usage</h3>

        <pre>
          <code>
            {'const featureGroup = new L.FeatureGroup();'}
            <br />
            {'<FeatureGroup featureGroup={featureGroup} />'}
          </code>
        </pre>
      </Story>
    );
  },
  parameters
);
