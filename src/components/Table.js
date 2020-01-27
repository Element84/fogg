import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import TableHead from './TableHead';
import TableRow from './TableRow';

import { useTable, useFilters, useSortBy } from 'react-table';
import TableFilterMenu from './TableFilterMenu';
import { isEmptyObject } from '../lib/util';

const Table = ({
  children,
  className,
  columns,
  data,
  filterTypes = {},
  defaultColumn = {},
  enableSorting = false,
  enableFiltering = false,
  filterMenuOptions = {}
}) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);
  const memoizedDefaultColumn = useMemo(() => defaultColumn, [defaultColumn]);
  const memoizedFilterTypes = useMemo(() => filterTypes, [filterTypes]);

  const {
    rows,
    getTableProps,
    prepareRow,
    headerGroups,
    preFilteredRows,
    setFilter
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      filterTypes: memoizedFilterTypes,
      defaultColumn: memoizedDefaultColumn,
      disableFilters: !enableFiltering,
      disableSorting: !enableSorting
    },
    useSortBy,
    useFilters
  );

  function headerIsEmpty (header) {
    return typeof header.Header === 'function' && header.Header() === null;
  }

  return (
    <div className={`table ${className || ''}`}>
      {!isEmptyObject(filterMenuOptions) && (
        <TableFilterMenu
          options={filterMenuOptions}
          preFilteredRows={preFilteredRows}
          setFilter={setFilter}
        />
      )}
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
  enableSorting: PropTypes.bool,
  filterMenuOptions: PropTypes.object
};

export default Table;
