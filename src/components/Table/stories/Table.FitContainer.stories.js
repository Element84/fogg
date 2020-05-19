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
    firstName: 'Agnes',
    lastName: 'Rippin'
  },
  {
    firstName: 'Emmalee',
    lastName: 'Turcotte',
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
    firstName: 'Margot',
    lastName: 'Thompson'
  }
];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Fit Container';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          Using the component with the prop <code>fitContainer</code> set to{' '}
          <code>true</code>
          requires the component&apos;s parent container to have a fixed height
          or height that won&apos;t grow past a certain point, such as using
          flexbox. Without this, the component will constantly try to rerender
          as it grows it&apos;s height.
        </p>
      </StoryNotes>
      <Table label="Users" columns={columns} data={data} fitContainer={true} />
    </Story>
  );
});
