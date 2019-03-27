import React from 'react';
import { storiesOf } from '@storybook/react';

import TableRow from '../../components/TableRow';

const row = ['Gary', 'Godspeed', <button key={'row-button'}>View</button>];

const stories = storiesOf('Components|TableRow', module);

stories.add('Default', () => {
  return (
    <>
      <TableRow cells={row} />
    </>
  );
});
