import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import { useTableData } from '../../../hooks';

import Table from '../';

import TableSearchInput from '../../TableSearchInput';
import TableSearchFilters from '../../TableSearchFilters';

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
  },
  {
    columnId: 'role',
    includeColumn: false
  }
];

const tableData = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed',
    role: ['user', 'cool-guy']
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    role: ['user', 'hero'],
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
    lastName: 'Lincoln',
    role: ['user', 'emancipator']
  }
];

const FILTER_MENU_OPTIONS = [
  {
    columnId: 'role',
    type: 'checkbox',
    Header: 'Role'
  },
  {
    columnId: 'firstName',
    type: 'radio',
    Header: 'First Name'
  }
];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Filters';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data, filter, clearFilters, filters } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  function handleOnFilter (filterData, cell) {
    filter(filterData, cell);
  }

  const searchFilters =
    filters.find(({ filterType } = {}) => filterType === 'search') || {};
  const { filterValue } = searchFilters;

  /**
   * handleOnSearchChange
   */

  function handleOnSearchChange ({ currentTarget = {} } = {}) {
    const { value } = currentTarget;

    const filterData = {
      value
    };

    handleOnFilter(filterData);
  }

  /**
   * handleOnFiltersChange
   */

  function handleOnFiltersChange ({ columnId, selectedOptions } = {}) {
    const checkedOptions = selectedOptions.filter(
      ({ isChecked } = {}) => !!isChecked
    );
    const values = checkedOptions.map(({ value } = {}) => value);

    const filterData = {
      value: values
    };

    const cell = {
      filterType: 'checklist',
      columnId
    };

    handleOnFilter(filterData, cell);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          Note: The TableSearchInput and TableSearchFilters components are
          maintained and imported outside of the Table component.
        </p>
      </StoryNotes>

      <div className="story-search-filters">
        <div className="story-search-filters-sidebar">
          <TableSearchInput
            value={filterValue}
            onChange={handleOnSearchChange}
            onClear={clearFilters}
          />

          <TableSearchFilters
            options={FILTER_MENU_OPTIONS}
            defaultTableData={tableData}
            onChange={handleOnFiltersChange}
          />
        </div>

        <Table label="Users" columns={columns} data={data} />
      </div>
    </Story>
  );
});
