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
    firstName: 'Ambrose',
    lastName: 'Will',
    actions: [
      {
        to: '#',
        label: 'View',
        buttonType: ['text']
      }
    ]
  },
  {
    firstName: 'Donna',
    lastName: 'Conn',
    actions: [
      {
        to: '#',
        label: 'Edit',
        icon: 'FaPen',
        buttonType: ['text', 'icon-before']
      }
    ]
  },
  {
    firstName: 'Vincenzo',
    lastName: 'Zieme',
    actions: [
      {
        to: '#',
        label: 'Go',
        icon: 'FaChevronRight',
        buttonType: ['text', 'icon-after']
      }
    ]
  }
];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Actions';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table label="Users" columns={columns} data={data} />
    </Story>
  );
});
