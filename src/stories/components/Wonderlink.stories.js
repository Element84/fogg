import React from 'react';
import { storiesOf } from '@storybook/react';

import WonderLink from '../../components/WonderLink';

storiesOf('WonderLink', module)
  .add('Default', () => <WonderLink to="/">What's in a WonderLink?</WonderLink>);