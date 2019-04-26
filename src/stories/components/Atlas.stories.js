import React from 'react';
import { storiesOf } from '@storybook/react';

import Atlas from '../../components/Atlas';

const stories = storiesOf('Components|Atlas', module);

stories.add('Default', () => {
  const ALEXANDRIA = {
    lat: 38.8048,
    lng: -77.0469
  };

  return (
    <>
      <Atlas defaultCenter={ALEXANDRIA} zoom={3} />
    </>
  );
});
