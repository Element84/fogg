import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Table from './';
import { arrayFilter, setArrayFilterValue } from '../../lib/table';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  },
  {
    accessor: 'actions',
    disableSorting: true,
    Header: false
  }
];

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

const columnsNoLabels = [
  {
    accessor: 'firstName'
  },
  {
    accessor: 'lastName'
  },
  {
    accessor: 'actions'
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

const stories = storiesOf('Components|Table', module);

stories.add('Default', () => {
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
});

stories.add('Filter', () => {
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
  );
});

stories.add('Sort', () => {
  return <Table columns={columns} data={data} enableSorting={true} />;
});

stories.add('No Header', () => {
  return <Table hideHeader={true} columns={columnsNoLabels} data={data} />;
});
