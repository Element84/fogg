import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import TableHead from './TableHead';
import TableRow from './TableRow';

import { useTable, useFilters, useSortBy } from 'react-table';

const Table = ({
  children,
  className,
  columns,
  data,
  filterTypes = {},
  defaultColumn = {},
  enableSorting = false,
  enableFiltering = false
}) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);
  const memoizedDefaultColumn = useMemo(() => defaultColumn, [defaultColumn]);
  const memoizedFilterTypes = useMemo(() => filterTypes, [filterTypes]);

  const { rows, getTableProps, prepareRow, headerGroups } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      filterTypes: memoizedFilterTypes,
      defaultColumn: memoizedDefaultColumn,
      disableFilters: !enableFiltering,
      disableSorting: !enableSorting
    },
    useFilters,
    useSortBy
  );

  function headerIsEmpty (header) {
    return typeof header.Header === 'function' && header.Header() === null;
  }

  return (
    <div className={`table ${className || ''}`}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => {
            const { headers } = headerGroup;
            // check for all empty headers before rendering row
            if (headers.every(headerIsEmpty)) {
              return null;
            }
            return (
              <TableHead
                className="table-header"
                key={`Table-Header-${headerIndex}`}
                headers={headers}
              />
            );
          })}
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            return (
              prepareRow(row) || (
                <TableRow key={`Table-Row-${rowIndex}`} cells={row.cells} />
              )
            );
          })}
        </tbody>
      </table>
      {children}
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  filterTypes: PropTypes.object,
  defaultColumn: PropTypes.object,
  enableFiltering: PropTypes.bool,
  enableSorting: PropTypes.bool
};

export default Table;
