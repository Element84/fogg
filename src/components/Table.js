import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';

import Logger from '../lib/logger';

const Table = ({ className, columns, rows }) => {
  const logger = new Logger('Table', {
    isBrowser: true
  });

  // If a table doesn't have the proper number of columns and rows,
  // it will end up messed up in one way or another. We can protect
  // against this and just fail right away returning null

  if (!tableConfigurationIsValid(columns, rows)) {
    logger.warn(`Invalid table configuration, trying to fix`);

    const configuration = fixTableConfiguration(columns, rows);
    columns = configuration.columns;
    rows = configuration.rows;
  }

  return (
    <div className={`table ${className || ''}`}>
      <table>
        {columns && (
          <thead>
            <TableRow className="table-header" cells={columns} />
          </thead>
        )}

        <tbody>
          {rows.map((row, rowIndex) => {
            return <TableRow key={`Table-Row-${rowIndex}`} cells={row} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array
};

export default Table;

/**
 * tableConfigurationIsValid
 * @description Validate that the table config is properly formatted. Currently checks
 *     if there are any equal row to column distributions
 */

function tableConfigurationIsValid (columns, rows) {
  if (!Array.isArray(rows) && !Array.isArray(columns)) return false;
  if (!Array.isArray(columns)) return true;
  const invalidRows = rows.filter(row => row.length !== columns.length);
  return invalidRows.length === 0;
}

/**
 * fixTableConfiguration
 * @description Attempts to fix table configuration to keep all rows with an equal length
 */

function fixTableConfiguration (columns, rows) {
  const cellMaxCount = Math.max(...rows.map(row => row.length));
  const columnsCount = (columns && columns.length) || 0;
  const differenceCellsColumns = cellMaxCount - columnsCount;

  if (columnsCount > 0 && differenceCellsColumns > 0) {
    columns = padArray(columns, differenceCellsColumns);
  }

  rows = rows.map(cells => {
    // If the number of cells is less than the row with the
    // most cells, pad to equalize

    const differenceCellMax = cellMaxCount - cells.length;

    if (differenceCellMax > 0) {
      cells = padArray(cells, differenceCellMax);
    }

    // If the number of columns is greater than the cell count
    // pad to equalize

    const differenceColumnMax = columnsCount - cells.length;

    if (differenceColumnMax > 0) {
      cells = padArray(cells, differenceColumnMax);
    }

    return cells;
  });

  return {
    columns,
    rows
  };
}

/**
 * padArray
 * @description Adds n number of items to the end of an array with provided value
 */

function padArray (array, n, value = null) {
  if (!Array.isArray(array)) return [];

  return array.concat([...Array(n)].map(item => value));
}
