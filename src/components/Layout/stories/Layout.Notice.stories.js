import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Layout from '../';

const STORY_COMPONENT = 'Layout';
const STORY_NAME = 'Notice';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Layout
        notice={{
          text: 'I Am a Text String Notice'
        }}
      >
        I&apos;m in a Layout
      </Layout>
      <Layout
        notice={{
          text: (
            <div>
              <p>I Am an HTML Notice</p>
            </div>
          ),
          weight: 'bold'
        }}
      >
        I&apos;m in a Layout
      </Layout>
    </Story>
  );
});
