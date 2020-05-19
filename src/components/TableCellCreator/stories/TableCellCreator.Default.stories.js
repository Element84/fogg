import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import TableCellCreator from '../';

const STORY_COMPONENT = 'Table Cell Creator';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const columns = [
  {
    Header: 'First Name',
    columnId: 'firstName',
    isSorted: true,
    sortType: 'none',
    isHeader: true
  },
  {
    Header: 'Last Name',
    columnId: 'lastName',
    isHeader: true
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    widthRatio: 1,
    isHeader: true
  }
];

const rows = [
  [
    {
      Header: 'First Name',
      columnId: 'firstName',
      isSorted: true,
      sortType: 'none',
      isHeader: true
    },
    {
      Header: 'Last Name',
      columnId: 'lastName',
      isHeader: true
    },
    {
      columnId: 'actions',
      Header: false,
      align: 'right',
      type: 'action',
      widthRatio: 1,
      isHeader: true
    }
  ],
  [
    {
      value: 'Jewell'
    },
    {
      value: 'Hayes'
    },
    {
      value: []
    }
  ],
  [
    {
      value: 'Joshua'
    },
    {
      value: 'McClure'
    },
    {
      value: [<button key="test-button">Test</button>]
    }
  ],
  [
    {
      value: 'Houston'
    },
    {
      value: 'Hahn'
    },
    {
      value: []
    }
  ]
];

stories.add(STORY_NAME, () => {
  function handleOnCellClick (cellArgs, e) {
    action(`${STORY_COMPONENT}::onCellClick`)(cellArgs, e);
  }

  function handleOnSort (cellArgs, e) {
    action(`${STORY_COMPONENT}::onSort`)(cellArgs, e);
  }

  const Cell = TableCellCreator({
    rows,
    columns,
    onCellClick: handleOnCellClick,
    onSort: handleOnSort
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          TableCellCreator is a function that returns a component for generating
          cells for the Table component.
        </p>
      </StoryNotes>
      <ul>
        <li>
          <p>Header</p>
          <p style={{ overflow: 'hidden' }}>
            <Cell columnIndex={0} rowIndex={0} />
          </p>
        </li>
        <li>
          <p>Standard Cell</p>
          <p>
            <Cell columnIndex={1} rowIndex={2} />
          </p>
        </li>
        <li>
          <p>Action, Aligned Right</p>
          <p>
            <Cell columnIndex={2} rowIndex={1} />
          </p>
        </li>
      </ul>
    </Story>
  );
});
