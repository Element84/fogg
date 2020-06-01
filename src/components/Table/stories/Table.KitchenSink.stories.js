import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import { useTableData } from '../../../hooks';
import { formatDateTime } from '../../../lib/datetime';

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
    Header: 'Date',
    columnId: 'date',
    type: 'date',
    cellTransformer: value => formatDateTime(value),
    filterTransformer: value => formatDateTime(value)
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    widthRatio: 1,
    canSort: false,
    canFilter: false
  }
];

const tableData = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed',
    date: '2019-08-20T11:51:36.896Z',
    role: ['user', 'cool-guy']
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    date: '2019-08-20T11:27:22.506Z',
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
    date: '2019-10-24T21:36:04.522Z',
    role: ['user', 'emancipator']
  }
];

const FILTER_MENU_OPTIONS = [
  {
    columnId: 'role',
    type: 'checkbox',
    Header: 'Role'
  }
];

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Kitchen Sink';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data, sort, filter, clearFilters, filters } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  const searchFilters =
    filters.find(({ filterType } = {}) => filterType === 'search') || {};
  const { filterValue } = searchFilters;

  /**
   * handleOnFilter
   */

  function handleOnFilter (filterData, cell) {
    filter(filterData, cell);

    action(`${STORY_COMPONENT}::onFilter`)(filterData, cell);
  }

  /**
   * handleOnSearchChange
   */

  function handleOnSearchChange ({ currentTarget = {} } = {}) {
    const { value } = currentTarget;

    const filterData = {
      value
    };

    handleOnFilter(filterData);

    action(`${STORY_COMPONENT}::onSearchChange`)(filterData);
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

    action(`${STORY_COMPONENT}::onFiltersChange`)(filterData, cell);
  }

  /**
   * handleOnSort
   */

  function handleOnSort (cell) {
    if (typeof sort === 'function') {
      sort(cell);
    }

    action(`${STORY_COMPONENT}::onSort`)(cell);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
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

        <Table
          columns={columns}
          data={data}
          frozenHeader={true}
          stretchHeightToContent={true}
          onSort={handleOnSort}
        />
      </div>
    </Story>
  );
});
