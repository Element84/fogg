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
    firstName: 'Dewayne',
    lastName: 'Kling'
  },
  {
    firstName: 'Harold',
    lastName: 'Dicki',
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
    firstName: 'Alexandrea',
    lastName: 'Padberg'
  }
];

const tableDataDoubled = [...tableData, ...tableData];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Stretch Height To Content';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableDataDoubled
  });
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table
        columns={columns}
        data={data}
        stretchHeightToContent={true}
        fitContainer={true}
      />
    </Story>
  );
});
