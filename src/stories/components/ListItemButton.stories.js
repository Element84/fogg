import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItemButton from '../../components/ListItemButton';

const stories = storiesOf('Components|ListItemButton', module);

stories.add('Default', () => {
  return (
    <>
      <p>
        <ListItemButton listType={'item'} id={1} />
      </p>
    </>
  );
});

stories.add('Custom Button Text', () => {
  return (
    <>
      <p>
        <ListItemButton listType={'item'} id={1}>
          Custom Button Text
        </ListItemButton>
      </p>
    </>
  );
});
