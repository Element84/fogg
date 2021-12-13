import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import { useTableData } from '../../../hooks';

import Table from '../';

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Events';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  function handleOnCellClick (cell, e) {
    action(`${STORY_COMPONENT}::onCellClick`)(cell, e);
  }

  function handleOnCellMouseOver (cell, e) {
    action(`${STORY_COMPONENT}::onCellMouseOver`)(cell, e);
  }

  function handleOnCellMouseOut (cell, e) {
    action(`${STORY_COMPONENT}::onCellMouseOut`)(cell, e);
  }

  function handleOnCellMouseEnter (cell, e) {
    action(`${STORY_COMPONENT}::onCellMouseEnter`)(cell, e);
  }

  function handleOnCellMouseLeave (cell, e) {
    action(`${STORY_COMPONENT}::onCellMouseLeave`)(cell, e);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table
        columns={columns}
        data={data}
        onCellClick={handleOnCellClick}
        onCellMouseOver={handleOnCellMouseOver}
        onCellMouseOut={handleOnCellMouseOut}
        onCellMouseEnter={handleOnCellMouseEnter}
        onCellMouseLeave={handleOnCellMouseLeave}
      />
    </Story>
  );
});
