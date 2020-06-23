import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import { useTableData } from '../../../hooks';

import DataTable from '../';

const tableColumns = [
  {
    Header: 'First Name',
    columnId: 'firstName'
  },
  {
    Header: 'Last Name',
    columnId: 'lastName'
  }
];

const tableData = [];

const STORY_COMPONENT = 'DataTable';
const STORY_NAME = 'Custom Empty Message';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <DataTable
        label="Users"
        columns={columns}
        data={data}
        isLoading={false}
        emptyMessage="Unfortunately, we could not find any records."
      />
    </Story>
  );
});
