import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';

const Table = ({ className, columns, rows }) => {
  // If a table doesn't have the proper number of columns and rows,
  // it will end up messed up in one way or another. We can protect
  // against this and just fail right away returning null

  if (validateTableConfiguration(columns, rows)) {
    return null;
  }

  return (
    <div className={`table ${className || ''}`}>
      <table>
        <thead>
          <TableRow className="table-header" cells={columns} />
        </thead>

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
 * validateTableConfiguration
 * @description Validate that the table config is properly formatted. Currently checks
 *     if there are any equal row to column distributions
 */

function validateTableConfiguration (columns, rows) {
  const invalidRows = rows.filter(row => row.length !== columns.length);
  return invalidRows.length > 0;
}
