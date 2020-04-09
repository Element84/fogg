import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import { useTableData } from '../../../hooks';
import { formatDate } from '../../../lib/datetime';

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
    Header: 'Date',
    columnId: 'date',
    type: 'date',
    cellTransformer: value => formatDate(value)
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    canSort: false,
    canFilter: false,
    widthRatio: 1
  }
];

const tableData = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed',
    date: '2019-08-20T11:27:22.506Z'
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    date: '2019-08-20T11:51:36.896Z',
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
    lastName: 'Lincoln',
    date: '2019-10-24T21:36:04.522Z'
  }
];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Sort';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data, sort } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  function handleOnSort (cell) {
    if (typeof sort === 'function') {
      sort(cell);
    }
    action(`${STORY_COMPONENT}::onSort`)(cell);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table
        defaultWidth={700}
        label="Users"
        onSort={handleOnSort}
        columns={columns}
        data={data}
      />
    </Story>
  );
});
