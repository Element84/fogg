import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Table from '../';
import { arrayFilter, setArrayFilterValue } from '../../../lib/table';

const STORY_COMPONENT = 'Table';
const STORY_NAME = 'Filter';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const columnsWithFilters = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    Filter: DefaultColumnFilter
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Filter: DefaultColumnFilter
  },
  {
    accessor: 'role',
    filter: arrayFilter
  },
  {
    accessor: 'org',
    filter: 'includes'
  },
  {
    accessor: 'actions',
    disableFilters: true,
    Header: false
  }
];

const data = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed',
    role: ['admin'],
    org: 'windbreakers',
    actions: <button key={'row-1-button'}>View</button>
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    role: ['user'],
    org: 'windbreakers',
    actions: (
      <div key={'row-2-buttons'}>
        <button>View</button>
        <button>Edit</button>
      </div>
    )
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln',
    role: ['admin', 'user'],
    org: 'emancipators'
  }
];

stories.add(STORY_NAME, () => {
  const FILTER_MENU_OPTIONS = [
    {
      columnId: 'role',
      type: 'checkbox',
      header: 'Role',
      setFilterValue: setArrayFilterValue
    },
    {
      columnId: 'org',
      type: 'checkbox',
      header: 'Organization'
    }
  ];
  const filterTypes = {
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    }
  };
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Table
        initialState={{
          hiddenColumns: ['role', 'org']
        }}
        columns={columnsWithFilters}
        data={data}
        filterTypes={filterTypes}
        enableFiltering={true}
        filterMenuOptions={FILTER_MENU_OPTIONS}
      />
    </Story>
  );
});

function DefaultColumnFilter ({ filterValue, setFilter, column = {}, ...rest }) {
  const { id } = column;
  return (
    <input
      className="table-filter"
      value={filterValue}
      onChange={e => {
        setFilter(id, e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Filter..."
    />
  );
}

DefaultColumnFilter.propTypes = {
  column: PropTypes.object,
  filterValue: PropTypes.any,
  setFilter: PropTypes.func
};
