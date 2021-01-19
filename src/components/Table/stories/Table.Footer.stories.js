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
const STORY_NAME = 'Footer';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const tripleTableData = [...tableData, ...tableData, ...tableData];

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tripleTableData
  });
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          The difference between a table footer and adding extra rows is the
          footer is appended after the table component, where the extra rows are
          included as part of the table grid. This impacts things like sizing.
        </p>
      </StoryNotes>
      <Table columns={columns} data={data} footerHeight={20}>
        <div
          style={{
            color: 'white',
            backgroundColor: 'blueviolet'
          }}
        >
          Table Footer
        </div>
      </Table>
    </Story>
  );
});
