import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import TableCellHeader from '../';

const STORY_COMPONENT = 'Table Header Cell';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  function handleOnSort (cell) {
    action(`${STORY_COMPONENT}::onSort`)(cell);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          This component is coupled to the expected props when used with the
          Table component.
        </p>
      </StoryNotes>
      <ul>
        <li>
          <p>With Sort</p>
          <TableCellHeader
            cell={{
              Header: 'First Name',
              columnId: 'firstName',
              isSorted: true,
              sortType: 'none',
              isHeader: true,
              Cell: undefined,
              columnIndex: 0,
              rowIndex: 0,
              value: undefined
            }}
            sort={{
              sortType: 'none',
              canSort: true,
              onSort: handleOnSort
            }}
          />
        </li>
        <li>
          <p>With Sort</p>
          <TableCellHeader
            cell={{
              Header: 'Last Name',
              columnId: 'lastName',
              isHeader: true,
              Cell: undefined,
              columnIndex: 1,
              rowIndex: 0,
              value: undefined
            }}
            sort={{
              sortType: undefined,
              canSort: false,
              onSort: undefined
            }}
          />
        </li>
        <li>
          <p>No Header</p>
          <TableCellHeader
            cell={{
              columnId: 'actions',
              Header: false,
              align: 'right',
              type: 'action',
              widthRatio: 1,
              isHeader: true,
              Cell: undefined,
              columnIndex: 2,
              rowIndex: 0,
              value: undefined
            }}
            sort={{
              sortType: undefined,
              canSort: false,
              onSort: undefined
            }}
          />
        </li>
      </ul>
    </Story>
  );
});
