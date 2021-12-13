import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import { useTableData } from '../../../hooks';

import Table from '../';

const tableColumns = [
  {
    Header: 'First Name',
    columnId: 'firstName'
  },
  {
    Header: 'Last Name',
    columnId: 'lastName'
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    widthRatio: 1
  }
];

const tableData = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed'
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    actions: [
      {
        to: '#',
        label: 'View'
      },
      {
        to: '#',
        label: 'Edit'
      }
    ]
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }
];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Frozen Header';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const tripleTableData = [...tableData, ...tableData, ...tableData];

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tripleTableData
  });
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table columns={columns} data={data} frozenHeader={true} />
    </Story>
  );
});
