import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from '../../components/Table';

const userData = [
  {
    name: 'Michael Scott',
    organization: 'Michael Scott Paper Company',
    plan: 'Admin'
  },
  {
    name: 'Dwight Shroot',
    organization: 'Dunder Mifflin',
    plan: 'Premium'
  },
  {
    name: 'Bob Vance',
    organization: 'Vance Refridgeration',
    plan: 'Admin'
  }
];

const columns = ['Name', 'Organization', 'Plan'];
const rows = userData.map(user => Object.values(user));

const stories = storiesOf('Components|UsersTable', module);

stories.add('Users Table', () => {
  return (
    <>
      <Table columns={columns} rows={rows} />
      {/* <p>testing</p> */}
    </>
  );
});
