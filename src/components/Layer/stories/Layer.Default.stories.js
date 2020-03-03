import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

const STORY_COMPONENT = 'Layer';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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
        <p>The Layer component is a wrapper...</p>

        <p>TODO: add documentation</p>

        <h3>Usage</h3>

        <pre>
          <code>
            {
              '<Layer layerKey="key" layer={layer} activeDateRange={activeDateRange} />'
            }
          </code>
        </pre>
      </Story>
    );
  },
  parameters
);
