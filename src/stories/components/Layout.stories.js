import React from 'react';
import { storiesOf } from '@storybook/react';

import Layout from '../../components/Layout';
import Notice from '../../components/Notice';

const stories = storiesOf('Components|Layout', module);

stories.add('Default', () => <Layout>I&apos;m in a Layout</Layout>);

stories.add('Notice', () => {
  return (
    <>
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
      <Layout
        notice={{
          text: <Notice align="center">I Am a Notice Notice</Notice>
        }}
      >
        I&apos;m in a Layout
      </Layout>
    </>
  );
});
