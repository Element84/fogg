import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

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
const STORY_NAME = 'Fit Container';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const tripleTableData = [...tableData, ...tableData, ...tableData];

stories.add(STORY_NAME, () => {
  const fixedHeight = {
    height: '100vh'
  };

  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tripleTableData
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME} style={fixedHeight}>
      <StoryNotes>
        <p>
          The component prop <code>fitContainer</code> has been deprecated.
          Instead, the table should be default fill its container
        </p>
        <p>
          The height of this story container was set to 100vh to demonstrate
          this example.
        </p>
        <pre>
          <code>
            {`.Story-Table-FitContainer {

  &,
  .story {
    height: 100vh;
  }

}`}
          </code>
        </pre>
      </StoryNotes>
      <Table label="Users" columns={columns} data={data} />
    </Story>
  );
});
