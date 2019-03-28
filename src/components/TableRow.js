import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ className, cells }) => {
  if (!Array.isArray(cells)) {
    return null;
  }

  return (
    <tr className={`table-row ${className || ''}`}>
      {cells.map((cell, index) => {
        if (typeof cell === 'string') {
          cell = <p>{cell}</p>;
        }

        return (
          <td key={`TableRow-Cell-${index}`} className="table-row-cell">
            {cell}
          </td>
        );
      })}
    </tr>
  );
};

TableRow.propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array
};

export default TableRow;
