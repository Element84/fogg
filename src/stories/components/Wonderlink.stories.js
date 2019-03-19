import React from 'react';
import { storiesOf } from '@storybook/react';

import WonderLink from '../../components/WonderLink';

const stories = storiesOf('Components|WonderLink', module);

stories.add('Default', () => (
  <WonderLink to="/">What&apos;s in a WonderLink?</WonderLink>
));
