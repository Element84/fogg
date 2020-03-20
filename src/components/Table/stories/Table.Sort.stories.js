import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
    canSort: false,
    canFilter: false,
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
        label="Users"
        onSort={handleOnSort}
        columns={columns}
        data={data}
      />
    </Story>
  );
});
