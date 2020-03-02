import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItemButton from '../../components/ListItemButton';

const stories = storiesOf('Components|ListItemButton', module);

stories.add('Default', () => {
  return (
    <>
      <p>
        <ListItemButton id={1} />
      </p>
    </>
  );
});

stories.add('Custom Button Text', () => {
  return (
    <>
      <p>
        <ListItemButton id={2}>Custom Button Text</ListItemButton>
      </p>
    </>
  );
});
