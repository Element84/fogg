import React from 'react';
import { storiesOf } from '@storybook/react';

import UsersTable from '../../components/UsersTable';

const userData = [
  {
    id: 1,
    firstName: 'Michael',
    lastName: 'Scott',
    address: {
      street: '1725 Slough Avenue suite 100',
      city: 'Scranton',
      state: 'PA',
      zip: 18505
    },
    organization: 'Michael Scott Paper Company',
    role: 'Admin'
  },
  {
    id: 2,
    firstName: 'Dwight',
    lastName: 'Shroot',
    address: {
      street: '1725 Slough Avenue suite 200',
      city: 'Scranton',
      state: 'PA',
      zip: 18505
    },
    organization: 'Dunder Mifflin',
    role: 'Premium'
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Vance',
    address: {
      street: '1725 Slough Avenue suite 210',
      city: 'Scranton',
      state: 'PA',
      zip: 18505
    },
    organization: 'Vance Refridgeration',
    role: 'Admin'
  }
];

const columns = ['Last Name', 'First Name', 'Organization', 'Role'];

const stories = storiesOf('Components|UsersTable', module);

stories.add('Users Table', () => {
  return <UsersTable headers={columns} users={userData} />;
});
