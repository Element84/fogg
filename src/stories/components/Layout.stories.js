import React from 'react';
import { storiesOf } from '@storybook/react';

import Layout from '../../components/Layout';

storiesOf('Layout', module)
  .add('Default', () => <Layout>I'm in a Layout</Layout>);