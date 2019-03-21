import React from 'react';
import { storiesOf } from '@storybook/react';

import Layout from '../../components/Layout';

const stories = storiesOf('Components|Layout', module);

stories.add('Default', () => <Layout>I&apos;m in a Layout</Layout>);
