import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from '../../components/Table';

const columns = ['First Name', 'Last Name', null];

const rows = [
  ['Gary', 'Godspeed', <button key={'row-1-button'}>View</button>],
  [
    'Quinn',
    'Airgon',
    <div key={'row-2-buttons'}>
      <button>View</button>
      <button>Edit</button>
    </div>
  ]
];

const stories = storiesOf('Components|Table', module);

stories.add('Default', () => {
  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  );
});
