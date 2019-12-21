import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Table from '../../components/Table';

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

function DefaultColumnFilter ({ filterValue, setFilter }) {
  return (
    <input
      className="table-filter"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Filter..."
    />
  );
}

DefaultColumnFilter.propTypes = {
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
    actions: <button key={'row-1-button'}>View</button>
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    actions: (
      <div key={'row-2-buttons'}>
        <button>View</button>
        <button>Edit</button>
      </div>
    )
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln'
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
      columns={columnsWithFilters}
      data={data}
      filterTypes={filterTypes}
      enableFiltering={true}
    />
  );
});

stories.add('Sort', () => {
  return <Table columns={columns} data={data} enableSorting={true} />;
});

stories.add('No Header', () => {
  return <Table hideHeader={true} columns={columnsNoLabels} data={data} />;
});
