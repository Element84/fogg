import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Table from '../';

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Sort';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  },
  {
    accessor: 'actions',
    disableSorting: true,
    Header: false
  }
];

const data = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed',
    role: ['admin'],
    org: 'windbreakers',
    actions: <button key={'row-1-button'}>View</button>
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    role: ['user'],
    org: 'windbreakers',
    actions: (
      <div key={'row-2-buttons'}>
        <button>View</button>
        <button>Edit</button>
      </div>
    )
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln',
    role: ['admin', 'user'],
    org: 'emancipators'
  }
];

stories.add('Sort', () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table columns={columns} data={data} enableSorting={true} />
    </Story>
  );
});
